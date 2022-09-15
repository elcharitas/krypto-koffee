import { useEffect, useState } from "react";
import {
    TEventResponse,
    TPageClaimedEvent,
    ICreator,
    ENetwork,
} from "src/types";
import { getContractEvents, getCreator, pageContractAbi } from "src/utils";

interface IUseCreators {
    network: ENetwork;
}
export const useCreators = ({ network }: IUseCreators) => {
    const [creators, setCreators] = useState<ICreator[]>([]);

    useEffect(() => {
        getContractEvents({
            chain: network,
            address: String(process.env.NEXT_PUBLIC_MANAGER_CONTRACT),
            abi: pageContractAbi.find(({ name }) => name === "PageClaimed"),
            topic: String(process.env.NEXT_PUBLIC_MANAGER_EVENT),
        })
            .then(
                (events) =>
                    (events as unknown) as TEventResponse<TPageClaimedEvent>
            )
            .then(({ data }) => {
                Promise.all(
                    data.result.map(({ data: { creator, ipns, pageId } }) =>
                        getCreator(ipns, creator, pageId)
                    )
                ).then(setCreators);
            })
            .catch(() => {});
    }, [network]);

    return creators;
};
