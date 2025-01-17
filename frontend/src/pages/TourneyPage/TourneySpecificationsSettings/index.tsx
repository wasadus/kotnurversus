import { useMutation, useQueryClient } from "@tanstack/react-query";
import { compare } from "fast-json-patch";
import { memo, useState } from "react";
import { v4 as uuid } from "uuid";
import { api } from "~/api";
import { CollapsibleSection } from "~/components/CollapsibleSection";
import { useDebounce } from "~/hooks/useDebounce";
import {
  TourneySpecification,
  TourneySpecificationWithId,
} from "~/types/tourney";
import { queryKeys } from "~/utils/query-keys";
import { useTourneyContext } from "../tourney-context";
import { SpecificationsList } from "./SpecificationsList";
import {
    CreateSpecificationButton
} from "~/pages/TourneyPage/TourneySpecificationsSettings/CreateSpecificationButton";

type Props = {
  id: string;
  specifications: TourneySpecification[];
};

export const TourneySpecificationsSettings = memo(
  ({id, specifications: defaultSpecifications }: Props) => {
    const debounce = useDebounce(500);
    const queryClient = useQueryClient();
    const { isEditable } = useTourneyContext();
    const [specifications, setSpecifications] = useState(() =>
      defaultSpecifications.map<TourneySpecificationWithId>((specification) => ({
        ...specification,
        id: uuid(),
      }))
    );

    const editSpecifications = useMutation({
      mutationFn: async (specifications: TourneySpecificationWithId[]) => {
        const operations = compare({}, { specifications });
        return await api.tourneys.patch(id, operations);
      },
      onSuccess: async (tourney) => {
        queryClient.setQueryData(queryKeys.tourney(tourney.id), tourney);
      },
    });

    if (!isEditable) return null;

    const handleUpdate = (
      callback: (
        oldSpecifications: TourneySpecificationWithId[]
      ) => TourneySpecificationWithId[]
    ) => {
      setSpecifications((specifications) => {
        const updated = callback(specifications);
        debounce.set(() => editSpecifications.mutateAsync(updated));
        return updated;
      });
    };

    const handleCreate = (specification: TourneySpecificationWithId) => {
      handleUpdate((specifications) => [...specifications, specification]);
    };

    return (
      <CollapsibleSection
        label="Темы бизнес-сценариев"
        storageKey={`tourney:${id}:specifications-visibility`}
        headerProps={{ px: { base: 2, md: 0 } }}
      >
        {specifications.length > 0 && (
          <SpecificationsList
            mt={6}
            specifications={specifications}
            onUpdate={handleUpdate}
          />
        )}
        <CreateSpecificationButton ml={20} mt={6} onCreate={handleCreate} />
      </CollapsibleSection>
    );
  },
  () => true
);
