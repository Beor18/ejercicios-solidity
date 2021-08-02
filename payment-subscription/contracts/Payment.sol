// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payment {
    uint256 public nextPlanId;

    // estructura Plan
    struct Plan {
        address merchant; // comerciante
        address token;
        uint256 amount; //cantidad
        uint256 frequency;
    }

    // estructura de la subscripción
    struct Subscription {
        address subscriber;
        uint256 start;
        uint256 nextPayment;
    }

    mapping(uint256 => Plan) public plans;
    mapping(address => mapping(uint256 => Subscription)) public Subscriptions;

    event PlanCreado(address merchant, uint256 planId, uint256 date);

    event SubscriptionCreated(address subscriber, uint256 planId, uint256 date);

    event SubscriptionCancelled(
        address subscriber,
        uint256 planId,
        uint256 date
    );

    event PaymentSent(
        address from,
        address to,
        uint256 amount,
        uint256 planId,
        uint256 date
    );

    function crearPlan(
        address token,
        uint256 amount,
        uint256 frequency
    ) external {
        require(token != address(0), "addres cannot be nul address");
        require(amount > 0, "amount needs to be > 0");
        require(frequency > 0, "frequency needs to be > 0");
        plans[nextPlanId] = Plan(msg.sender, token, amount, frequency);
        nextPlanId++;
    }

    function subscribe(uint256 planId) external {
        IERC20 token = IERC20(plans[planId].token);
        Plan storage plan = plans[planId];
        require(plan.merchant != address(0), "");

        token.transferFrom(msg.sender, plan.merchant, plan.amount);

        emit PaymentSent(
            msg.sender,
            plan.merchant,
            plan.amount,
            planId,
            block.timestamp
        );

        Subscriptions[msg.sender][planId] = Subscription(
            msg.sender,
            block.timestamp,
            block.timestamp + plan.frequency
        );

        emit SubscriptionCreated(msg.sender, planId, block.timestamp);
    }

    function cancel(uint256 planId) external {
        Subscription storage subscription = Subscriptions[msg.sender][planId];
        require(
            subscription.subscriber != address(0),
            "not exist 00"
        );
        delete Subscriptions[msg.sender][planId];
        emit SubscriptionCancelled(msg.sender, planId, block.timestamp);
    }

    function pay(address subscriber, uint256 planId) external {
        Subscription storage subscription = Subscriptions[subscriber][planId];
        Plan storage plan = plans[planId];
        IERC20 token = IERC20(plan.token);
        require(
            subscription.subscriber != address(0),
            "not exist 01"
        );
        require(block.timestamp > subscription.nextPayment, "error! 00");

        token.transferFrom(subscriber, plan.merchant, plan.amount);
        emit PaymentSent(
            subscriber,
            plan.merchant,
            plan.amount,
            planId,
            block.timestamp
        );
        subscription.nextPayment = subscription.nextPayment + plan.frequency;
    }
}
