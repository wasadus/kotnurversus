import { TourneySpecificationWithId } from "~/types/tourney";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {
    SpecificationsListBaseItem
} from "~/pages/TourneyPage/TourneySpecificationsSettings/SpecificationsList/SpecificationsListBaseItem";

type SpecificationsListItemProps = {
    specification: TourneySpecificationWithId;
    onUpdate: (specifications: TourneySpecificationWithId) => void;
    onDuplicate: (id: string) => void;
    onRemove: (id: UniqueIdentifier) => void;
};

export const SpecificationsListItem = ({
                                    specification,
                                    onUpdate,
                                    onDuplicate,
                                    onRemove,
                                }: SpecificationsListItemProps) => {
    const {
        isDragging,
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
    } = useSortable({ id: specification.id });

    return (
        <SpecificationsListBaseItem
            ref={setNodeRef}
            handleRef={setActivatorNodeRef}
            isDragging={isDragging}
            specification={specification}
            onUpdate={onUpdate}
            onDuplicate={() => onDuplicate(specification.id)}
            onRemove={() => onRemove(specification.id)}
            transform={transform}
            transition={transition}
            listeners={listeners}
            {...attributes}
        />
    );
};