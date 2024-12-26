import { Box, Wrap } from "@chakra-ui/react";
import { Category } from "~/types/category";
import { Challenge } from "~/types/challenge";
import { CategoryButton } from "./CategoryButton";
import { CreateChallengeButton } from "./CreateChallengeButton";
import { ChallengeCard } from "~/pages/ChallengesPage/ChallengeCard.tsx";

type Props = {
  category: Category;
  challenges: Challenge[];
};

export const CategoryCard = ({ category, challenges }: Props) => (
  <Box>
    <CategoryButton category={category} />
    <Wrap mt={6} spacing={8} align="flex-start">
      {challenges
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            category={category}
            challenge={challenge}
          />
        ))}
      <CreateChallengeButton defaultCategoryId={category.id} />
    </Wrap>
  </Box>
);
