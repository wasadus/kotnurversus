import { DragOverlay, DropAnimation, useDndContext } from "@dnd-kit/core";
import { Portal } from "@chakra-ui/react";
import { CSS } from "@dnd-kit/utilities";
import { Draggable } from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/Draggable";
import {
    DraggableItemProps
} from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/TeamsManualSorting/DraggableItem";

export const DraggableOverlay = ({ team }: DraggableItemProps) => {
    const { active } = useDndContext();

    return (
        <Portal appendToParentPortal>
            <DragOverlay zIndex={1500} dropAnimation={dropAnimationConfig}>
                {active && team ? <Draggable isOverlay team={team} /> : null}
            </DragOverlay>
        </Portal>
    );
};

const dropAnimationConfig: DropAnimation = {
    keyframes: ({ transform }) => [
        { transform: CSS.Transform.toString(transform.initial) },
        {
            transform: CSS.Transform.toString({
                ...transform.final,
                scaleX: 0.95,
                scaleY: 0.95,
            }),
        },
    ],
};