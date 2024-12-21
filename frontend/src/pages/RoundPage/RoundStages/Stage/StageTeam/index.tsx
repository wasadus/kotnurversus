import { BoxProps } from "@chakra-ui/react";
import { MouseEvent } from "react";
import { useRoundContext } from "~/pages/RoundPage/round-context.tsx";
import { TourneyTeam } from "~/types/tourney.ts";
import { BaseTeam } from "~/pages/RoundPage/RoundStages/Stage/StageTeam/BaseTeam.tsx";

type Props = {
  isChosen?: boolean;
  isDisabled?: boolean;
  activeColor?: string;
  team?: TourneyTeam;
  onChoose?: (teamId: string) => void;
  onClick?: () => void;
} & BoxProps;

export const StageTeam = ({
  isChosen,
  isDisabled,
  activeColor,
  onChoose,
  onClick,
  team,
  ...props
}: Props) => {
  const { round } = useRoundContext();

  if (!team) return null;

  const isFirstTeam = round.participants.at(0)?.teamId === team.id;

  const containerBaseProps = {
    w: "full",
    maxW: "225px",
    alignSelf: "flex-end",
    justifySelf: isFirstTeam ? "flex-end" : "flex-start",
  };
  const hoverProps = {
    borderColor: activeColor,
    _dark: { borderColor: activeColor },
  };
  const activeProps = {
    ...hoverProps,
    boxShadow: `0px 0px 10px 0px ${activeColor}`,
  };

  if (isDisabled || !activeColor) {
    return (
      <BaseTeam
        team={team}
        bodyProps={isChosen && activeColor ? activeProps : undefined}
        {...containerBaseProps}
        {...props}
      />
    );
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (onClick) return onClick(e);
    if (team.id) return onChoose?.(team.id);
  };

  return (
    <BaseTeam
      as="button"
      outline="none"
      team={team}
      _hover={{ "#team-body": hoverProps }}
      _focusVisible={{ "#team-body": hoverProps }}
      onClick={handleClick}
      bodyProps={{
        transition: ["border", "box-shadow"]
          .map((x) => `${x} 200ms ease-out`)
          .join(", "),
        ...(isChosen ? activeProps : {}),
      }}
      {...containerBaseProps}
      {...props}
    />
  );
};
