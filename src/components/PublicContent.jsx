import { useState } from 'react'
import { useStakingContract } from '../hooks/useStakingContract'
import { formatEther } from 'ethers/lib/utils'

export default function PublicContent() {
  const { 
    requiredStakeAmount, 
    handleStake, 
    isStaker, 
    isStakePending,
    requiredStakeAmountLoading
  } = useStakingContract()
  
  const [isStaking, setIsStaking] = useState(false)
  
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

  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Welcome to Monad Staking</h1>
        <p className="text-gray-300 mb-6">
          Stake MON tokens to unlock premium content and features. 
          This platform demonstrates content gating via staking on the Monad blockchain.
        </p>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Connect your wallet</li>
            <li>Stake the required amount of MON tokens</li>
            <li>Access exclusive premium content</li>
            <li>Unstake your tokens at any time</li>
          </ol>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-3">Stake to Access Premium Content</h2>
        
        {requiredStakeAmountLoading ? (
          <p className="text-gray-300">Loading staking information...</p>
        ) : (
          <>
            <p className="text-gray-300 mb-4">
              Required stake amount: <span className="font-semibold">{requiredStakeAmount ? formatEther(requiredStakeAmount) : '0'} MON</span>
            </p>
            
            {isStaker ? (
              <div className="p-4 bg-green-800 bg-opacity-30 rounded-md border border-green-600">
                <p className="text-green-400 flex items-center">
                  <span className="mr-2">✓</span> You've already staked! Visit the Premium Content section.
                </p>
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
          </>
        )}
      </section>
    </div>
  )
} 