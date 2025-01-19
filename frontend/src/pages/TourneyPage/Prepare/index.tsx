import {DndProvider} from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import {Team} from "~/pages/TourneyPage/Prepare/Team.tsx";
import {Group} from "~/pages/TourneyPage/Prepare/Group.tsx";
import {useEffect, useState} from "react";
import {useTourneyContext} from "~/pages/TourneyPage/tourney-context.tsx";

interface Team {
    id: string;
    groupId: string;
}

export const Prepare = () => {
    const { teams, useSubscribe } = useTourneyContext();

    useSubscribe("teams");

    const groups = ['group1', 'group2', 'group3', 'group4'];
    const [groupsTeams, setGroupsTeams] = useState<Team[]>(() => initGroupTeams());

    useEffect(() => {
        setGroupsTeams((prevItems) => {
            const newItems = teams.get
                .filter((team) => !prevItems.some((item) => item.id === team.title))
                .map((team) => ({ id: team.title, groupId: `group${ Math.ceil(teams.get.length / 4)}` } as Team));

            const updatedItems = prevItems.filter((item) =>
                teams.get.some((team) => team.title === item.id)
            );

            return [...updatedItems, ...newItems];
        });
    }, [teams.get]);

    const moveTeam = (teamId: string, toGroupId: string) => {
        setGroupsTeams((prevTeams) =>
            prevTeams.map((team) =>
                team.id === teamId ? { ...team, groupId: toGroupId } : team
            )
        );
    };

    function initGroupTeams() {
        const groupsTeams: Team[] = [];
        let groupNumber = 1;
        let counter = 1;
        for (let i = 0; i < teams.get.length; i++) {
            if (counter > 4) {
                counter = 1;
                groupNumber++;
            }
            groupsTeams.push({ id: teams.get.at(i)?.title || '', groupId: `group${groupNumber}` })
            counter++;
        }
        return groupsTeams;
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '10px',
                }}>
                {groups.map((zoneId) => (
                    <Group key={zoneId} id={zoneId} onDrop={moveTeam}>
                        {groupsTeams
                            .filter((item) => item.groupId === zoneId)
                            .map((item) => (
                                <Team key={item.id} id={item.id} />
                            ))}
                    </Group>
                ))}
            </div>
        </DndProvider>
    )
}
