import { useState } from 'react'
import { useStakingContract } from '../hooks/useStakingContract'

export default function GatedContent() {
  const { handleWithdraw, isWithdrawPending } = useStakingContract()
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  
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

  return (
    <div className="max-w-3xl mx-auto">
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Premium Content</h1>
          <span className="bg-green-600 text-white text-sm py-1 px-3 rounded-full">Staker Access</span>
        </div>
        
        <p className="text-gray-300 mb-6">
          Welcome to the exclusive content area! This content is only visible to users who have staked MON tokens.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Exclusive Content #1</h2>
          <p className="text-gray-300">
            This is premium content that's only available to stakers. It could be tutorials, resources, or any exclusive information.
          </p>
        </div>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-3">Exclusive Content #2</h2>
          <p className="text-gray-300">
            More premium content for stakers. This area demonstrates the gating functionality working correctly.
          </p>
        </div>
      </section>

      <section className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Manage Your Stake</h2>
        <p className="text-gray-300 mb-6">
          You can withdraw your staked MON tokens at any time. Note that you'll lose access to premium content after withdrawing.
        </p>
        
        <button
          onClick={onWithdraw}
          disabled={isWithdrawing || isWithdrawPending}
          className={`py-3 px-4 rounded-md font-medium transition ${
            isWithdrawing || isWithdrawPending
              ? 'bg-red-800 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          {isWithdrawing || isWithdrawPending ? 'Withdrawing...' : 'Withdraw Staked Tokens'}
        </button>
      </section>
    </div>
  )
} 