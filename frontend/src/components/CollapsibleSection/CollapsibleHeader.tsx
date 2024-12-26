import { BoxProps, Heading, HStack, IconButton } from "@chakra-ui/react";
import { useRef } from "react";
import { ArrowDownIcon } from "~/icons/ArrowDownIcon";

type CollapsibleHeaderProps = {
    label: string;
    isOpen: boolean;
    onToggle: () => void;
} & BoxProps;

export const CollapsibleHeader = ({
                               label,
                               isOpen,
                               onToggle,
                               ...props
                           }: CollapsibleHeaderProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <HStack
            w="fit-content"
            cursor="pointer"
            userSelect="none"
            transition="opacity 200ms"
            _hover={{ opacity: 0.75 }}
            onClick={() => buttonRef.current?.click()}
            {...props}
        >
            <Heading
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight="medium"
                children={label}
            />
            <IconButton
                ref={buttonRef}
                size="sm"
                variant="unstyled"
                pointerEvents="none"
                onClick={onToggle}
                icon={
                    <ArrowDownIcon
                        boxSize={{ base: 5, md: 6 }}
                        transition="transform 200ms ease-out"
                        transform={`rotate(${isOpen ? -180 : 0}deg)`}
                    />
                }
                aria-label={`${isOpen ? "Скрыть" : "Показать"} раздел`}
            />
        </HStack>
    );
};
