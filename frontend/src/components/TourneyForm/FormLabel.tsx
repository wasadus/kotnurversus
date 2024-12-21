import { ReactNode } from "react";
import { Text, useId } from "@chakra-ui/react";

type FormLabelProps = {
    label: string;
    isRequired?: boolean;
    children: ReactNode | ((id: string) => ReactNode);
};

export const FormLabel = ({ label, isRequired, children }: FormLabelProps) => {
    const id = useId();

    const needId = typeof children === "function";

    return (
        <>
            <Text
                mt={2}
                h="fit-content"
                fontSize="lg"
                fontWeight="medium"
                justifySelf="flex-end"
                textAlign="right"
                {...(needId ? { as: "label", htmlFor: id } : {})}
            >
                {label}
                {isRequired && (
                    <Text pos="absolute" as="span" ml={2} color="red.500" children="*" />
                )}
            </Text>
            {needId ? children(id) : children}
        </>
    );
};