import { TourneyTeam } from "~/types/tourney";
import { useDraggable } from "@dnd-kit/core";
import { Draggable } from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/Draggable";

export type DraggableItemProps = {
    team?: TourneyTeam;
};

export const DraggableItem = ({ team }: DraggableItemProps) => {
    const { isDragging, setNodeRef, listeners } = useDraggable({
        id: team?.id || "unknown",
    });

    if (!team) return null;

    return (
        <Draggable
            team={team}
            ref={setNodeRef}
            listeners={listeners}
            opacity={isDragging ? 0.25 : undefined}
        />
    );
};