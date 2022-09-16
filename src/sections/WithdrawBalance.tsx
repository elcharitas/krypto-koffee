import { TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Content, ProgressButton } from "src/components";
import { useContract } from "src/hooks";
import { ICreator, TAuthWallet } from "src/types";
import {
    contract,
    getWalletTokenBalances,
    parseNumber,
    payWalletContractAbi,
    USDC_CONTRACT,
} from "src/utils";

interface IWithdrawBalance {
    creator: ICreator;
    authWallet: TAuthWallet;
}
export const WithdrawBalance: FC<IWithdrawBalance> = ({
    creator,
    authWallet,
}) => {
    const pageContract = contract(creator.address, payWalletContractAbi, true);

    const [balance, setBalance] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState("");

    const { mutate, loading } = useContract({
        contract: pageContract,
        method: "withdraw",
        skip: true,
        onResult: () => {
            setWithdrawAmount("");
            toast.success("Your withdrawal has been processed successfully");
        },
        onError: (e) => toast.error(`Sorry, ${e.reason}`),
    });

    useEffect(() => {
        getWalletTokenBalances({
            tokenAddresses: [USDC_CONTRACT],
            address: creator.address,
            chain: authWallet.network,
        })
            .then(({ result: [result] }) => setBalance(result.toNumber()))
            .catch(() => {});
    }, [creator]);

    return (
        <Content title="Withdraw Balance" sx={{ maxWidth: 440 }}>
            <TextField
                color="secondary"
                label="Amount to withdraw (in USDC)"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
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
                    isSubmitting={loading}
                    onClick={() =>
                        mutate(parseNumber(withdrawAmount, 6), USDC_CONTRACT)
                    }
                >
                    Withdraw
                </ProgressButton>
                <span>{balance} USDC</span>
            </Typography>
        </Content>
    );
};
