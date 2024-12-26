import { BoxProps, Center, Text } from "@chakra-ui/react";
import { useTimer } from "~/hooks/useTimer";
import { useRoundContext } from "~/pages/RoundPage/round-context";
import { ResetTimerButton } from "~/pages/RoundPage/RoundStages/Stage/StageTimer/ResetTimerButton";

type Props = {
  endDate: Date;
  activeColor: string;
} & BoxProps;

export const StageTimer = ({ endDate, activeColor, ...props }: Props) => {
  const { isOrganizer } = useRoundContext();
  const { isRunning, totalSeconds } = useTimer({
    autoStart: true,
    autoStop: false,
    expiryTimestamp: endDate,
  });

  const isNegative = totalSeconds < 0;
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.trunc(totalSeconds / 60);

  const activeProps = {
    borderColor: activeColor,
    boxShadow: `0px 0px 20px 0px ${activeColor}`,
  };

  return (
    <Center
      py={2}
      w="200px"
      borderRadius={8}
      border="1px solid transparent"
      fontSize="5xl"
      flexDir="column"
      {...(isRunning ? activeProps : {})}
      {...props}
    >
      {isOrganizer && <ResetTimerButton />}
      {Math.abs(totalMinutes) < 1000 ? (
        <Text
          ml={isNegative ? -4 : 0}
          color={isNegative ? "secondary" : "inherit"}
          userSelect="none"
          pointerEvents="none"
        >
          {isNegative && <Text as="span" children="-" />}
          {Math.abs(totalMinutes).toString().padStart(2, "0")}:
          {Math.abs(seconds).toString().padStart(2, "0")}
        </Text>
      ) : (
        <Text children="∞" />
      )}
    </Center>
  );
};
