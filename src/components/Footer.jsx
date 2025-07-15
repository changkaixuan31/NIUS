import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <p className="text-gray-400 mb-4">
            Monad Staking App — Built with Monad & deployed on Arweave
          </p>
          
          <div className="space-y-2">
            <p className="text-gray-400">
              <span className="text-sm">Original Repo by </span>
              <a 
                href="https://github.com/oceans404/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                Oceans404
              </a>
              <span className="text-sm"> (</span>
              <a 
                href="https://github.com/oceans404/monad-stake-gate-ui/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                monad-stake-gate-ui
              </a>
              <span className="text-sm">)</span>
            </p>
            
            <p className="text-gray-400">
              <span className="text-sm">Smart Contract Repo: </span>
              <a 
                href="https://github.com/oceans404/monad-app-stake-gate" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                monad-app-stake-gate
              </a>
            </p>
            
            <p className="text-gray-400">
              <span className="text-sm">This Monad App - Arweave Deployed starter kit repo: </span>
              <a 
                href="https://github.com/ar-io/MonadApp-ArweaveDeployed" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                MonadApp-ArweaveDeployed
              </a>
              <span className="text-sm"> by </span>
              <a 
                href="https://github.com/PSkinnerTech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                PSkinnerTech
              </a>
            </p>
            
            <p className="text-gray-400">
              <span className="text-sm">Senior Developer Relations at </span>
              <a 
                href="https://ar.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300"
              >
                AR.IO
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 