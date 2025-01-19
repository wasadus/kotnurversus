import { useDrop } from 'react-dnd';
import {ReactNode} from "react";

type Props = {
    id: string;
    children?: ReactNode;
    onDrop: (itemId: string, toZoneId: string) => void;
}

export const Group = ({ id, children, onDrop }: Props) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ITEM',
        drop: (item: { id: string }) => onDrop(item.id, id),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            style={{
                maxWidth: '250px',
                height: '250px',
                margin: '10px',
                backgroundColor: isOver ? 'lightgreen' : 'transparent',
                borderRadius: '10%',
                border: "1px solid",
                borderColor: "blackAlpha.400",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '5px',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    );
};