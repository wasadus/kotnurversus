import { Window, WindowProps } from "~/components/Window";
import { useRef } from "react";
import { TourneyTeam } from "~/types/tourney";
import { TeamsManualSorting } from "./TeamsManualSorting";
import { TeamsManualSortingButtonProps } from "~/pages/TourneyPage/TourneyBracket/TeamsManualSortingButton/index";

export const TeamsManualSortingWindow = ({
                                      teams,
                                      onSubmit,
                                      ...props
                                  }: WindowProps<TeamsManualSortingButtonProps>) => {
    const sortedTeams = useRef(teams);

    const handleChange = (teams: TourneyTeam[]) => {
        sortedTeams.current = teams;
    };

    const handleSubmit = async () => {
        onSubmit(sortedTeams.current.map((t, i) => ({ ...t, order: i })));
        props.onClose();
    };

    return (
        <Window
            heading="Сопоставление участников"
            submitProps={{ onClick: handleSubmit }}
            {...props}
        >
            <TeamsManualSorting teams={teams} onChange={handleChange} />
        </Window>
    );
};