import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { ReactNode } from "react";
import { Center } from "@chakra-ui/react";

type DroppableProps = {
    id: UniqueIdentifier;
    children: ReactNode;
};

export const Droppable = ({ id, children }: DroppableProps) => {
    const { setNodeRef } = useDroppable({ id });

    return <Center w="full" h="50px" ref={setNodeRef} children={children} />;
};