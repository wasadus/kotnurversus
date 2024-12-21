import { TourneyTeam } from "~/types/tourney.ts";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListItem } from "@chakra-ui/react";
import { BaseTeamCardProps } from "~/components/TeamCard/BaseTeamCard.tsx";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { TeamCardLayout } from "~/components/TeamCard/TeamCardLayout.tsx";
import { TeamCardTitle } from "~/components/TeamCard/TeamCardTitle.tsx";
import { Input } from "~/components/TeamCard/Input.tsx";
import { TeamCardMates } from "~/components/TeamCard/TeamCardMates.tsx";
import { RemoveMateButton } from "~/components/TeamCard/RemoveMateButton.tsx";
import { AddMateButton } from "~/components/TeamCard/AddMateButton.tsx";
import { RemoveButton } from "~/components/TeamCard/RemoveButton.tsx";

type EditableTeamCardProps = {
    onChange?: (team: TourneyTeam) => void;
    onRemove?: (teamId: string) => void;
} & Omit<BaseTeamCardProps, "onChange">;

export const EditableTeamCard = ({
                              team,
                              onChange,
                              onRemove,
                              ...props
                          }: EditableTeamCardProps) => {
    const { register, getValues, control, handleSubmit } = useForm<TeamSchema>({
        shouldFocusError: false,
        resolver: zodResolver(teamSchema),
        defaultValues: castToTeamSchema(team),
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "mates",
    });

    const handleChange = (data: TeamSchema) => {
        onChange?.(castToTeam(data, team));
    };

    const handleRemove = () => {
        team?.id && onRemove?.(team.id);
    };

    const handleRemoveMate = (mateIndex: number) => {
        remove(mateIndex);
    };

    const handleAddMate = () => {
        remove(
            getValues("mates").flatMap(({ name }, i) => (name.trim() ? [] : [i]))
        );
        append({ name: "" });
    };

    return (
        <TeamCardLayout
            as="form"
            pos="relative"
            onChange={handleSubmit(handleChange)}
            {...props}
        >
            <TeamCardTitle>
                <Input
                    h="42px"
                    size="lg"
                    maxLength={20}
                    placeholder="Название команды"
                    {...register("title")}
                />
            </TeamCardTitle>
            <TeamCardMates>
                {fields.map((field, i) => (
                    <ListItem ml={4} key={field.id}>
                        <div className="flex">
                            <Input
                                h="24px"
                                w="175px"
                                size="md"
                                placeholder="Участник"
                                {...register(`mates.${i}.name`)}
                            />
                            {getValues("mates").length > 1 && <RemoveMateButton onRemove={() => handleRemoveMate(i)} />}
                        </div>
                    </ListItem>
                ))}
            </TeamCardMates>
            {getValues("mates").length < 4 && (
                <AddMateButton onClick={handleAddMate} />
            )}
            {team?.id && onRemove && <RemoveButton onRemove={handleRemove} />}
        </TeamCardLayout>
    );
};

const teamSchema = z.object({
    title: z.string().min(1),
    mates: z.object({ name: z.string() }).array(),
});

type TeamSchema = z.infer<typeof teamSchema>;

const castToTeamSchema = (
    team?: Partial<TourneyTeam>
): Partial<TeamSchema> => ({
    title: team?.title,
    mates: team?.mates?.length
        ? team?.mates?.map((name) => ({ name }))
        : [{ name: "" }],
});

const castToTeam = (
    data: TeamSchema,
    team?: Partial<TourneyTeam>
): TourneyTeam => ({
    id: team?.id || uuid(),
    title: data.title,
    mates: data.mates.flatMap((p) => (p.name.trim() ? [p.name.trim()] : [])),
    order: team?.order || 0,
});