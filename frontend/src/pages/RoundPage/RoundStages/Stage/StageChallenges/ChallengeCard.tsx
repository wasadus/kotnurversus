import { Category } from "~/types/category.ts";
import { Challenge } from "~/types/challenge.ts";
import { memo } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ChallengeCard as BaseChallengeCard } from "~/components/ChallengeCard.tsx";
import { ChallengeWindow } from "~/pages/RoundPage/RoundStages/Stage/ChallengeWindow";

type ChallengeCardProps = {
    category: Category;
    challenge: Challenge;
};

export const ChallengeCard = memo(
    ({ challenge, category }: ChallengeCardProps) => {
        const window = useDisclosure();

        return (
            <>
                <BaseChallengeCard
                    w="95%"
                    maxW="160px"
                    category={category}
                    challenge={challenge}
                    onClick={window.onOpen}
                />
                <ChallengeWindow
                    {...window.getDisclosureProps()}
                    isOpen={window.isOpen}
                    onClose={window.onClose}
                    category={category}
                    challenge={challenge}
                />
            </>
        );
    },
    (prev, next) => prev.challenge.id === next.challenge.id
);