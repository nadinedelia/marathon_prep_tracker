package com.marathonprep.cordapp.states

import com.marathonprep.cordapp.contracts.ChallengeContract
import net.corda.v5.ledger.utxo.BelongsToContract
import net.corda.v5.ledger.utxo.ContractState
import java.security.PublicKey
import java.time.Instant
import java.util.*

@BelongsToContract(ChallengeContract::class)
data class ChallengeState(

    val challengeId: UUID,
    val description: String,
    val criteria: String,
    val startDate: Instant,
    val endDate: Instant,
    val status: String,
    private val participants: List<PublicKey>
) : ContractState {

    override fun getParticipants(): List<PublicKey> {
        return participants
    }
}