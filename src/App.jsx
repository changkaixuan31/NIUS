import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAccount } from 'wagmi'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import PublicContent from './components/PublicContent'
import GatedContent from './components/GatedContent'
import { useStakingContract } from './hooks/useStakingContract'

function App() {
  const { isConnected } = useAccount()
  const { isStaker, isStakerLoading } = useStakingContract()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false when staker status is loaded
    if (!isStakerLoading) {
      setIsLoading(false)
    }
  }, [isStakerLoading])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBar />
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<PublicContent />} />
            <Route
              path="/gated"
              element={
                !isConnected ? (
                  <div className="text-center py-10">
                    <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
                    <p>Please connect your wallet to access this content.</p>
                  </div>
                ) : isStaker ? (
                  <GatedContent />
                ) : (
                  <div className="text-center py-10">
                    <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
                    <p>You need to stake tokens to access this content.</p>
                  </div>
                )
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
