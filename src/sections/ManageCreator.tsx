import { FC, useState } from "react";
import toast from "react-hot-toast";
import { TextField } from "@mui/material";
import { Content, ProgressButton, Select } from "src/components";
import { ECreatorCategory, ICreator } from "src/types";
import { updateIpns, createFile, storageClient, denum } from "src/utils";

const categories = denum(ECreatorCategory);
interface IManageCreator {
    ipns: string;
    creator: ICreator;
    publicKey: string;
    updateField: (field: keyof ICreator, value: string | number) => void;
}
export const ManageCreator: FC<IManageCreator> = ({
    ipns,
    publicKey,
    creator,
    updateField,
}) => {
    const [accessKey, setAccessKey] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);
    return (
        <Content title="Manage PayWall" sx={{ maxWidth: 340 }}>
            <TextField
                color="secondary"
                label="PayWall Id"
                value={creator.name}
                sx={{ my: 1 }}
                fullWidth
                disabled
            />
            <TextField
                color="secondary"
                label="Short bio about you"
                value={creator.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                sx={{ my: 1 }}
                fullWidth
            />
            <Select
                value={creator.category}
                label="Your Industry"
                placeholder="Select an industry that best describes you"
                options={categories.map(([label, value]) => ({ label, value }))}
                onChange={(value) => {
                    if (value) updateField("category", Number(value));
                }}
                sx={{ my: 1 }}
            />
            <TextField
                rows={4}
                color="secondary"
                label="Describe what you do in detail"
                value={creator.description}
                onChange={(e) => updateField("description", e.target.value)}
                sx={{ my: 1 }}
                fullWidth
                multiline
            />
            <TextField
                color="secondary"
                label="Input access key to update"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                sx={{ my: 1 }}
                fullWidth
            />
            <ProgressButton
                sx={{
                    minWidth: "120px",
                    color: "white",
                    display: { xs: "none", md: "flex" },
                }}
                color="secondary"
                variant="contained"
                onClick={() => {
                    setIsSaving(true);
                    storageClient
                        .put([createFile(creator)])
                        .then((cid) =>
                            updateIpns(ipns, accessKey, publicKey, cid)
                        )
                        .then(() => {
                            toast.success("Successfully updated your info");
                        })
                        .catch((e) => {
                            toast.error(
                                "Sorry, your info could not be updated"
                            );
                        })
                        .finally(() => {
                            setIsSaving(false);
                        });
                }}
                isSubmitting={isSaving}
                disabled={!accessKey || isSaving}
            >
                Update
            </ProgressButton>
        </Content>
    );
};
