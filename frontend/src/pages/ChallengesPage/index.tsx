import { Heading, Stack } from "@chakra-ui/react";
import { Loading } from "~/components/Loading";
import { useAutoRedirect } from "~/hooks/useAutoRedirect";
import { paths } from "~/pages/paths";
import { useAuthContext } from "~/utils/auth-context";
import { ChallengeSection } from "~/pages/ChallengesPage/ChallengeSection.tsx";

export const ChallengesPage = () => {
  const { isAuthenticated } = useAuthContext();

  useAutoRedirect({ isEnabled: !isAuthenticated, path: paths.main.path });

  if (!isAuthenticated) {
    return <Loading flex={1} />;
  }

  return (
    <Stack
      px={2}
      py={7}
      mx="auto"
      w="full"
      maxW="wrapper"
      flex={1}
      spacing={10}
    >
      <Heading textAlign="center">Дополнительные требования</Heading>
      <ChallengeSection />
    </Stack>
  );
};
