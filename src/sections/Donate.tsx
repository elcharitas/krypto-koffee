import { TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Content, ProgressButton } from "src/components";
import { ICreator, TAuthWallet } from "src/types";
import { getNativeBalance } from "src/utils";

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
                    disabled={
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
