import { TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Content, ProgressButton } from "src/components";
import { ICreator, TAuthWallet } from "src/types";
import { getNativeBalance } from "src/utils";

interface IWithdrawBalance {
    creator: ICreator;
    authWallet: TAuthWallet;
}
export const WithdrawBalance: FC<IWithdrawBalance> = ({
    creator,
    authWallet,
}) => {
    const [balance, setBalance] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState("0");
    const [withdrawAddress, setWithdrawAddress] = useState("");

    useEffect(() => {
        getNativeBalance({
            address: creator.address,
            chain: authWallet.network,
        })
            .then(({ result }) => setBalance(Number(result.balance.ether)))
            .catch(() => {});
    }, [creator]);

    return (
        <Content title="Withdraw Balance" sx={{ maxWidth: 440 }}>
            <TextField
                color="secondary"
                label="Amount to withdraw (in ETH)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                sx={{ my: 1 }}
                fullWidth
            />
            <TextField
                color="secondary"
                label="Withdraw to Address"
                value={withdrawAddress}
                onChange={(e) => setWithdrawAddress(e.target.value)}
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
                >
                    Withdraw
                </ProgressButton>
                <span>{balance} ETH</span>
            </Typography>
        </Content>
    );
};
