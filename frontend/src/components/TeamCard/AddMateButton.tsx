import { Button, ButtonProps } from "@chakra-ui/react";

export const AddMateButton = (props: ButtonProps) => (
    <Button
        ml={8}
        mb={2}
        variant="link"
        colorScheme="blue"
        fontWeight="medium"
        children="Добавить"
        {...props}
    />
);