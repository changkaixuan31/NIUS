import { useState } from 'react'
import { useStakingContract } from '../hooks/useStakingContract'
import { formatEther } from 'ethers/lib/utils'

export default function StakingInterface() {
  const { 
    requiredStakeAmount, 
    handleStake, 
    handleWithdraw,
    isStaker,
    isStakePending,
    isWithdrawPending,
    requiredStakeAmountLoading
  } = useStakingContract()
  
  const [isStaking, setIsStaking] = useState(false)
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  
  const onStake = async () => {
    setIsStaking(true)
    try {
      await handleStake()
    } catch (error) {
      console.error('Staking failed:', error)
    } finally {
      setIsStaking(false)
    }
  }

  const onWithdraw = async () => {
    setIsWithdrawing(true)
    try {
      await handleWithdraw()
    } catch (error) {
      console.error('Withdrawal failed:', error)
    } finally {
      setIsWithdrawing(false)
    }
  }

  if (requiredStakeAmountLoading) {
    return <p className="text-gray-300">Loading staking information...</p>
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3">
        {isStaker ? 'Manage Your Stake' : 'Stake to Access Premium Content'}
      </h2>
      
      <p className="text-gray-300 mb-4">
        Required stake amount: <span className="font-semibold">{requiredStakeAmount ? formatEther(requiredStakeAmount) : '0'} MON</span>
      </p>
      
      {isStaker ? (
        <div>
          <p className="text-green-400 mb-4 flex items-center">
            <span className="mr-2">✓</span> You have successfully staked tokens and have access to premium content.
          </p>
          
          <button
            onClick={onWithdraw}
            disabled={isWithdrawing || isWithdrawPending}
            className={`w-full py-3 px-4 rounded-md font-medium transition ${
              isWithdrawing || isWithdrawPending
                ? 'bg-red-800 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isWithdrawing || isWithdrawPending ? 'Withdrawing...' : 'Withdraw Staked Tokens'}
          </button>
        </div>
      ) : (
        <button
          onClick={onStake}
          disabled={isStaking || isStakePending || !requiredStakeAmount}
          className={`w-full py-3 px-4 rounded-md font-medium transition ${
            isStaking || isStakePending
              ? 'bg-indigo-800 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {isStaking || isStakePending ? 'Staking...' : 'Stake MON Tokens'}
        </button>
      )}
    </div>
  )
} 