package com.marathonprep.cordapp.workflows

import com.marathonprep.cordapp.contracts.ChallengeContract
import com.marathonprep.cordapp.states.ChallengeState
import net.corda.v5.application.flows.ClientRequestBody
import net.corda.v5.application.flows.ClientStartableFlow
import net.corda.v5.application.flows.CordaInject
import net.corda.v5.application.flows.FlowEngine
import net.corda.v5.application.marshalling.JsonMarshallingService
import net.corda.v5.application.membership.MemberLookup
import net.corda.v5.base.annotations.Suspendable
import net.corda.v5.base.exceptions.CordaRuntimeException
import net.corda.v5.base.types.MemberX500Name
import net.corda.v5.ledger.common.NotaryLookup
import net.corda.v5.ledger.utxo.UtxoLedgerService
import org.slf4j.LoggerFactory
import java.time.Duration
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneId
import java.util.*


// A class to hold the deserialized arguments required to start the flow.
data class CreateChallengeFlowArgs(val description: String, val criteria: String)

class CreateChallengeFlow: ClientStartableFlow {

    private companion object {
        val log = LoggerFactory.getLogger(this::class.java.enclosingClass)
    }

    // Injects the JsonMarshallingService to read and populate JSON parameters.
    @CordaInject
    lateinit var jsonMarshallingService: JsonMarshallingService

    // Injects the MemberLookup to look up the VNode identities.
    @CordaInject
    lateinit var memberLookup: MemberLookup

    // Injects the UtxoLedgerService to enable the flow to make use of the Ledger API.
    @CordaInject
    lateinit var ledgerService: UtxoLedgerService

    // Injects the NotaryLookup to look up the notary identity.
    @CordaInject
    lateinit var notaryLookup: NotaryLookup

    // FlowEngine service is required to run SubFlows.
    @CordaInject
    lateinit var flowEngine: FlowEngine

    @Suspendable
    override fun call(requestBody: ClientRequestBody): String {
        log.info("CreateChallengeFlow.call() called")

        try {
            // Obtain the deserialized input arguments to the flow from the requestBody.
            val flowArgs = requestBody.getRequestBodyAs(jsonMarshallingService, CreateChallengeFlowArgs::class.java)

            // Get MemberInfos for the Vnode running the flow.
            // Good practice in Kotlin CorDapps is to only throw RuntimeException.
            // Note, in Java CorDapps only unchecked RuntimeExceptions can be thrown not
            // declared checked exceptions as this changes the method signature and breaks override.
            val myInfo = memberLookup.myInfo()

            val zoneId = ZoneId.systemDefault() // Get the system default timezone
            val startDate = LocalDate.now().atStartOfDay(zoneId).toInstant() // Today's date at the start of the day
            val endDate = LocalDate.now().plusDays(30).atStartOfDay(zoneId).toInstant()

            // Create the ChallengeState from the input arguments and member information.
            val challenge = ChallengeState(
                challengeId = UUID.randomUUID(),
                description = flowArgs.description,
                criteria = flowArgs.criteria,
                startDate = startDate,
                endDate = endDate,
                status = "ONGOING",
                listOf(myInfo.ledgerKeys[0])
            )

            // Obtain the notary.
            val notary =
                notaryLookup.lookup(MemberX500Name.parse("CN=NotaryService, OU=Test Dept, O=R3, L=London, C=GB"))
                    ?: throw CordaRuntimeException("NotaryLookup can't find notary specified in flow arguments.")

            // Use UTXOTransactionBuilder to build up the draft transaction.
            val txBuilder = ledgerService.createTransactionBuilder()
                .setNotary(notary.name)
                .setTimeWindowBetween(Instant.now(), Instant.now().plusMillis(Duration.ofDays(1).toMillis()))
                .addOutputState(challenge)
                .addCommand(ChallengeContract.Issue())
                .addSignatories(challenge.participants)

            // Convert the transaction builder to a UTXOSignedTransaction. Verifies the content of the
            // UtxoTransactionBuilder and signs the transaction with any required signatories that belong to
            // the current node.
            val signedTransaction = txBuilder.toSignedTransaction()

            ledgerService.finalize(signedTransaction)

            // Return a success message indicating the transaction ID
            return "Challenge created with ID: ${signedTransaction.id}"

        }
        // Catch any exceptions, log them and rethrow the exception.
        catch (e: Exception) {
            log.warn("Failed to process utxo flow for request body '$requestBody' because:'${e.message}'")
            throw e
        }
    }
    }



/*
RequestBody for triggering the flow via http-rpc:
{
    "clientRequestId": "challenge-no-1",
    "flowClassName": "com.marathonprep.cordapp.workflows.IOUIssueFlow",
    "requestBody": {
        "description":"February challenge",
        "criteria":"..."
        }
}
 */
