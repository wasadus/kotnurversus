import { useDrag } from 'react-dnd';

type Props = {
    id: string;
}

export const Team = ({ id }: Props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ITEM',
        item: { id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            style={{
                width: '200px',
                borderRadius: '5%',
                border: "1px solid",
                borderColor: "blackAlpha.400",
                opacity: isDragging ? 0.5 : 1,
                padding: '8px',
                margin: '4px',
                backgroundColor: 'blackAlpha.400',
                cursor: 'move',
            }}
        >
            {id}
        </div>
    );
};
