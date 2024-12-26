import { useDebounce } from "~/hooks/useDebounce.ts";
import { useHandleError } from "~/hooks/useHandleError.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useRef } from "react";
import { compare } from "fast-json-patch";
import { api } from "~/api";
import { queryKeys } from "~/utils/query-keys.ts";
import { AutoSizeTextarea } from "~/components/AutoSizeTextarea.tsx";
import { Props } from "~/pages/RoundPage/RoundArtifacts/RoundDescription/Props.ts";

export const EditableDescription = ({ roundId, description }: Props) => {
    const debounce = useDebounce(300);
    const handleError = useHandleError();
    const queryClient = useQueryClient();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const updateDescription = useMutation({
        mutationFn: async (newDescription: string) => {
            const operations = compare({}, { description: newDescription });
            return await api.rounds.patch(roundId, operations);
        },
        onSuccess: (round) => {
            queryClient.setQueryData(queryKeys.round(round.id), round);
        },
        onError: handleError,
    });

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.currentTarget.value.trim();
        debounce.set(() => updateDescription.mutateAsync(newDescription));
    };

    return (
        <AutoSizeTextarea
            ref={textareaRef}
            defaultValue={description}
            onChange={handleChange}
            placeholder="Введите описание для игры"
        />
    );
};