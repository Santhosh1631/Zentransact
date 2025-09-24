const { ethers } = require("ethers");
const cron = require("node-cron");
require("dotenv").config();

// Configuration
const GANACHE_URL = process.env.GANACHE_URL || "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || "0x05e5f867A567AF0741926a120ED93520644C6Cfb";
const PRIVATE_KEY = process.env.PRIVATE_KEY; // This should be set in .env file
const CHECK_INTERVAL = process.env.CHECK_INTERVAL || "*/1 * * * *"; // Every minute by default

// Contract ABI (you'll need to update this with your actual ABI)
const CONTRACT_ABI = [
  "function getPendingScheduledTransactions() view returns (tuple(uint256 id, address sender, address receiver, uint256 amount, string message, uint256 scheduledTime, bool isExecuted, bool isCancelled, uint256 createdAt)[])",
  "function getExecutableTransactions() view returns (tuple(uint256 id, address sender, address receiver, uint256 amount, string message, uint256 scheduledTime, bool isExecuted, bool isCancelled, uint256 createdAt)[])",
  "function executeScheduledTransaction(uint256 scheduleId) payable",
  "event ScheduledTransactionExecuted(uint256 indexed scheduleId, address indexed from, address indexed receiver, uint256 amount, string message, uint256 executedTime)"
];

class ScheduledTransactionExecutor {
  constructor() {
    this.provider = null;
    this.wallet = null;
    this.contract = null;
    this.isRunning = false;
    this.executionHistory = [];
  }

