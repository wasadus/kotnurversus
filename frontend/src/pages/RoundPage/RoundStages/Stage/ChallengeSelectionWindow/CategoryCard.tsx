import { Category } from "~/types/category.ts";
import { Challenge } from "~/types/challenge.ts";
import { BoxProps, Button, HStack, Text, Wrap } from "@chakra-ui/react";

type CategoryCardProps = {
    category: Category;
    challenges: Challenge[];
    chosenChallengeId?: string;
    onChoose: (challenge: Challenge) => void;
    disabledChallengeIds: Set<string>;
    isDisabled?: boolean;
} & BoxProps;

export const CategoryCard = ({
                          category,
                          challenges = [],
                          chosenChallengeId,
                          onChoose,
                          disabledChallengeIds,
                          isDisabled,
                          ...props
                      }: CategoryCardProps) => (
    <HStack
        px={4}
        py={2}
        spacing={8}
        bg={isDisabled ? "blackAlpha.200" : undefined}
        _dark={{ bg: isDisabled ? "whiteAlpha.200" : undefined }}
        border="2px solid"
        borderColor={category.color}
        borderRadius={8}
        {...props}
    >
        <Text
            flex={1}
            fontSize="md"
            opacity={isDisabled ? 0.75 : 1}
            fontWeight="medium"
            children={category.title}
        />
        <Wrap w="208px" spacing={3} justify="flex-end">
            {challenges.map((challenge, i) => {
                const isChosen = chosenChallengeId === challenge.id;
                const isDisabled = disabledChallengeIds.has(challenge.id);
                return (
                    <Button
                        key={challenge.id}
                        gridArea={i}
                        size="xs"
                        fontSize="xl"
                        boxSize={8}
                        isDisabled={isDisabled}
                        onClick={() => onChoose(challenge)}
                        children={i + 1}
                        opacity={1}
                        variant={isChosen || isDisabled ? "solid" : "outline"}
                        colorScheme={isChosen ? "blue" : "gray"}
                    />
                );
            })}
        </Wrap>
    </HStack>
);