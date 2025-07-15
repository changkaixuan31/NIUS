import { defineChain } from 'viem'

// Monad Testnet configuration
export const monadTestnet = defineChain({
  id: 155,
  name: 'Monad Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.monad.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://testnet.monadexplorer.com/' },
  },
  testnet: true,
})

// Monad Mainnet configuration
export const monadMainnet = defineChain({
  id: 1024,
  name: 'Monad',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    default: { http: ['https://rpc.monad.xyz/http'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://monadexplorer.com/' },
  },
}) 