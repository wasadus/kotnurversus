import {
  Box,
  Flex,
  Skeleton,
  useColorMode,
} from "@chakra-ui/react";
import { MatchComponentProps } from "@g-loot/react-tournament-brackets/dist/src/types";
import { Link } from "react-router-dom";
import { paths } from "~/pages/paths";
import { TourneyRoundState } from "~/types/tourney";
import { Side } from "~/pages/TourneyPage/TourneyBracket/Match/Side";
import { Badge } from "~/pages/TourneyPage/TourneyBracket/Match/Badge";
import { SpecificationLabel } from "~/pages/TourneyPage/TourneyBracket/Match/SpecificationLabel";

export const Match = ({
  match,
  topWon,
  topParty,
  bottomParty,
  bottomWon,
}: MatchComponentProps) => {
  const { colorMode } = useColorMode();

  const isLoaded = "isLoading" in match ? !match.isLoading : true;

  const isInit = match.state === TourneyRoundState.Init;
  const isDone = match.state === TourneyRoundState.Complete;
  const borderColor =
    colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300";
  const hoverBorderColor =
    colorMode === "light" ? "blackAlpha.500" : "whiteAlpha.500";

  const linkProps = !isInit
    ? {
        as: Link,
        to: paths.round.path(match.id),
        cursor: "pointer",
        transition: "border 200ms ease-out",
        _hover: { borderColor: hoverBorderColor },
      }
    : {};

  return (
    <Box pl={3} h="full">
      <Box h={6}>
        {isLoaded && "specification" in match && (
          <SpecificationLabel value={match.specification?.title} />
        )}
      </Box>
      <Skeleton
        h="calc(100% - 48px)"
        borderRadius={4}
        isLoaded={isLoaded}
        startColor={colorMode === "light" ? "blackAlpha.100" : "whiteAlpha.100"}
        endColor={colorMode === "light" ? "blackAlpha.300" : "whiteAlpha.300"}
      >
        <Flex
          h="full"
          border="1px solid"
          borderColor={borderColor}
          flexDir="column"
          justify="space-between"
          borderRadius={4}
          {...linkProps}
        >
          <Side
            isDone={isDone}
            isWon={topWon}
            name={topParty.name}
            resultText={topParty.resultText}
          />
          <Box border="1px solid" borderColor={borderColor} />
          <Side
            isDone={isDone}
            isWon={bottomWon}
            name={bottomParty.name}
            resultText={bottomParty.resultText}
          />
        </Flex>
      </Skeleton>
      <Box h={6}>
        {isLoaded && "badgeValue" in match && (
          <Badge value={match.badgeValue} />
        )}
      </Box>
    </Box>
  );
};