  async initialize() {
    try {
      console.log("🚀 Initializing Scheduled Transaction Executor...");
      
      // Connect to Ganache
      this.provider = new ethers.providers.JsonRpcProvider(GANACHE_URL);
      
      // Test connection
      const network = await this.provider.getNetwork();
      console.log(`📡 Connected to network: ${network.name} (Chain ID: ${network.chainId})`);
      
      if (!PRIVATE_KEY) {
        throw new Error("PRIVATE_KEY not found in environment variables");
      }
      
      // Create wallet instance
      this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
      console.log(`👛 Wallet connected: ${this.wallet.address}`);
      
      // Get wallet balance
      const balance = await this.wallet.getBalance();
      console.log(`💰 Wallet balance: ${ethers.utils.formatEther(balance)} ETH`);
      
      // Connect to contract
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, this.wallet);
      console.log(`📄 Contract connected: ${CONTRACT_ADDRESS}`);
      
      // Verify contract is deployed
      const code = await this.provider.getCode(CONTRACT_ADDRESS);
      if (code === "0x") {
        throw new Error("Contract not found at the specified address");
      }
      
      console.log("✅ Initialization complete!");
      return true;
    } catch (error) {
      console.error("❌ Initialization failed:", error.message);
      return false;
    }
  }

  async checkAndExecuteTransactions() {
    if (!this.contract) {
      console.error("❌ Contract not initialized");
      return;
    }

    try {
      console.log("🔍 Checking for executable transactions...");
      
      // Get all executable transactions
      const executableTxs = await this.contract.getExecutableTransactions();
      
      if (executableTxs.length === 0) {
        console.log("ℹ️  No executable transactions found");
        return;
      }
      
      console.log(`📋 Found ${executableTxs.length} executable transactions`);
      
      for (const tx of executableTxs) {
        await this.executeTransaction(tx);
      }
      
    } catch (error) {
      console.error("❌ Error checking executable transactions:", error.message);
    }
  }

  async executeTransaction(scheduledTx) {
    try {
      const scheduleId = scheduledTx.id.toString();
      const sender = scheduledTx.sender;
      const receiver = scheduledTx.receiver;
      const amount = ethers.utils.formatEther(scheduledTx.amount);
      const message = scheduledTx.message;
      const scheduledTime = new Date(scheduledTx.scheduledTime.toNumber() * 1000);
      
      console.log(`\n⏰ Executing scheduled transaction:`);
      console.log(`   Schedule ID: ${scheduleId}`);
      console.log(`   From: ${sender}`);
      console.log(`   To: ${receiver}`);
      console.log(`   Amount: ${amount} ETH`);
      console.log(`   Message: ${message}`);
      console.log(`   Scheduled Time: ${scheduledTime.toLocaleString()}`);
      
      // Check if we have enough gas
      const gasEstimate = await this.contract.estimateGas.executeScheduledTransaction(scheduleId);
      const gasPrice = await this.provider.getGasPrice();
      const gasCost = gasEstimate.mul(gasPrice);
      
      const walletBalance = await this.wallet.getBalance();
      if (walletBalance.lt(gasCost)) {
        console.error(`❌ Insufficient gas: need ${ethers.utils.formatEther(gasCost)} ETH, have ${ethers.utils.formatEther(walletBalance)} ETH`);
        return;
      }
      
      // Execute the transaction
      const tx = await this.contract.executeScheduledTransaction(scheduleId, {
        gasLimit: gasEstimate.mul(120).div(100), // Add 20% buffer
        gasPrice: gasPrice
      });
      
      console.log(`📤 Transaction sent: ${tx.hash}`);
      console.log("⏳ Waiting for confirmation...");
      
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        console.log(`✅ Transaction executed successfully!`);
        console.log(`   Block: ${receipt.blockNumber}`);
        console.log(`   Gas used: ${receipt.gasUsed.toString()}`);
        
        // Add to execution history
        this.executionHistory.push({
          scheduleId,
          sender,
          receiver,
          amount,
          message,
          scheduledTime,
          executedAt: new Date(),
          transactionHash: tx.hash,
          blockNumber: receipt.blockNumber
        });
        
        // Log the event
        const executedEvent = receipt.events?.find(event => event.event === 'ScheduledTransactionExecuted');
        if (executedEvent) {
          console.log(`🎉 Event emitted: ScheduledTransactionExecuted`);
        }
        
      } else {
        console.error(`❌ Transaction failed: ${tx.hash}`);
      }
      
    } catch (error) {
      console.error(`❌ Error executing scheduled transaction:`, error.message);
      
      // If it's a revert error, log the reason
      if (error.reason) {
        console.error(`   Revert reason: ${error.reason}`);
      }
    }
  }

  start() {
    if (this.isRunning) {
      console.log("⚠️  Scheduler is already running");
      return;
    }

    console.log(`🕒 Starting scheduled transaction checker (interval: ${CHECK_INTERVAL})`);
    
    // Schedule the cron job
    this.cronJob = cron.schedule(CHECK_INTERVAL, () => {
      this.checkAndExecuteTransactions();
    }, {
      scheduled: true,
      timezone: "UTC"
    });
    
    this.isRunning = true;
    console.log("✅ Scheduler started successfully!");
    
    // Run initial check
    this.checkAndExecuteTransactions();
  }

  stop() {
    if (!this.isRunning) {
      console.log("⚠️  Scheduler is not running");
      return;
    }

    if (this.cronJob) {
      this.cronJob.stop();
      this.cronJob.destroy();
    }
    
    this.isRunning = false;
    console.log("🛑 Scheduler stopped");
  }

  getExecutionHistory() {
    return this.executionHistory;
  }

  printStatus() {
    console.log("\n📊 Scheduler Status:");
    console.log(`   Running: ${this.isRunning ? '✅ Yes' : '❌ No'}`);
    console.log(`   Wallet: ${this.wallet?.address || 'Not connected'}`);
    console.log(`   Contract: ${CONTRACT_ADDRESS}`);
    console.log(`   Check Interval: ${CHECK_INTERVAL}`);
    console.log(`   Executions: ${this.executionHistory.length}`);
    
    if (this.executionHistory.length > 0) {
      console.log("\n📜 Recent Executions:");
      this.executionHistory.slice(-5).forEach((execution, index) => {
        console.log(`   ${index + 1}. ID ${execution.scheduleId}: ${execution.amount} ETH from ${execution.sender.slice(0,8)}... to ${execution.receiver.slice(0,8)}... at ${execution.executedAt.toLocaleString()}`);
      });
    }
  }
}

// Create and start the executor
async function main() {
  const executor = new ScheduledTransactionExecutor();
  
  // Initialize
  const initialized = await executor.initialize();
  if (!initialized) {
    process.exit(1);
  }
  
  // Start the scheduler
  executor.start();
  
  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...');
    executor.stop();
    executor.printStatus();
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
    executor.stop();
    executor.printStatus();
    process.exit(0);
  });
  
  // Print status every 5 minutes
  setInterval(() => {
    executor.printStatus();
  }, 5 * 60 * 1000);
  
  // Print initial status
  setTimeout(() => {
    executor.printStatus();
  }, 2000);
}

// Export for use as module
module.exports = ScheduledTransactionExecutor;

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}