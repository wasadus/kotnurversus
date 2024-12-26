import {
  Box,
  BoxProps,
  HStack,
  Spacer
} from "@chakra-ui/react";
import { ColorModeButton } from "~/components/ColorModeButton";
import { paths } from "~/pages/paths";
import { AuthButton } from "./AuthButton";
import {Logo} from "~/components/PageLayout/Logo";
import {ChallengesLink} from "~/components/PageLayout/ChallengesLink";
import {Link} from "~/components/PageLayout/Link";

export const Header = (props: BoxProps) => (
  <Box
    {...props}
    minH={{ base: "55px", md: "80px" }}
    bg="bg.light.1"
    borderBottom="1px solid transparent"
    borderColor="bg.light.2"
    _dark={{ bg: "bg.dark.1", borderColor: "bg.dark.2" }}
  >
    <HStack
      mx="auto"
      px={{ base: 4, md: 6 }}
      maxW="wrapper"
      h="full"
      spacing={{ base: 4, lg: 8 }}
    >
      <Logo />
      <ColorModeButton />
      <Spacer />
      <ChallengesLink />
      <Link href={paths.tourneys.path}>Турниры</Link>
      <AuthButton />
    </HStack>
  </Box>
);
