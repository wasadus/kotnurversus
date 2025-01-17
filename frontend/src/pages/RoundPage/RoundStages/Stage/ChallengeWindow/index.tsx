import { Stack } from "@chakra-ui/react";
import { Window, WindowProps } from "~/components/Window";
import { Category } from "~/types/category";
import { Challenge } from "~/types/challenge";
import { InfoRow } from "~/pages/RoundPage/RoundStages/Stage/ChallengeWindow/InfoRow";

type Props = {
  category?: Category;
  challenge?: Challenge;
};

export const ChallengeWindow = ({
  category,
  challenge,
  ...props
}: WindowProps<Props>) => (
  <Window
    {...props}
    isHideSubmit
    isHideCancel
    contentProps={{ w: "600px" }}
    heading={challenge?.isCatInBag ? "Кот в мешке!" : "Доп. требование"}
    headerProps={
      challenge?.isCatInBag
        ? { color: "red.500", _dark: { color: "red.300" } }
        : {}
    }
  >
    <Stack pb={4} spacing={4}>
      <InfoRow
        name="Категория"
        children={category?.title || "Неизвестная категория"}
      />
      <InfoRow
        name="Название требования"
        children={challenge?.title || "Неизвестное доп. требование"}
      />
      <InfoRow
        name="Описание требования"
        children={challenge?.description || "Нет описания"}
      />
    </Stack>
  </Window>
);
