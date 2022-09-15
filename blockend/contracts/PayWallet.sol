// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPayRouter {
    function WETH() external pure returns (address);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[2] calldata path,
        address to,
        uint deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[2] calldata path,
        address to,
        uint deadline
    ) external returns (uint256[] memory amounts);
}

contract PayWallet {
    // the address of the creator of this wallet
    string public ipns;
    string public publicKey;
    address public creator;
    // address for dex router
    address private immutable router;
    address private immutable manager;

    event TokenReceived(address indexed sender, uint256 amount);
    event TokenWithdrawn(address indexed token, uint256 amount);

    constructor(
        address _creator,
        string memory _ipns,
        string memory _publicKey,
        address _router
    ) {
        router = _router;
        creator = _creator;
        publicKey = _publicKey;
        ipns = _ipns;
        manager = msg.sender;
    }

    function transfer(address _newCreator) external {
        require(msg.sender == creator, "only creator can transfer page");
        (bool paidFees, ) = payable(manager).call{value: 1 ether}("");
        require(paidFees, "failed to pay fees for page transfer");
        creator = _newCreator;
    }

    /**
     * @dev withdraws a token to wallet
     */
    function withdraw(uint256 _amount, address _token) external {
        require(msg.sender == creator, "only creator can withdraw");
        IERC20(_token).transfer(msg.sender, _amount);
        emit TokenWithdrawn(_token, _amount);
    }

    /**
     * @dev Withdraws the specified amount of the specified token from the contract.
     */
    function withdrawToken(
        uint256 _amountIn,
        address _tokenIn,
        address _tokenOut,
        uint256 _deadline
    ) external {
        require(msg.sender == creator, "Only creator can withdraw");

        // approve the router to spend the token
        IERC20(_tokenIn).approve(router, 0);
        IERC20(_tokenIn).approve(router, _amountIn);

        // swap the token
        IPayRouter(router).swapExactTokensForTokens(
            _amountIn,
            0,
            [_tokenIn, _tokenOut],
            creator,
            _deadline
        );

        emit TokenWithdrawn(_tokenIn, _amountIn);
    }

    /**
     * @dev Withdraws the specified amount of the specified token from the contract in ETH.
     */
    function withdrawEth(uint256 _amount) external {
        require(msg.sender == creator, "only creator can withdraw");
        (bool withdrawn, ) = payable(msg.sender).call{value: _amount}("");
        require(withdrawn, "Token Withdrawal failed");
        emit TokenWithdrawn(address(0), _amount);
    }

    fallback() external payable {
        emit TokenReceived(msg.sender, msg.value);
    }

    receive() external payable {
        emit TokenReceived(msg.sender, msg.value);
    }
}
