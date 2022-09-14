import { FC } from "react";
import dynamic from "next/dynamic";
import {
    WidgetProps,
    VerificationResponse,
    VerificationErrorResponse,
} from "@worldcoin/id";

const WorldIDWidget = dynamic<WidgetProps>(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
);

interface IWorldID {
    signal: string;
    signalDescription?: string;
    onSuccess: (data: VerificationResponse) => void;
    onError: (error: VerificationErrorResponse) => void;
}
const WorldID: FC<IWorldID> = ({ signal, signalDescription }) => (
    <WorldIDWidget
        actionId={String(process.env.NEXT_PUBLIC_WORLD_ID_ACTION_ID)}
        appName="Krypto Koffee"
        signal={signal}
        signalDescription={signalDescription}
        theme="dark"
        enableTelemetry={process.env.NODE_ENV === "production"}
        debug={process.env.NODE_ENV === "development"}
        onSuccess={(data) => console.log(data)}
        onError={(error) => console.log(error)}
    />
);

export default WorldID;
