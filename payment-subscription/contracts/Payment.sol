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

    event PlanCreado(
        address merchant,
        uint planId,
        uint date
    );

    event SubscriptionCancelled(
        address subscriber,
        uint planId,
        uint date
    );

    event PaymentSent(
        address from,
        address to,
        uint amount,
        uint planId,
        uint date
    );

    function crearPlan(address token, uint amount, uint frequency) external {
        require(token != address(0), 'addres cannot be nul address');
        require(amount > 0, 'amount needs to be > 0');
        require(frequency > 0, 'frequency needs to be > 0');
        plans[nextPlanId] = Plan(
            msg.sender,
            token,
            amount,
            frequency
        );
        nextPlanId++;
    }
}