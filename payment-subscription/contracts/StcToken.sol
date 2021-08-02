// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract StcToken is ERC20 {
    constructor() ERC20('StcToken', 'STC') {
        _mint(msg.sender, 10000 * 10 ** 18);
    }
}