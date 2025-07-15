import { useContractRead, useContractWrite, useAccount } from 'wagmi'
import { StakingGateABI } from '../contracts/StakingGateABI'
import { ethers } from 'ethers'

// 🎯🎯🎯🎯 UPDATE ME!!!!!!!!
// Update this to your app's staking contract, created with the factory
export const STAKING_CONTRACT_ADDRESS = '0x22c453f438085008a9b9dbf4b418f7fd73df4350'

export function useStakingContract() {
  const { address, isConnected } = useAccount()

  // Check if the connected user is a staker
  const { data: isStaker, isLoading: isStakerLoading, refetch: refetchIsStaker } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingGateABI,
    functionName: 'isStaker',
    args: [address || ethers.constants.AddressZero],
    enabled: isConnected,
  })

  // Get the required stake amount
  const { data: requiredStakeAmount, isLoading: requiredStakeAmountLoading } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingGateABI,
    functionName: 'requiredStakeAmount',
  })

  // Get the app name
  const { data: appName } = useContractRead({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingGateABI,
    functionName: 'name',
  })

  // Stake tokens
  const { writeAsync: stake, isPending: isStakePending } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingGateABI,
    functionName: 'stake',
  })

  // Withdraw staked tokens
  const { writeAsync: withdraw, isPending: isWithdrawPending } = useContractWrite({
    address: STAKING_CONTRACT_ADDRESS,
    abi: StakingGateABI,
    functionName: 'withdraw',
  })

  const handleStake = async () => {
    if (!requiredStakeAmount) return
    
    try {
      const tx = await stake({
        value: requiredStakeAmount.toString(),
      })
      await tx.wait()
      await refetchIsStaker()
    } catch (error) {
      console.error("Error staking:", error)
      throw error
    }
  }

  const handleWithdraw = async () => {
    try {
      const tx = await withdraw()
      await tx.wait()
      await refetchIsStaker()
    } catch (error) {
      console.error("Error withdrawing:", error)
      throw error
    }
  }

  return {
    isStaker: isStaker || false,
    requiredStakeAmount,
    appName,
    handleStake,
    handleWithdraw,
    isStakerLoading,
    requiredStakeAmountLoading,
    isStakePending,
    isWithdrawPending,
  }
} 