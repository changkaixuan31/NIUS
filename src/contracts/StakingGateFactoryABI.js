export const StakingGateFactoryABI = [
  {
    "inputs": [
      { "internalType": "uint256", "name": "requiredStakeAmount", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" }
    ],
    "name": "createStakingGate",
    "outputs": [
      { "internalType": "address", "name": "stakingGateAddress", "type": "address" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "creator", "type": "address" }
    ],
    "name": "getStakingGatesByCreator",
    "outputs": [
      { "internalType": "address[]", "name": "", "type": "address[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "stakingGate", "type": "address" }
    ],
    "name": "getContractInfo",
    "outputs": [
      { "internalType": "bool", "name": "exists", "type": "bool" },
      { "internalType": "uint256", "name": "requiredStakeAmount", "type": "uint256" },
      { "internalType": "string", "name": "name", "type": "string" },
      { "internalType": "address", "name": "creator", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] 