import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { monadTestnet } from './config/chains'
import './index.css'
import App from './App.jsx'

// Create a client for react-query
const queryClient = new QueryClient()

// Create wagmi config for Monad
const config = createConfig({
  chains: [monadTestnet],
  transports: {
    [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
  },
  batch: {
    multicall: true,
  },
  // Add Monad Testnet to MetaMask if it doesn't exist
  chainMetadata: {
    [monadTestnet.id]: {
      chainId: monadTestnet.id,
      name: monadTestnet.name,
      nativeCurrency: monadTestnet.nativeCurrency,
      rpcUrls: monadTestnet.rpcUrls,
      blockExplorers: monadTestnet.blockExplorers,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </WagmiProvider>
    </HashRouter>
  </StrictMode>,
)
