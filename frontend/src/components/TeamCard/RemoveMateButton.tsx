import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { IconButtonWithTooltip } from "~/components/IconButtonWithTooltip.tsx";
import { CrossIcon } from "~/icons/CrossIcon.tsx";
import { Alert } from "~/components/Alert.tsx";

type RemoveMateButtonProps = {
    onRemove: () => void;
} & ButtonProps;

export const RemoveMateButton = ({ onRemove, ...props }: RemoveMateButtonProps) => {
    const alert = useDisclosure();

    return (
        <>
            <IconButtonWithTooltip
                size="xs"
                label="Удалить участника"
                borderRadius="full"
                onClick={alert.onOpen}
                icon={<CrossIcon boxSize={4} />}
                {...props}
            />
            <Alert
                isOpen={alert.isOpen}
                onClose={alert.onClose}
                onSubmit={onRemove}
                children="Вы уверены, что хотите удалить данного участника?"
            />
        </>
    );
};