import {
  Center,
  Grid,
} from "@chakra-ui/react";
import {
  DndContext,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  Fragment,
  useEffect,
  useState,
} from "react";
import { TourneyTeam } from "~/types/tourney";
import { isDefined } from "~/utils";
import {Droppable} from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/Droppable";
import {
  DraggableItem
} from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/DraggableItem";
import {
  DraggableOverlay
} from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/DraggableOverlay";

type Props = {
  teams: TourneyTeam[];
  onChange?: (sortedTeams: TourneyTeam[]) => void;
};

export const TeamsManualSorting = ({ teams, onChange }: Props) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [sortedTeamIds, setSortedTeamIds] = useState<UniqueIdentifier[]>(
    teams.map((t) => t.id)
  );

  useEffect(() => {
    const teamsMap = new Map(teams.map((t) => [t.id, t]));
    const sortedTeams = sortedTeamIds
      .map((id) => teamsMap.get(`${id}`))
      .filter(isDefined);
    onChange?.(sortedTeams);
  }, [sortedTeamIds]);

  return (
    <DndContext
      onDragStart={({ active }) => setActiveId(active.id)}
      onDragCancel={() => setActiveId(null)}
      onDragEnd={({ over, active }) => {
        if (over !== null) {
          const index = over.id as number;
          const teamId = active.id;
          const updated = [...sortedTeamIds];
          const prevIndex = sortedTeamIds.findIndex((id) => id === teamId);
          if (prevIndex !== -1) {
            updated[prevIndex] = sortedTeamIds[index];
          }
          updated[index] = teamId;
          setSortedTeamIds(updated);
        }
        setActiveId(null);
      }}
    >
      <Grid gridTemplateColumns="225px 50px 225px" gridGap={4}>
        {sortedTeamIds.map((teamId, index) => {
          const team = teams.find((team) => team.id === teamId);

          return (
            <Fragment key={index}>
              <Droppable id={index}>
                <DraggableItem team={team} />
              </Droppable>
              {index % 2 === 0 ? (
                <Center fontSize="xl" fontWeight="bold" children="VS" />
              ) : null}
            </Fragment>
          );
        })}
      </Grid>
      <DraggableOverlay
        team={activeId ? teams.find((t) => t.id === activeId) : undefined}
      />
    </DndContext>
  );
};
