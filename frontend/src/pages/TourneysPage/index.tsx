import {
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { TourneysSection } from "~/pages/TourneysPage/TourneysSection.tsx";
import { CreateTourneyButton } from "~/pages/TourneysPage/CreateTourneyButton.tsx";

export const TourneysPage = () => (
  <Stack
    mx="auto"
    px={2}
    w="full"
    maxW="wrapper"
    flex={1}
    spacing={{ base: 6, md: 10 }}
  >
    <HStack justify={{ base: "center", md: "space-between" }}>
      <Heading
        fontSize={{ base: "lg", md: "2xl", lg: "4xl" }}
        textAlign={{ base: "center", md: "left" }}
        children="Турниры по архитектуре приложений"
      />
      <CreateTourneyButton />
    </HStack>
    <TourneysSection />
  </Stack>
);
