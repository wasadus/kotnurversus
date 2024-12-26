import { Center, Flex, FlexProps, Text } from "@chakra-ui/react";

type SideProps = {
    isWon?: boolean;
    isDone?: boolean;
    name?: string;
    resultText?: string | null;
} & FlexProps;

export const Side = ({ isWon, isDone, name, resultText, ...props }: SideProps) => {
    const hasName = name && name != "TBD";
    const isDisabled = !hasName || (isDone && !isWon);

    return (
        <Flex
            h="full"
            align="center"
            justify="space-between"
            bg="blackAlpha.100"
            _dark={{ bg: "whiteAlpha.100" }}
            _first={{
                borderBottom: "none",
                borderTopRadius: 4,
                ".score": { borderTopRightRadius: 4 },
            }}
            _last={{
                borderTop: "none",
                borderBottomRadius: 4,
                ".score": { borderBottomRightRadius: 4 },
            }}
            {...props}
        >
            <Text
                px={2}
                noOfLines={1}
                wordBreak="break-all"
                color={isDisabled ? "blackAlpha.500" : "text.light.main"}
                _dark={{ color: isDisabled ? "whiteAlpha.500" : "text.dark.main" }}
                fontSize={{ base: "sm", md: "md" }}
                children={hasName ? name : "Не определено"}
            />
            {isDone && (
                <Center
                    className="score"
                    minW="15%"
                    w="15%"
                    h="full"
                    color="text.light.main"
                    bg={isWon ? "#7EA973" : "#BBBBBB"}
                >
                    <Text
                        fontSize={{ base: "md", md: "lg" }}
                        noOfLines={1}
                        wordBreak="break-all"
                        children={resultText || 0}
                    />
                </Center>
            )}
        </Flex>
    );
};