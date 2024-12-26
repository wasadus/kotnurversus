import { TourneyTeam } from "~/types/tourney";
import { DraggableSyntheticListeners } from "@dnd-kit/core";
import { Transform } from "@dnd-kit/utilities";
import { Button, ButtonProps, Text } from "@chakra-ui/react";
import React, { forwardRef } from "react";

type DraggableProps = {
    team: TourneyTeam;
    isOverlay?: boolean;
    listeners?: DraggableSyntheticListeners;
    transform?: Transform | null;
} & ButtonProps;

export const Draggable = forwardRef<HTMLButtonElement, DraggableProps>(
    ({ team, isOverlay, listeners, transform, ...props }, ref) => {
        const styles = {
            "--translate-x": `${transform?.x || 0}px`,
            "--translate-y": `${transform?.y || 0}px`,
        } as React.CSSProperties;

        const overlayStyles = {
            cursor: "grabbing",
            _dark: { bg: "#464646" },
        };

        return (
            <Button
                {...props}
                {...listeners}
                ref={ref}
                w="full"
                transition="none"
                transform="translate3d(var(--translate-x, 0), var(--translate-y, 0), 0)"
                style={styles}
                {...(isOverlay ? overlayStyles : {})}
            >
                <Text noOfLines={1} wordBreak="break-all" children={team.title} />
            </Button>
        );
    }
);