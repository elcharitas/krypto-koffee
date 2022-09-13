import { FC } from "react";
import Image from "next/image";
import {
    Box,
    Button,
    Link,
    Modal,
    Stack,
    Tooltip,
    Typography,
} from "@mui/material";
import { EWallet, TAuthWallet, TCallback, TColor } from "src/types";
import { Content } from "src/components";
import { etherScanUrl, formatAddress } from "src/utils";

const wallets = {
    Coinbase: "info",
    MetaMask: "warning",
    WalletConnect: "primary",
};

interface IAccountsModal {
    isOpen: boolean;
    toggleAccounts: TCallback;
    authWallet: TAuthWallet;
    connectWallet: TCallback<void, EWallet>;
    disconnectWallet: TCallback;
}
export const AccountsModal: FC<IAccountsModal> = ({
    isOpen,
    toggleAccounts,
    authWallet,
    connectWallet,
    disconnectWallet,
}) => (
    <Modal
        open={isOpen}
        onClose={toggleAccounts}
        aria-labelledby="accounts-modal-title"
        aria-describedby="accounts-modal-description"
    >
        <Box
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 320,
                bgcolor: "background.paper",
                border: "2px solid #000",
                borderRadius: "8px",
                boxShadow: 24,
                p: 2,
            }}
        >
            <Typography id="accounts-modal-title" align="center" variant="h6">
                {authWallet.connected ? "Accounts" : "Connect Wallet"}
            </Typography>
            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                {!authWallet.connected
                    ? Object.entries(wallets).map(([wallet, color]) => (
                          <Tooltip
                              key={wallet}
                              title={`Connect using ${wallet}`}
                          >
                              <Button
                                  sx={{
                                      textTransform: "capitalize",
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                  }}
                                  color={color as TColor}
                                  variant="outlined"
                                  onClick={() =>
                                      connectWallet(
                                          wallet.toLowerCase() as EWallet
                                      )
                                  }
                              >
                                  <Typography
                                      sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          ml: 1,
                                      }}
                                  >
                                      {wallet}
                                  </Typography>
                                  <Image
                                      src={`/assets/wallets/${wallet.toLowerCase()}.png`}
                                      width={20}
                                      height={20}
                                      alt={wallet}
                                  />
                              </Button>
                          </Tooltip>
                      ))
                    : authWallet.accounts.map((account) => (
                          <Content
                              key={account}
                              sx={{
                                  cursor: "pointer",
                                  border: "1px solid #333",
                                  background: "transparent",
                              }}
                          >
                              <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                              >
                                  <Typography
                                      fontWeight={
                                          authWallet.address !== account
                                              ? "inherit"
                                              : "bold"
                                      }
                                  >
                                      {formatAddress(account)}
                                  </Typography>

                                  <Stack
                                      direction="row"
                                      justifyContent="end"
                                      alignItems="center"
                                      spacing={1}
                                  >
                                      <Button
                                          sx={{
                                              textTransform: "capitalize",
                                              py: 0,
                                          }}
                                          color="info"
                                          variant="outlined"
                                          disabled={
                                              authWallet.address !== account
                                          }
                                      >
                                          Change
                                      </Button>
                                      <Button
                                          sx={{
                                              textTransform: "capitalize",
                                              py: 0,
                                          }}
                                          color="error"
                                          variant="outlined"
                                          onClick={disconnectWallet}
                                          disabled={
                                              authWallet.address !== account
                                          }
                                      >
                                          Disconnect
                                      </Button>
                                  </Stack>
                              </Stack>
                              <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  sx={{ mt: 1 }}
                              >
                                  <Typography
                                      color="grey"
                                      fontSize="small"
                                      textTransform="capitalize"
                                      sx={{ textDecoration: "underline" }}
                                  >
                                      {authWallet.address === account && (
                                          <>
                                              Connected With {authWallet.wallet}
                                          </>
                                      )}
                                      &nbsp;
                                  </Typography>
                                  <Link
                                      color="secondary"
                                      href={etherScanUrl(account)}
                                      target="_blank"
                                      rel="noreferrer"
                                      fontSize="small"
                                      textTransform="capitalize"
                                      sx={{ textDecoration: "none" }}
                                  >
                                      View on etherscan
                                  </Link>
                              </Stack>
                          </Content>
                      ))}
            </Stack>
        </Box>
    </Modal>
);
