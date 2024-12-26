import { useChallengesQuery } from "~/hooks/useChallengesQuery.ts";
import { Loading } from "~/components/Loading.tsx";
import { Center, Heading, Stack } from "@chakra-ui/react";
import { CategoryCard } from "~/pages/ChallengesPage/CategoryCard.tsx";
import { CreateCategoryButton } from "~/pages/ChallengesPage/CreateCategoryButton.tsx";

export const ChallengeSection = () => {
    const query = useChallengesQuery();

    if (query.isLoading) {
        return <Loading />;
    }

    if (query.isError) {
        return (
            <Center py={10}>
                <Heading fontSize="xl">Не удалось загрузить доп. требования</Heading>
            </Center>
        );
    }

    const challengesByCategoryId = query.getChallengesByCategoryId();

    return (
        <Stack spacing={12}>
            {query.categories
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((category) => (
                    <CategoryCard
                        key={category.id}
                        category={category}
                        challenges={challengesByCategoryId[category.id] || []}
                    />
                ))}
            <CreateCategoryButton />
        </Stack>
    );
};