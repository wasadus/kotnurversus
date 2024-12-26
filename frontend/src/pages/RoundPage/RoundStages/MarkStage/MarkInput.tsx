import { BoxProps, HStack, IconButton, Input, useNumberInput } from "@chakra-ui/react";
import { useEffect } from "react";
import { MinusIcon } from "~/icons/MinusIcon";
import { PlusIcon } from "~/icons/PlusIcon";

type MarkInputProps = {
    onChange?: (value: number) => void;
} & Omit<BoxProps, "onChange">;

export const MarkInput = ({ onChange, ...props }: MarkInputProps) => {
    const {
        value,
        getInputProps,
        getIncrementButtonProps,
        getDecrementButtonProps,
    } = useNumberInput({
        step: 1,
        defaultValue: 0,
        min: 0,
        max: 99,
    });

    useEffect(() => {
        onChange?.(parseInt(value.trim()) || 0);
    }, [value]);

    return (
        <HStack {...props}>
            <IconButton
                {...getDecrementButtonProps()}
                px={0}
                size="sm"
                variant="ghost"
                colorScheme="red"
                borderRadius="full"
                icon={<MinusIcon boxSize={4} />}
                aria-label="Уменьшить"
            />
            <Input
                {...getInputProps()}
                maxLength={2}
                boxSize={16}
                borderRadius="full"
                fontSize="xl"
                fontWeight="bold"
                textAlign="center"
            />
            <IconButton
                {...getIncrementButtonProps()}
                px={0}
                size="sm"
                variant="ghost"
                colorScheme="green"
                borderRadius="full"
                icon={<PlusIcon boxSize={4} />}
                aria-label="Увеличить"
            />
        </HStack>
    );
};