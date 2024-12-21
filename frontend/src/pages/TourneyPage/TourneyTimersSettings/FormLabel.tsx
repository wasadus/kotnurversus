import { ReactNode, useId } from "react";
import { BoxProps, Stack, Text } from "@chakra-ui/react";

type FormLabelProps = {
    label: string;
    isRequired?: boolean;
    children: ReactNode | ((id: string) => ReactNode);
} & Omit<BoxProps, "children">;

export const FormLabel = ({ label, children, ...props }: FormLabelProps) => {
    const id = useId();
    const needId = typeof children === "function";

    return (
        <Stack w="fit-content" align="center" spacing={4} {...props}>
            <Text
                w="fit-content"
                fontSize="md"
                fontWeight="medium"
                {...(needId ? { as: "label", htmlFor: id } : {})}
                children={label}
            />
            {needId ? children(id) : children}
        </Stack>
    );
};