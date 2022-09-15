import { FC, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Skeleton, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { IPage, ICreator } from "src/types";
import { Content, Tabs } from "src/components";
import {
    contract,
    pageContractAbi,
    formatBigNumber,
    getCreator,
    payWalletContractAbi,
} from "src/utils";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { creator } = ctx.query;
    const pageContract = contract(
        String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
        pageContractAbi
    );
    const paypage = await pageContract.paypage(creator);
    const wallContract = contract(String(paypage), payWalletContractAbi);
    const ipns = await wallContract.ipns();
    return {
        props: {
            pageId: creator,
            address: paypage,
            ipns,
        },
        notFound: !formatBigNumber(paypage),
    };
};

interface IPayWall extends IPage {
    pageId: string;
    address: string;
    ipns: string;
}
const Page: FC<IPayWall> = ({ pageId, address, ipns }) => {
    const [creator, setCreator] = useState<ICreator>({ address });

    useEffect(() => {
        getCreator(ipns, address, pageId).then(setCreator);
    }, []);

    return (
        <>
            <Head>
                <title>Support {pageId} | Krypto Koffee</title>
            </Head>
            <Content
                sx={{
                    display: "flex",
                    minHeight: "300px",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#060606",
                }}
            >
                {creator?.photoURL ? (
                    <Image
                        src={creator?.photoURL}
                        width="150px"
                        height="150px"
                        style={{ borderRadius: "50%" }}
                    />
                ) : (
                    <Skeleton variant="circular" width={150} height={150} />
                )}
                {creator?.name ? (
                    <>
                        <Typography align="center" variant="h6">
                            {creator.name}
                        </Typography>
                        <Typography>{creator?.bio}</Typography>
                    </>
                ) : (
                    <>
                        <Skeleton variant="text" width={150} height={40} />
                        <Skeleton variant="text" width={150} height={15} />
                    </>
                )}
            </Content>
            <Stack justifyContent="center" alignItems="center">
                <Tabs
                    color="secondary"
                    tabs={[
                        { label: "About", content: "" },
                        { label: "Memberships", content: "" },
                        { label: "Donations", content: "" },
                    ]}
                />
            </Stack>
        </>
    );
};

Page.displayName = "Creators";

export default Page;
