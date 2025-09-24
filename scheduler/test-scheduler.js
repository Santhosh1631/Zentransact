const { ethers } = require("ethers");
require("dotenv").config();

// Test configuration
const GANACHE_URL = process.env.GANACHE_URL || "http://127.0.0.1:7545";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

// Simple contract ABI for testing
const TEST_ABI = [
  "function getTransactionCount() view returns (uint256)",
  "function getScheduledTransactionCount() view returns (uint256)",
  "function getPendingScheduledTransactions() view returns (tuple(uint256 id, address sender, address receiver, uint256 amount, string message, uint256 scheduledTime, bool isExecuted, bool isCancelled, uint256 createdAt)[])",
  "function getContractBalance() view returns (uint256)"
];

async function testConnection() {
  console.log("🧪 Testing ZenTransact Scheduler Connection...\n");

  try {
    // Test provider connection
    console.log("1. Testing Ganache connection...");
    const provider = new ethers.providers.JsonRpcProvider(GANACHE_URL);
    
    const network = await provider.getNetwork();
    console.log(`   ✅ Connected to ${network.name} (Chain ID: ${network.chainId})`);
    
    const blockNumber = await provider.getBlockNumber();
    console.log(`   ✅ Current block: ${blockNumber}`);

    // Test contract connection
    console.log("\n2. Testing contract connection...");
    if (!CONTRACT_ADDRESS) {
      throw new Error("CONTRACT_ADDRESS not set in environment variables");
    }
    
    const contract = new ethers.Contract(CONTRACT_ADDRESS, TEST_ABI, provider);
    console.log(`   ✅ Contract address: ${CONTRACT_ADDRESS}`);
    
    // Test contract calls
    console.log("\n3. Testing contract functions...");
    
    try {
      const transactionCount = await contract.getTransactionCount();
      console.log(`   ✅ Transaction count: ${transactionCount.toString()}`);
    } catch (error) {
      console.log(`   ❌ getTransactionCount failed: ${error.message}`);
    }
    
    try {
      const scheduledCount = await contract.getScheduledTransactionCount();
      console.log(`   ✅ Scheduled transaction count: ${scheduledCount.toString()}`);
    } catch (error) {
      console.log(`   ❌ getScheduledTransactionCount failed: ${error.message}`);
    }
    
    try {
      const contractBalance = await contract.getContractBalance();
      console.log(`   ✅ Contract balance: ${ethers.utils.formatEther(contractBalance)} ETH`);
    } catch (error) {
      console.log(`   ❌ getContractBalance failed: ${error.message}`);
    }
    
    try {
      const pendingTxs = await contract.getPendingScheduledTransactions();
      console.log(`   ✅ Pending scheduled transactions: ${pendingTxs.length}`);
      
      if (pendingTxs.length > 0) {
        console.log("      Pending transactions:");
        pendingTxs.forEach((tx, index) => {
          const scheduledTime = new Date(tx.scheduledTime.toNumber() * 1000);
          const amount = ethers.utils.formatEther(tx.amount);
          console.log(`        ${index + 1}. ID ${tx.id.toString()}: ${amount} ETH to ${tx.receiver.slice(0,8)}... at ${scheduledTime.toLocaleString()}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ getPendingScheduledTransactions failed: ${error.message}`);
    }

    // Test wallet connection if private key is provided
    console.log("\n4. Testing wallet connection...");
    const privateKey = process.env.PRIVATE_KEY;
    
    if (privateKey) {
      try {
        const wallet = new ethers.Wallet(privateKey, provider);
        console.log(`   ✅ Wallet address: ${wallet.address}`);
        
        const balance = await wallet.getBalance();
        console.log(`   ✅ Wallet balance: ${ethers.utils.formatEther(balance)} ETH`);
        
        if (balance.eq(0)) {
          console.log("   ⚠️  Warning: Wallet has no ETH for gas fees");
        }
      } catch (error) {
        console.log(`   ❌ Wallet connection failed: ${error.message}`);
      }
    } else {
      console.log("   ⚠️  PRIVATE_KEY not set - wallet test skipped");
    }

    console.log("\n✅ All tests completed!");
    console.log("\n📋 Next steps:");
    console.log("   1. Ensure your wallet has ETH for gas fees");
    console.log("   2. Set PRIVATE_KEY in your .env file");
    console.log("   3. Run 'npm start' to start the scheduler");
    
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    process.exit(1);
  }
}

async function testSchedulerModule() {
  console.log("\n🔧 Testing Scheduler Module...");
  
  try {
    const ScheduledTransactionExecutor = require("./scheduler");
    const executor = new ScheduledTransactionExecutor();
    
    console.log("   ✅ Scheduler module loaded successfully");
    
    const initialized = await executor.initialize();
    if (initialized) {
      console.log("   ✅ Scheduler initialized successfully");
      executor.printStatus();
    } else {
      console.log("   ❌ Scheduler initialization failed");
    }
    
  } catch (error) {
    console.error("❌ Scheduler module test failed:", error.message);
  }
}

// Run tests
async function runTests() {
  await testConnection();
  await testSchedulerModule();
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testConnection, testSchedulerModule };