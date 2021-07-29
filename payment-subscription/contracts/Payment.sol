// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Payment {
    uint public nextPlanId;

    // estructura Plan
    struct Plan {
        address merchant; // comerciante
        address token;
        uint ammount; //cantidad
        uint frequency;
    }

    // estructura de la subscripción
    struct Subscription {
        address subscriber;
        uint start;
        uint nextPayment; 
    }

    mapping(uint => Plan) public plans;
    mapping(address => mapping(uint => Subscription)) public Subscriptions;
}