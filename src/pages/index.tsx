import { FC, FormEventHandler, useRef, useState } from "react";
import toast from "react-hot-toast";
import NextLink from "next/link";
import { IPage } from "src/types";
import { Box, debounce, Modal, Typography } from "@mui/material";
import { CopyAllOutlined } from "@mui/icons-material";
import { HeroContent, CreatorTab } from "src/sections";
import { useContract, useCreators } from "src/hooks";
import { contract, createIpns, pageContractAbi } from "src/utils";
import { Content } from "src/components";

const Page: FC<IPage> = ({ network, authWallet }) => {
    const pageContract = contract(
        String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
        pageContractAbi,
        true
    );

    const pageRef = useRef<{ id: string; key: string }>();
    const [pageId, setPageId] = useState<string | undefined>();
    const [openModal, setOpenModal] = useState(false);
    const [valid, setValid] = useState(true);
    const toggleModal = () => setOpenModal((open) => !open);

    const creators = useCreators({ network });
    const { mutate, loading } = useContract({
        contract: pageContract,
        method: "claim",
        skip: true,
        onResult: () => {
            toast.success("PayWall has been claimed successfully!");
            setPageId(undefined);
            toggleModal();
        },
        onError: (error) => {
            toast.error(
                `Sorry, ${
                    error.reason || "we could not claim this page"
                }, please try again`
            );
        },
    });
    const handleClaim = () => {
        if (!authWallet.connected) {
            toast.error("Please connect your wallet first");
            return;
        }
        if (pageId) {
            createIpns("")
                .then(({ ipns, accessKey, publicKey }) => {
                    pageRef.current = { key: accessKey, id: pageId };
                    mutate(pageId, ipns, publicKey);
                })
                .catch(() => toast.error("Sorry, could not claim page"))
                .finally(() => setPageId(undefined));
        } else toast.error("Please, choose a unique name for your page.");
    };
    const handlePageSearch: FormEventHandler = ({ target }) => {
        const { value } = target as HTMLInputElement;
        if (value.length > 0) {
            const isValid = value.match(/^[a-z0-9\-]+$/i);
            if (isValid) setPageId(value);
            setValid(!!isValid?.length);
        } else {
            setPageId(undefined);
            setValid(true);
        }
    };

    return (
        <>
            <HeroContent
                isValid={valid}
                isClaiming={loading}
                authWallet={authWallet}
                handleClaim={handleClaim}
                handlePageSearch={debounce(handlePageSearch, 500)}
            />
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CreatorTab creators={creators} />
            </Box>
            <Modal open={openModal} onClose={toggleModal}>
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
                    <Content
                        title="PayWall Created successfully!"
                        sx={{ background: "transparent" }}
                    >
                        <Typography variant="body1" gutterBottom>
                            Your PayWall has been created successfully, you can
                            now share the following link with your audience:
                        </Typography>
                        <NextLink href={`/${pageRef.current?.id}`} passHref>
                            <Typography
                                variant="body1"
                                sx={{
                                    background: "#333",
                                    border: "1px solid #fff",
                                    borderRadius: "8px",
                                    padding: "8px",
                                    marginBottom: "8px",
                                    cursor: "pointer",
                                }}
                            >
                                https://krypto-koffee.app/{pageRef.current?.id}
                            </Typography>
                        </NextLink>
                        <Typography variant="body1" gutterBottom>
                            Please, <strong>keep this key safe</strong>, you
                            will need it to update your PayWall:
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                backgroundColor: "error.main",
                                border: "1px solid #fff",
                                borderRadius: "8px",
                                padding: "8px",
                                marginBottom: "8px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                if (pageRef.current?.key) {
                                    navigator.clipboard.writeText(
                                        pageRef.current.key
                                    );
                                    toast.success(
                                        "Access Key has been copied to clipboard"
                                    );
                                }
                            }}
                        >
                            {pageRef.current?.key} <CopyAllOutlined />
                        </Typography>
                    </Content>
                </Box>
            </Modal>
        </>
    );
};

Page.displayName = "Home";

export default Page;
