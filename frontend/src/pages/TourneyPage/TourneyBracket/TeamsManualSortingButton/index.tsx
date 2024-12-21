import { Button, useDisclosure } from "@chakra-ui/react";
import { MoveIcon } from "~/icons/MoveIcon";
import { TourneyTeam } from "~/types/tourney";
import {
  TeamsManualSortingWindow
} from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSortingWindow";

export type TeamsManualSortingButtonProps = {
  teams: TourneyTeam[];
  onSubmit: (sortedTeams: TourneyTeam[]) => void;
};

export const TeamsManualSortingButton = ({ teams, onSubmit }: TeamsManualSortingButtonProps) => {
  const window = useDisclosure();

  return (
    <>
      <Button
        {...window.getButtonProps()}
        onClick={window.onOpen}
        leftIcon={<MoveIcon />}
        children="Сопоставить участников"
      />
      <TeamsManualSortingWindow
        {...window.getDisclosureProps()}
        teams={teams}
        isOpen={window.isOpen}
        onClose={window.onClose}
        onSubmit={onSubmit}
      />
    </>
  );
};
