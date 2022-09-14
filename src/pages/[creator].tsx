import { FC } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { IPage, TCreator } from "src/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { creator: pageId } = ctx.query;
    console.log(pageId);
    return {
        props: {
            creator: {
                address: "0x123",
                category: 1,
            },
        },
        notFound: true,
    };
};

interface ICreator extends IPage {
    creator: TCreator;
}
const Page: FC<ICreator> = ({ creator }) => {
    return (
        <Head>
            <title>Stuff</title>
        </Head>
    );
};

Page.displayName = "Creators";

export default Page;
