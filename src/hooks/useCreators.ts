import { useEffect, useState } from "react";
import {
    ECreatorCategory,
    TEventResponse,
    TPageClaimedEvent,
    ICreator,
    ENetwork,
} from "src/types";
import {
    fetchJSON,
    getContractEvents,
    pageContractAbi,
    resolveIpns,
} from "src/utils";

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
                        resolveIpns(ipns)
                            .then((data) => fetchJSON<ICreator>(data.value))
                            .then((data) => ({
                                category: ECreatorCategory.Other,
                                photoURL: "/assets/avatar.jpeg",
                                ...data,
                                ipns,
                                address: creator,
                                name: pageId,
                            }))
                    )
                ).then(setCreators);
            })
            .catch(() => {});
    }, [network]);

    return creators;
};
