import { useAccount, useDisconnect, useChainId } from 'wagmi';
import { useState, useEffect } from 'react';
import { monadTestnet } from '../config/chains';
import WalletConnect from './WalletConnect';
import { Link } from 'react-router-dom';
import { useStakingContract } from '../hooks/useStakingContract';

function NavBar() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const { appName, isStaker } = useStakingContract();

  // Check if connected to the right network
  useEffect(() => {
    if (isConnected && chainId !== monadTestnet.id) {
      setIsWrongNetwork(true);
    } else {
      setIsWrongNetwork(false);
    }
  }, [chainId, isConnected]);

  // Format address for display
  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white hover:text-gray-300 transition-colors">
              {appName || 'Monad Staking App'}
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="flex-1 flex justify-center items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link 
              to="/gated" 
              className={`transition-colors ${
                isStaker 
                  ? 'text-green-400 hover:text-green-300' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {isStaker ? 'Premium Content ✓' : 'Premium Content 🔒'}
            </Link>
          </div>

          {/* Wallet Connect Display - Right Aligned */}
          <div className="flex-shrink-0 ml-4 flex items-center space-x-2">
            {isConnected && !isWrongNetwork ? (
              <div className="flex items-center">
                <span className="text-gray-100 mr-2">{shortenAddress(address)}</span>
                <button
                  onClick={() => disconnect()}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded-md text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <WalletConnect />
            )}
            {isWrongNetwork && (
              <div className="text-yellow-400 text-sm">
                Please switch to Monad network
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
