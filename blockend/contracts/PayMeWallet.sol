// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IPayRouter {
    function WETH() external pure returns (address);

    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);

    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract PayMeWallet {
    // the address of the creator of this wallet
    address private creator;
    // address for dex router
    address private immutable router;

    event TokenReceived(address indexed sender, uint256 amount);
    event TokenWithdrawn(address indexed token, uint256 amount);

    constructor(address _creator, address _router) {
        router = _router;
        creator = _creator;
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
        (uint256 _amountOut, ) = IPayRouter(router).swapExactTokensForTokens(
            _amountIn,
            0,
            [_tokenIn, _tokenOut],
            creator,
            _deadline
        );

        emit TokenWithdrawn(_tokenOut, _amountOut);
    }

    /**
     * @dev Withdraws the specified amount of the specified token from the contract in ETH.
     */
    function withdrawEth(
        uint256 _amountIn,
        address _tokenIn,
        uint256 _deadline
    ) external {
        require(msg.sender == creator, "Only creator can withdraw");

        // approve the router to spend the token
        IERC20(_tokenIn).approve(router, 0);
        IERC20(_tokenIn).approve(router, _amountIn);

        // swap the token
        address _tokenOut = IPayRouter(router).WETH();
        (uint256 _amountOut, ) = IPayRouter(router).swapExactTokensForETH(
            _amountIn,
            0,
            [_tokenIn, _tokenOut],
            creator,
            _deadline
        );

        emit TokenWithdrawn(_tokenOut, _amountOut);
    }

    fallback() external payable {
        emit TokenReceived(msg.sender, msg.value);
    }
}
