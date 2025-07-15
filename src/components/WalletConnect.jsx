import { useConnect } from 'wagmi'

export default function WalletConnect() {
  const { connect, connectors, isPending } = useConnect()
  
  // Either use just the first connector
  const connector = connectors[0]
  
  return (
    <div>
      <button
        onClick={() => connect({ connector })}
        disabled={isPending}
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded-md text-sm"
      >
        {isPending ? 'Connecting...' : 'Connect Wallet'}
      </button>
    </div>
  )
} 