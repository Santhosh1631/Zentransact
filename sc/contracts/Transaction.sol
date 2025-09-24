// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 public transactionCount;
    uint256 public scheduledTransactionCount;

    event Transfer(address indexed from, address indexed receiver, uint amount, string message, uint256 timestamp, bool isScheduled);
    event ScheduledTransactionCreated(uint256 indexed scheduleId, address indexed from, address indexed receiver, uint amount, string message, uint256 scheduledTime);
    event ScheduledTransactionExecuted(uint256 indexed scheduleId, address indexed from, address indexed receiver, uint amount, string message, uint256 executedTime);
    event ScheduledTransactionCancelled(uint256 indexed scheduleId, address indexed from);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        bool isScheduled;
        bool isExecuted;
    }

    struct ScheduledTransactionStruct {
        uint256 id;
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 scheduledTime;
        bool isExecuted;
        bool isCancelled;
        uint256 createdAt;
    }

    TransferStruct[] public transactions;
    ScheduledTransactionStruct[] public scheduledTransactions;
    
    mapping(address => uint256[]) public userScheduledTransactions;
    mapping(uint256 => bool) public executedScheduledTransactions;

    modifier onlyOwner(uint256 scheduleId) {
        require(scheduledTransactions[scheduleId].sender == msg.sender, "Only the owner can perform this action");
        _;
    }

    modifier validScheduleId(uint256 scheduleId) {
        require(scheduleId < scheduledTransactions.length, "Invalid schedule ID");
        _;
    }

    // Regular transaction function
    function addToBlockchain(address payable receiver, uint amount, string memory message) public payable {
        require(receiver != address(0), "Invalid receiver address");
        require(msg.value == amount, "Sent value must match the amount");

        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp, false, true));
        
        // Transfer the ETH
        receiver.transfer(msg.value);
        
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, false);
    }

    // Schedule a transaction for future execution
    function scheduleTransaction(address payable receiver, uint amount, string memory message, uint256 scheduledTime) public payable {
        require(receiver != address(0), "Invalid receiver address");
        require(scheduledTime > block.timestamp, "Scheduled time must be in the future");
        require(msg.value == amount, "Sent value must match the amount");

        uint256 scheduleId = scheduledTransactionCount;
        scheduledTransactionCount += 1;

        scheduledTransactions.push(ScheduledTransactionStruct({
            id: scheduleId,
            sender: msg.sender,
            receiver: receiver,
            amount: amount,
            message: message,
            scheduledTime: scheduledTime,
            isExecuted: false,
            isCancelled: false,
            createdAt: block.timestamp
        }));

        userScheduledTransactions[msg.sender].push(scheduleId);

        emit ScheduledTransactionCreated(scheduleId, msg.sender, receiver, amount, message, scheduledTime);
    }

    // Execute a scheduled transaction (can be called by anyone when time is reached)
    function executeScheduledTransaction(uint256 scheduleId) public validScheduleId(scheduleId) {
        ScheduledTransactionStruct storage scheduledTx = scheduledTransactions[scheduleId];
        
        require(!scheduledTx.isExecuted, "Transaction already executed");
        require(!scheduledTx.isCancelled, "Transaction was cancelled");
        require(block.timestamp >= scheduledTx.scheduledTime, "Transaction time has not been reached");

        scheduledTx.isExecuted = true;
        executedScheduledTransactions[scheduleId] = true;
        transactionCount += 1;

        // Add to regular transactions history
        transactions.push(TransferStruct(
            scheduledTx.sender,
            scheduledTx.receiver,
            scheduledTx.amount,
            scheduledTx.message,
            block.timestamp,
            true,
            true
        ));

        // Transfer the ETH
        payable(scheduledTx.receiver).transfer(scheduledTx.amount);

        emit ScheduledTransactionExecuted(scheduleId, scheduledTx.sender, scheduledTx.receiver, scheduledTx.amount, scheduledTx.message, block.timestamp);
        emit Transfer(scheduledTx.sender, scheduledTx.receiver, scheduledTx.amount, scheduledTx.message, block.timestamp, true);
    }

    // Cancel a scheduled transaction (only by sender, before execution)
    function cancelScheduledTransaction(uint256 scheduleId) public validScheduleId(scheduleId) onlyOwner(scheduleId) {
        ScheduledTransactionStruct storage scheduledTx = scheduledTransactions[scheduleId];
        
        require(!scheduledTx.isExecuted, "Cannot cancel executed transaction");
        require(!scheduledTx.isCancelled, "Transaction already cancelled");

        scheduledTx.isCancelled = true;

        // Refund the ETH to sender
        payable(scheduledTx.sender).transfer(scheduledTx.amount);

        emit ScheduledTransactionCancelled(scheduleId, scheduledTx.sender);
    }

    // View functions
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getScheduledTransactionCount() public view returns (uint256) {
        return scheduledTransactionCount;
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getAllScheduledTransactions() public view returns (ScheduledTransactionStruct[] memory) {
        return scheduledTransactions;
    }

    function getUserScheduledTransactions(address user) public view returns (ScheduledTransactionStruct[] memory) {
        uint256[] memory userScheduleIds = userScheduledTransactions[user];
        ScheduledTransactionStruct[] memory userScheduled = new ScheduledTransactionStruct[](userScheduleIds.length);
        
        for (uint256 i = 0; i < userScheduleIds.length; i++) {
            userScheduled[i] = scheduledTransactions[userScheduleIds[i]];
        }
        
        return userScheduled;
    }

    function getPendingScheduledTransactions() public view returns (ScheduledTransactionStruct[] memory) {
        uint256 pendingCount = 0;
        
        // Count pending transactions
        for (uint256 i = 0; i < scheduledTransactions.length; i++) {
            if (!scheduledTransactions[i].isExecuted && !scheduledTransactions[i].isCancelled) {
                pendingCount++;
            }
        }

        ScheduledTransactionStruct[] memory pending = new ScheduledTransactionStruct[](pendingCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < scheduledTransactions.length; i++) {
            if (!scheduledTransactions[i].isExecuted && !scheduledTransactions[i].isCancelled) {
                pending[currentIndex] = scheduledTransactions[i];
                currentIndex++;
            }
        }

        return pending;
    }

    function getExecutableTransactions() public view returns (ScheduledTransactionStruct[] memory) {
        uint256 executableCount = 0;
        
        // Count executable transactions
        for (uint256 i = 0; i < scheduledTransactions.length; i++) {
            if (!scheduledTransactions[i].isExecuted && 
                !scheduledTransactions[i].isCancelled && 
                block.timestamp >= scheduledTransactions[i].scheduledTime) {
                executableCount++;
            }
        }

        ScheduledTransactionStruct[] memory executable = new ScheduledTransactionStruct[](executableCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < scheduledTransactions.length; i++) {
            if (!scheduledTransactions[i].isExecuted && 
                !scheduledTransactions[i].isCancelled && 
                block.timestamp >= scheduledTransactions[i].scheduledTime) {
                executable[currentIndex] = scheduledTransactions[i];
                currentIndex++;
            }
        }

        return executable;
    }

    // Get contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Allow contract to receive ETH
    receive() external payable {}
    fallback() external payable {}
}



// pragma solidity ^0.8.0;

// contract Transactions {
//     uint256 transactionCount;

//     event Transfer(address indexed from, address indexed to, uint amount, string message, uint256 timestamp);
  
//     struct TransferStruct {
//         address sender;
//         address receiver;
//         uint amount;
//         string message;
//         uint256 timestamp;
//     }

//     TransferStruct[] transactions;

//     function addToBlockchain(address payable receiver, uint amount, string memory message) public {
//         transactionCount += 1;
//         transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp));
//         emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
//     }

//     function getAllTransactions() public view returns (TransferStruct[] memory) {
//         return transactions;
//     }

//     function getTransactionCount() public view returns (uint256) {
//         return transactionCount;
//     }
// }