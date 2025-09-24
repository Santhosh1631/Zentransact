# ZenTransact Auto-Executor Setup

## Overview
The Auto-Executor is a Node.js service that automatically executes scheduled transactions when their scheduled time arrives. It continuously monitors the blockchain for pending scheduled transactions and executes them automatically.

## How It Works

### 1. **Escrow System**
- When users schedule a transaction, they **must send the exact ETH amount** along with the scheduling transaction
- The smart contract holds the ETH in **escrow** until execution time
- This ensures the funds are available when the scheduled time arrives

### 2. **MetaMask Confirmation**
- Users get **MetaMask confirmation** when scheduling transactions
- They confirm sending the ETH amount that will be held in escrow
- The transaction is only scheduled if the user confirms and sends the required amount

### 3. **Automatic Execution**
- The Auto-Executor runs as a background service
- It checks every 30 seconds for scheduled transactions that are due
- When a transaction's scheduled time is reached, it automatically executes the transfer
- The escrowed ETH is sent to the recipient address

## Setup Instructions

### 1. Install Dependencies
```bash
cd sc
npm install
```

### 2. Configure Private Key
Edit `scripts/auto-executor.js` and replace the `EXECUTOR_PRIVATE_KEY` with a private key from your Ganache accounts:

```javascript
// Replace with one of your Ganache private keys
const EXECUTOR_PRIVATE_KEY = "YOUR_GANACHE_PRIVATE_KEY_HERE";
```

**Important:** Use an account that has ETH for gas fees (any Ganache account will work).

### 3. Start the Auto-Executor
```bash
cd sc
npm run auto-executor
```

### 4. The service will show:
```
🚀 Starting Auto-Executor...
📡 Connected to: http://127.0.0.1:7545
📄 Contract: 0xa9fb859a397dcA2C189Bcb19Cac1C2728Ee53D9D
⏰ Check interval: 30 seconds
🔍 Checking for scheduled transactions...
```

## User Experience

### Scheduling a Transaction:
1. User fills out the scheduling form
2. Clicks "Schedule Transaction"
3. **MetaMask popup appears asking to confirm sending ETH**
4. User confirms - ETH is sent to contract and held in escrow
5. Transaction is scheduled successfully

### Automatic Execution:
1. Auto-Executor monitors scheduled transactions
2. When scheduled time arrives, it automatically executes
3. Escrowed ETH is transferred to recipient
4. Transaction is marked as executed

## Features

### ✅ **Immediate ETH Escrow**
- ETH is locked in contract when scheduling
- No risk of insufficient funds at execution time

### ✅ **MetaMask Integration**
- Users confirm the exact amount they're sending
- Full transparency of the escrow process

### ✅ **Automatic Execution**
- No manual intervention required
- Transactions execute exactly on time (within 30 seconds)

### ✅ **Secure & Reliable**
- Smart contract handles all escrow logic
- Cannot execute twice or be manipulated

## Monitoring

The Auto-Executor provides detailed logs:
- Transaction checking status
- Execution confirmations
- Error handling
- Time until execution for pending transactions

## Stopping the Service

Press `Ctrl+C` to gracefully stop the Auto-Executor.

## Notes

- The Auto-Executor needs to run continuously for automatic execution
- Each scheduled transaction locks the exact ETH amount in the contract
- Gas fees for execution are paid by the executor service (minimal cost)
- The service can be run on any machine with access to your Ganache network