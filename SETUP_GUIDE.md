# ZenTransact Scheduled Transactions - Setup & Troubleshooting Guide

## Prerequisites

### 1. Make sure Ganache is running
- Start Ganache on `HTTP://127.0.0.1:7545`
- Ensure you have at least 2-3 accounts with ETH balance
- Chain ID should be 1337 (default for Ganache)

### 2. MetaMask Configuration
1. **Add Ganache Network to MetaMask:**
   - Network Name: `Ganache Local`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337`
   - Currency Symbol: `ETH`

2. **Import Ganache Account:**
   - Copy a private key from Ganache
   - In MetaMask: Account Menu → Import Account → Paste Private Key

### 3. Contract Deployment
The contract has been deployed to: `0xa9fb859a397dcA2C189Bcb19Cac1C2728Ee53D9D`

## Running the Application

### 1. Start the Frontend
```bash
cd cl
npm run dev
```
Access at: http://localhost:5173

### 2. Start the Scheduler (Optional - for automatic execution)
```bash
cd scheduler
npm install
cp .env.example .env
# Edit .env file with your Ganache account private key
npm start
```

## Troubleshooting Steps

### Issue: "Nothing happens when clicking Schedule Transaction"

1. **Open Browser Console (F12)**
   - Look for error messages
   - Check for network connectivity issues

2. **Verify MetaMask Connection**
   - Make sure MetaMask is connected to the correct network (Ganache)
   - Ensure you have sufficient ETH balance for gas fees
   - Check if the account is connected to the dApp

3. **Check Contract Interaction**
   - Verify the contract address in `constants.js` matches deployed contract
   - Ensure the ABI file is updated with new contract functions

### Issue: "Transaction fails with 'insufficient funds'"

1. **Check ETH Balance**
   - You need ETH for both the transaction amount AND gas fees
   - Example: To send 0.1 ETH, you need ~0.101 ETH total

2. **Gas Settings**
   - MetaMask might suggest insufficient gas
   - Try increasing gas limit if transaction fails

### Issue: "Contract not found" or "Invalid address"

1. **Redeploy Contract**
   ```bash
   cd sc
   npx hardhat run scripts/deploy-new.js --network localhost
   ```

2. **Update Frontend Constants**
   - Copy new contract address to `cl/src/utils/constants.js`
   - Copy new ABI to `cl/src/utils/Transactions.json`

### Issue: "Scheduled time validation error"

1. **Date/Time Format**
   - Ensure date is in future
   - Check timezone differences
   - Use 24-hour time format

## Testing the Scheduled Transaction Feature

### Step 1: Schedule a Transaction
1. Go to Schedule tab
2. Fill all fields:
   - Recipient: Another Ganache address
   - Amount: Small amount (e.g., 0.001 ETH)
   - Date: Today's date
   - Time: 2-3 minutes from now
   - Message: "Test scheduled transaction"
3. Click "Schedule Transaction"
4. Confirm in MetaMask

### Step 2: View Scheduled Transactions
1. Switch to "View Scheduled" tab
2. You should see your scheduled transaction
3. Status should be "Scheduled"

### Step 3: Execute the Transaction
**Option A: Manual Execution**
- Wait until scheduled time passes
- Click "Execute Now" button

**Option B: Automatic Execution (with Scheduler)**
- The Node.js scheduler will automatically execute it

## Debugging Console Commands

Open browser console and run these commands to debug:

```javascript
// Check if MetaMask is available
console.log("MetaMask available:", !!window.ethereum);

// Check current network
window.ethereum.request({ method: 'eth_chainId' }).then(console.log);

// Check current account
window.ethereum.request({ method: 'eth_accounts' }).then(console.log);

// Check balance
window.ethereum.request({
  method: 'eth_getBalance',
  params: ['YOUR_ADDRESS', 'latest']
}).then(balance => console.log("Balance:", parseInt(balance, 16) / 1e18, "ETH"));
```

## Common Error Messages & Solutions

### "Please install MetaMask"
- Install MetaMask browser extension
- Refresh the page

### "User rejected the request"
- User clicked "Reject" in MetaMask
- Try the transaction again

### "Insufficient funds for gas"
- Transfer more ETH to your account from Ganache
- Each transaction needs ~0.001-0.002 ETH for gas

### "Nonce too high"
- Reset MetaMask account: Settings → Advanced → Reset Account

### "Transaction underpriced"
- Increase gas price in MetaMask
- Or wait and try again

## Network Configuration Details

**Ganache Settings:**
- Server: HTTP://127.0.0.1:7545
- Network ID: 1337
- Accounts: 10 (default)
- Ether per account: 100 ETH
- Gas Limit: 6721975
- Gas Price: 20000000000 (20 Gwei)

**MetaMask Network Settings:**
- Network Name: Ganache Local
- New RPC URL: http://127.0.0.1:7545
- Chain ID: 1337
- Currency Symbol: ETH

## Support Files

The following files have been created/updated:
- `sc/contracts/Transaction.sol` - Enhanced smart contract
- `cl/src/components/ScheduledTransactions.jsx` - Scheduling UI
- `cl/src/context/TransactionContext.jsx` - Contract interaction
- `scheduler/scheduler.js` - Automatic transaction executor
- `cl/src/utils/constants.js` - Contract address configuration

## Next Steps

1. Make sure Ganache is running
2. Verify MetaMask is connected to Ganache network
3. Try scheduling a small test transaction
4. Check browser console for any error messages
5. Follow the troubleshooting steps above

If you continue to have issues, please share:
1. Browser console error messages
2. MetaMask network settings
3. Ganache configuration
4. Account balances