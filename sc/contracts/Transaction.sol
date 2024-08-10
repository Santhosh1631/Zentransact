// SPDX-License-Identifier: UNLICENSED

// pragma solidity ^0.8.0;

// //import "hardhat/console.sol";

// contract Transactions {
//     uint256 transactionCount;

//     event Transfer(address from, address receiver, uint amount, string message, uint256 timestamp);
  
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


// SPDX-License-Identifier: UNLICENSED
// SPDX-License-Identifier: UNLICENSED
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 public transactionCount;

    event Transfer(address indexed from, address indexed receiver, uint amount, string message, uint256 timestamp);
    event ScheduledTransaction(address indexed from, address indexed receiver, uint amount, string message, uint256 timestamp);

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
    }

    TransferStruct[] public transactions;

    mapping(address => mapping(uint256 => bool)) public scheduledTransactions;

    function addToBlockchain(address payable receiver, uint amount, string memory message) public {
        transactionCount += 1;
        transactions.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp));
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);
    }

    function scheduleTransaction(address payable receiver, uint amount, string memory message, uint256 scheduledTime) public {
        require(scheduledTime > block.timestamp, "Scheduled time must be in the future");

        transactions.push(TransferStruct(msg.sender, receiver, amount, message, scheduledTime));
        scheduledTransactions[receiver][scheduledTime] = true;

        emit ScheduledTransaction(msg.sender, receiver, amount, message, scheduledTime);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }

    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    function getScheduledTransactions(address _receiver) public view returns (TransferStruct[] memory) {
        TransferStruct[] memory result = new TransferStruct[](transactionCount);

        uint256 count = 0;
        for (uint256 i = 0; i < transactions.length; i++) {
            if (transactions[i].receiver == _receiver && transactions[i].timestamp > block.timestamp) {
                result[count] = transactions[i];
                count++;
            }
        }
        return result;
    }
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