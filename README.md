# ZenTransact - Scheduled Transaction dApp

A decentralized application built with React, Solidity, and Node.js that allows users to schedule cryptocurrency transactions for automatic execution at future dates and times.

## 🚀 Features

- **Instant Transactions**: Send ETH immediately to any address
- **Scheduled Transactions**: Schedule transactions for future execution
- **Real-time Market Data**: View live cryptocurrency prices
- **Transaction History**: Track all your transactions
- **Educational Content**: Learn about cryptocurrency and blockchain
- **Wallet Integration**: Connect with MetaMask
- **Automated Execution**: Node.js scheduler automatically executes scheduled transactions

## 🏗️ Architecture

```
├── cl/                     # React Frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # React context for blockchain interaction
│   │   └── utils/          # Utility functions and constants
├── sc/                     # Smart Contracts (Solidity)
│   ├── contracts/          # Smart contract files
│   ├── scripts/            # Deployment scripts
│   └── artifacts/          # Compiled contracts
└── scheduler/              # Node.js Scheduler
    ├── scheduler.js        # Main scheduler script
    └── package.json        # Scheduler dependencies
```

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Ganache CLI or Ganache GUI

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/zentransact.git
cd zentransact
```

### 2. Set up Ganache Local Blockchain

#### Option A: Ganache GUI
1. Download and install [Ganache](https://trufflesuite.com/ganache/)
2. Create a new workspace with these settings:
   - **Server**: HTTP://127.0.0.1:7545
   - **Network ID**: 5777
   - **Accounts**: 10 accounts with 100 ETH each

#### Option B: Ganache CLI
```bash
npm install -g ganache-cli
ganache-cli -h 127.0.0.1 -p 7545 -i 5777 --accounts 10 --defaultBalanceEther 100
```

### 3. Set up MetaMask

1. Install MetaMask browser extension
2. Create a new network with these settings:
   - **Network Name**: Ganache Local
   - **New RPC URL**: http://127.0.0.1:7545
   - **Chain ID**: 5777
   - **Currency Symbol**: ETH
3. Import accounts from Ganache using private keys

### 4. Deploy Smart Contracts

```bash
# Navigate to smart contracts directory
cd sc

# Install dependencies
npm install

# Compile contracts
npx hardhat compile

# Deploy to Ganache
npx hardhat run scripts/deploy.js --network localhost
```

**Important**: Save the deployed contract address from the console output.

### 5. Update Configuration

#### Frontend Configuration
Update `cl/src/utils/constants.js`:
```javascript
export const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

#### Scheduler Configuration
1. Create environment file:
```bash
cd ../scheduler
cp .env.example .env
```

2. Update `.env` file:
```bash
GANACHE_URL=http://127.0.0.1:7545
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
PRIVATE_KEY=YOUR_GANACHE_ACCOUNT_PRIVATE_KEY
CHECK_INTERVAL=*/1 * * * *
```

### 6. Start the Frontend

```bash
# Navigate to frontend directory
cd ../cl

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at http://localhost:5173

### 7. Start the Scheduler

```bash
# Navigate to scheduler directory
cd ../scheduler

# Install dependencies  
npm install

# Start scheduler
npm start
```

## 🎮 Usage Guide

### Connecting Your Wallet

1. Open the application in your browser
2. Click "Connect Wallet" in the navigation
3. Select your MetaMask account
4. Approve the connection

### Sending Instant Transactions

1. Go to the Home page
2. Fill in the transaction form:
   - **Recipient Address**: Ethereum address to send to
   - **Amount**: Amount in ETH
   - **Message**: Optional message
3. Click "Send Now"
4. Confirm the transaction in MetaMask

### Scheduling Future Transactions

1. Navigate to "Schedule" in the navigation menu
2. Fill in the scheduling form:
   - **Recipient Address**: Ethereum address to send to
   - **Amount**: Amount in ETH
   - **Scheduled Date**: Future date
   - **Scheduled Time**: Future time
   - **Message**: Optional message
3. Click "Schedule Transaction"
4. Confirm the transaction in MetaMask (this locks the ETH in the contract)

### Managing Scheduled Transactions

1. Go to the "Schedule" page
2. Click "View Scheduled" tab
3. Here you can:
   - View all your scheduled transactions
   - Cancel pending transactions (get refund)
   - Manually execute ready transactions
   - See transaction status

### Automatic Execution

The Node.js scheduler automatically:
- Checks for executable transactions every minute
- Executes transactions when their scheduled time arrives
- Logs all execution activity
- Handles gas estimation and error recovery

## 🔧 Smart Contract Functions

### Core Functions

```solidity
// Send immediate transaction
function addToBlockchain(address payable receiver, uint amount, string memory message) public payable

