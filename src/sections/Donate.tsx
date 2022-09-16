import { Checkbox, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Content, ProgressButton } from "src/components";
import { useContract } from "src/hooks";
import { ICreator, TAuthWallet } from "src/types";
import {
    contract,
    getWalletTokenBalances,
    parseNumber,
    USDC_CONTRACT,
} from "src/utils";

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
    const [amount, setAmount] = useState("");
    const [balance, setBalance] = useState(0);
    const [direct, setDirect] = useState(false);
    const erc20Contract = contract(
        USDC_CONTRACT,
        ["function transfer(address to, uint256 value) public returns (bool)"],
        true
    );

    const { mutate, loading } = useContract({
        contract: erc20Contract,
        method: "transfer",
        skip: true,
        onResult: () => {
            setAmount("");
            toast.success("You've successfully donated");
        },
        onError: (e) => toast.error(`Sorry, ${e.reason}`),
    });

    useEffect(() => {
        getWalletTokenBalances({
            tokenAddresses: [USDC_CONTRACT],
            address: authWallet.address,
            chain: authWallet.network,
        })
            .then(({ result: [result] }) => setBalance(result.toNumber()))
            .catch(() => {});
    }, [authWallet]);

    return (
        <Content
            title={creator.name && `Buy @${creator.name} a Koffee`}
            sx={{ minWidth: 430, maxWidth: 440 }}
        >
            <TextField
                color="secondary"
                label="Amount to donate (in USDC)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ my: 1 }}
                fullWidth
            />
            <Typography sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                    color="secondary"
                    checked={direct}
                    onChange={() => setDirect((dir) => !dir)}
                />{" "}
                Donate directly to <strong>@{creator.name}</strong>
            </Typography>

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
                        mutate(
                            direct ? creatorAddress : creator.address,
                            parseNumber(amount, 6)
                        );
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
                    <span>Your Balance: {balance?.toFixed(2)} USDC</span>
                )}
            </Typography>
        </Content>
    );
};
