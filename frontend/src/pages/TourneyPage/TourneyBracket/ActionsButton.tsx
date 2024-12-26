import { TourneyTeam } from "~/types/tourney";
import { HStack } from "@chakra-ui/react";
import { TeamsShuffleButton } from "~/pages/TourneyPage/TourneyBracket/TeamsShuffleButton";
import { TeamsManualSortingButton } from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton";

type ActionsButtonProps = {
    teams: TourneyTeam[];
    onTeamsChange: (teams: TourneyTeam[]) => void;
};

export const ActionsButton = ({ teams, onTeamsChange }: ActionsButtonProps) => (
    <HStack>
        <TeamsShuffleButton teams={teams} onTeamsChange={onTeamsChange} />
        <TeamsManualSortingButton teams={teams} onSubmit={onTeamsChange} />
    </HStack>
);