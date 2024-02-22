package com.marathonprep.cordapp.states

import com.marathonprep.cordapp.contracts.ChallengeContract
import net.corda.v5.ledger.utxo.BelongsToContract
import net.corda.v5.ledger.utxo.ContractState
import java.security.PublicKey
import java.util.*

@BelongsToContract(ChallengeContract::class)
data class ActivityState (

    val challengeId: String,
    val description: String,
    val criteria: String,
    val startDate: Date,
    val endDate: Date,
    val status: String,
    private val participants: List<PublicKey>
) : ContractState {

    override fun getParticipants(): List<PublicKey> {
        return participants
    }
}