// Schedule future transaction
function scheduleTransaction(address payable receiver, uint amount, string memory message, uint256 scheduledTime) public payable

// Execute scheduled transaction
function executeScheduledTransaction(uint256 scheduleId) public

// Cancel scheduled transaction
function cancelScheduledTransaction(uint256 scheduleId) public
```

### View Functions

```solidity
// Get all transactions
function getAllTransactions() public view returns (TransferStruct[] memory)

// Get user's scheduled transactions
function getUserScheduledTransactions(address user) public view returns (ScheduledTransactionStruct[] memory)

// Get executable transactions
function getExecutableTransactions() public view returns (ScheduledTransactionStruct[] memory)
```

## 🛡️ Security Features

- **Ownership Validation**: Only transaction creators can cancel their scheduled transactions
- **Time Validation**: Scheduled time must be in the future
- **Amount Validation**: ETH must be sent with the transaction to lock funds
- **Address Validation**: Recipient addresses are validated
- **Reentrancy Protection**: Safe transfer patterns used
- **Gas Optimization**: Efficient loops and storage patterns

## 📊 Monitoring & Logging

The scheduler provides comprehensive logging:
- Transaction execution status
- Gas usage and costs
- Error handling and retries
- Performance metrics
- Execution history

## 🚀 Production Deployment

### Mainnet Deployment

1. **Update network configuration** in `hardhat.config.js`
2. **Set mainnet RPC URL** and private key
3. **Deploy contract** to mainnet
4. **Update frontend configuration**
5. **Use production scheduler** with mainnet settings

### Alternative Automation Solutions

For production use, consider these alternatives to the Node.js scheduler:

#### Chainlink Keepers
```solidity
// Add to your contract
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";

contract Transactions is KeeperCompatibleInterface {
    function checkUpkeep(bytes calldata) external view override returns (bool upkeepNeeded, bytes memory) {
        // Check if any transactions need execution
    }
    
    function performUpkeep(bytes calldata) external override {
        // Execute ready transactions
    }
}
```

#### Gelato Network
Integration with Gelato for decentralized automation.

## 🧪 Testing

### Contract Testing
```bash
cd sc
npx hardhat test
```

### Frontend Testing
```bash
cd cl
npm run test
```

### Manual Testing Scenarios

1. **Schedule a transaction 1 minute in the future**
2. **Verify it appears in pending transactions**
3. **Wait for automatic execution**
4. **Check transaction history**
5. **Test cancellation before execution**

## 🐛 Troubleshooting

### Common Issues

1. **MetaMask Connection Issues**
   - Ensure you're on the correct network (Ganache)
   - Check that accounts are imported correctly
   - Refresh the page and reconnect

2. **Contract Deployment Fails**
   - Ensure Ganache is running
   - Check that you have enough ETH for deployment
   - Verify network configuration

3. **Scheduler Not Executing Transactions**
   - Check that the private key is correct
   - Ensure the contract address is correct
   - Verify the scheduler wallet has enough ETH for gas

4. **Transactions Fail**
   - Check that the contract is properly deployed
   - Ensure sufficient ETH balance
   - Verify recipient address format

### Debug Commands

```bash
# Check Ganache connection
curl -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://127.0.0.1:7545

# Check contract deployment
npx hardhat verify --network localhost CONTRACT_ADDRESS

# Test scheduler connection
cd scheduler && npm run test
```

## 📚 Additional Resources

- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethers.js Documentation](https://docs.ethers.io/)
- [React Documentation](https://reactjs.org/docs)
- [MetaMask Developer Documentation](https://docs.metamask.io/)
- [Hardhat Documentation](https://hardhat.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Look for similar issues in the GitHub repository
3. Create a new issue with detailed information
4. Join our Discord community for real-time support

---

**Happy scheduling! 🎉**#   Z e n t r a n s a c t  
 #   Z e n t r a n s a c t  
 