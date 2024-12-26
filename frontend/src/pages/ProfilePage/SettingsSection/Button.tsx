import { Button as BaseButton, ButtonProps } from "@chakra-ui/react";

export const Button = (props: ButtonProps) => (
    <BaseButton p={2} variant="link" {...props} />
);