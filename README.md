# Monad Staking App Starter Kit

> **Special Thanks**: This project wouldn't be possible without the incredible work of [Oceans404](https://github.com/oceans404), who created the original [monad-stake-gate-ui](https://github.com/oceans404/monad-stake-gate-ui) and [monad-app-stake-gate](https://github.com/oceans404/monad-app-stake-gate) contracts. 

A ready-to-use template for building staking applications on the Monad blockchain with seamless Arweave deployment. This starter kit provides a complete foundation for content-gating applications using Monad token staking.

![monad stake app](https://github.com/user-attachments/assets/be73413a-e05b-4be9-b8a9-82a611660b2a)

## Smart Contract Repositories

- **Original Frontend Template**: [monad-stake-gate-ui](https://github.com/oceans404/monad-stake-gate-ui) by Oceans404
- **Smart Contract**: [monad-app-stake-gate](https://github.com/oceans404/monad-app-stake-gate) by Oceans404

## Features

- **Monad Blockchain Integration**: Connect wallets, stake tokens, and verify staking status
- **Content Gating**: Premium content accessible only to users who have staked tokens
- **Arweave Permanent Storage**: Deploy your application to the permaweb with one command
- **ARNS Compatibility**: Set custom Arweave domain names with the included undername scripts
- **Modern Tech Stack**: Built with React, Vite, Tailwind CSS, and wagmi for wallet connections

> **Note:** This frontend template works with the [StakingGateFactory](https://github.com/oceans404/monad-app-stake-gate) smart contract.

## 🚀 Quick Start

### 1. Create Your App's Staking Contract

- Visit the [StakingGateFactory contract](https://testnet.monadexplorer.com/address/0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3?tab=Contract) on Monad Explorer
- Connect your wallet
- Select **Write Contract** → **createStakingGate**
- Enter your parameters:
  - `requiredStakeAmount`: Your desired MON amount (e.g., 0.0069)
  - `name`: A name for your app (e.g., "MyAwesomeApp")
- Execute the transaction and save your new contract address - this is the address of the staking contract for your app

Alternative methods:

**Using Forge/Cast (Command Line):**
```bash
cast send 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "createStakingGate(uint256,string)" YOUR_STAKE_AMOUNT_IN_WEI "YOUR_APP_NAME" --account YOUR_ACCOUNT_NAME
```

Example (Creating a contract requiring 0.01 MON):
```bash
cast send 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "createStakingGate(uint256,string)" 10000000000000000 "MyNewApp" --account monad
```

**Using Web3 JS/Ethers:**
```javascript
const factory = new ethers.Contract(
  '0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3',
  factoryAbi,
  signer
);

const tx = await factory.createStakingGate(
  ethers.utils.parseEther('0.01'),
  'MyNewApp'
);

const receipt = await tx.wait();
console.log(
  'New contract created at:',
  receipt.events[0].args.stakingGateAddress
);
```

### 2. Clone This Template

```bash
git clone [this repo]
cd [repo name]
npm install
```

### 3. Update Contract Address

- Open `src/hooks/useStakingContract.js`
- Replace the `STAKING_CONTRACT_ADDRESS` value with your new contract address:

```javascript
// 🎯🎯🎯🎯 UPDATE ME!!!!!!!!
// update this to your app's staking contract, created with the above factory
export const STAKING_CONTRACT_ADDRESS = '0xYourNewContractAddressHere';
```

### 4. Customize Content

- Update public content in `src/components/PublicContent.jsx`
- Update gated content in `src/components/GatedContent.jsx`
- Modify app name, colors, and other branding elements

### 5. Test Locally

```bash
npm run dev
```

## 🏗️ Deploying to Arweave

### Prerequisites

- Node.js 16+
- An Arweave wallet (JSON file)
- Turbo credits for uploads (get at [turbo-topup.com](https://turbo-topup.com))

### Deployment Steps

1. Place your Arweave wallet file in the project root as `wallet.json`
2. Build your application:
```bash
npm run build
```
3. Deploy to Arweave:
```bash
npm run deploy
```

This will:
- Upload your application to Arweave via Turbo
- Generate a manifest file
- Provide a deployment URL: `https://arweave.net/{manifestId}`

### ARNS Name Integration

#### Update ARNS Undername

To use an ARNS undername for your Arweave Dapp's URL:

1. Ensure you have an ARNS primary name (get one at [arns.app](https://arns.app))
2. Run the undername command:
```bash
npm run set-undername
```

This will create an undername record making your site available at: `https://{undername}_{yourprimaryname}.ar.io`

For example, if your primary name is "myname" and you set the undername to "monad-stake", your app would be available at: `https://monad-stake_myname.ar.io`

## ✨ Template Features

- **Wallet Connection**: Easy integration with Web3 wallets via Wagmi
- **Monad Integration**: Built specifically for Monad blockchain
- **Customizable Staking**: Set your own MON staking requirements
- **Public/Gated Content**: Clear separation between public and staker-only content
- **Responsive Design**: Works on all devices
- **Permanent Storage**: Deploy once to Arweave for permanent availability

## 📋 Project Structure

- `src/hooks/useStakingContract.js` - Configure your staking contract address
- `src/components/PublicContent.jsx` - Content visible to everyone
- `src/components/GatedContent.jsx` - Content only visible to stakers
- `src/components/StakingInterface.jsx` - Interface for staking tokens
- `src/components/NavBar.jsx` - App header with wallet connection
- `scripts/` - Deployment and Arweave integration scripts

## 🧪 Monad Contract Information

### Factory Contract

- **Address**: `0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3`
- **Network**: Monad Testnet
- **Purpose**: Creates new staking contracts with customizable parameters

### Interacting with Staking Contracts

To stake (exactly the required amount):
```bash
cast send YOUR_STAKING_CONTRACT_ADDRESS "stake()" --value YOUR_STAKE_AMOUNT_IN_WEI --account YOUR_ACCOUNT_NAME
```

To check if an address is a staker:
```bash
cast call YOUR_STAKING_CONTRACT_ADDRESS "isStaker(address)(bool)" ADDRESS_TO_CHECK
```

To withdraw your stake:
```bash
cast send YOUR_STAKING_CONTRACT_ADDRESS "withdraw()" --account YOUR_ACCOUNT_NAME
```

### Finding Your Created Contracts

To get all contracts you've created:
```bash
cast call 0x7c809EA8370B2efD01b3f175Be3Aab970b66Ded3 "getStakingGatesByCreator(address)(address[])" YOUR_ADDRESS
```

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Arweave Deployment
npm run deploy       # Deploy to Arweave

# ARNS Integration
npm run set-base     # Set your base ARNS name as the domain for your app
npm run set-undername  # Set an undername record for your ARNS primary name
npm run records      # Retrieve transaction details of an ARNS name
```

## ⚠️ Important Notes

- Never commit your Arweave Keyfile to version control
- Keep your manifest ID after deployment
- ARNS name updates may take a few minutes to propagate
- Default TTL for name records is 15 minutes
- The difference between `set-base` and `set-undername`:
  - `set-base`: Points your base ARNS name directly to your app (e.g., `yourname.ar.io`)
  - `set-undername`: Creates a subdomain-like record under your primary name (e.g., `app_yourname.ar.io`)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

---

Original staking app by [Oceans404](https://github.com/oceans404/monad-stake-gate-ui)  
Arweave deployment template by [PSkinnerTech](https://github.com/PSkinnerTech/)# MonadApp-ArweaveDeployed
# MonadApp-ArweaveDeployed
