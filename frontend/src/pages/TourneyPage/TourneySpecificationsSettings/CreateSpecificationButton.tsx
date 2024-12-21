import { TourneySpecificationWithId } from "~/types/tourney";
import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";
import { SpecificationWindow } from "~/components/SpecificationWindow";

type CreateSpecificationButtonProps = {
    onCreate: (specification: TourneySpecificationWithId) => void;
} & ButtonProps;

export const CreateSpecificationButton = ({
                                       onCreate,
                                       ...props
                                   }: CreateSpecificationButtonProps) => {
    const window = useDisclosure();

    const handleSubmit = (specification: TourneySpecificationWithId) => {
        onCreate(specification);
        window.onClose();
    };

    return (
        <>
            <Button
                {...props}
                {...window.getButtonProps()}
                w="fit-content"
                variant="link"
                colorScheme="blue"
                onClick={window.onOpen}
                children="Добавить"
            />
            <SpecificationWindow.Create
                {...window.getDisclosureProps()}
                isOpen={window.isOpen}
                onClose={window.onClose}
                onSubmit={handleSubmit}
            />
        </>
    );
};