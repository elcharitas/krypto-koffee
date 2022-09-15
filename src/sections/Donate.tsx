import { TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Content, ProgressButton } from "src/components";
import { useContract } from "src/hooks";
import { ICreator, TAuthWallet } from "src/types";
import { contract, getNativeBalance, parseNumber } from "src/utils";

interface IDonate {
    creator: ICreator;
    creatorAddress: string;
    authWallet: TAuthWallet;
}
export const Donate: FC<IDonate> = ({
    authWallet,
    creatorAddress,
    creator,
}) => {
    const [amount, setAmount] = useState("0");
    const [balance, setBalance] = useState(0);
    const erc20Contract = contract(
        "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        ["function transfer(address to, uint256 value) public returns (bool)"]
    );

    const { mutate, loading } = useContract({
        contract: erc20Contract,
        method: "transfer",
        skip: true,
    });

    useEffect(() => {
        getNativeBalance({
            address: authWallet.address,
            chain: authWallet.network,
        })
            .then(({ result }) => setBalance(Number(result.balance.ether)))
            .catch(() => {});
    }, [authWallet]);

    return (
        <Content
            title={`Buy @${creator.name} a Koffee`}
            sx={{ minWidth: 430, maxWidth: 440 }}
        >
            <TextField
                color="secondary"
                label="Amount to donate (in ETH)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ my: 1 }}
                fullWidth
            />

            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <ProgressButton
                    sx={{
                        minWidth: "120px",
                        color: "white",
                        display: { xs: "none", md: "flex" },
                    }}
                    color="secondary"
                    variant="contained"
                    onClick={() => {
                        mutate(creator.address, parseNumber(amount));
                    }}
                    isSubmitting={loading}
                    disabled={
                        loading ||
                        Number(amount) > balance ||
                        Number(amount) <= 0 ||
                        authWallet.address === creatorAddress
                    }
                >
                    Donate
                </ProgressButton>
                {authWallet.connected && (
                    <span>Your Balance: {balance?.toFixed(2)} ETH</span>
                )}
            </Typography>
        </Content>
    );
};
