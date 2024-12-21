import { ButtonProps, useDisclosure } from "@chakra-ui/react";
import { IconButtonWithTooltip } from "~/components/IconButtonWithTooltip.tsx";
import { CrossIcon } from "~/icons/CrossIcon.tsx";
import { Alert } from "~/components/Alert.tsx";

type RemoveButtonProps = {
    onRemove: () => void;
} & ButtonProps;

export const RemoveButton = ({ onRemove, ...props }: RemoveButtonProps) => {
    const alert = useDisclosure();

    return (
        <>
            <IconButtonWithTooltip
                pos="absolute"
                right={-3}
                top={-3}
                size="xs"
                colorScheme="red"
                label="Удалить"
                borderRadius="full"
                onClick={alert.onOpen}
                icon={<CrossIcon boxSize={5} />}
                {...props}
            />
            <Alert
                isOpen={alert.isOpen}
                onClose={alert.onClose}
                onSubmit={onRemove}
                children="Вы уверены, что хотите удалить данную команду?"
            />
        </>
    );
};