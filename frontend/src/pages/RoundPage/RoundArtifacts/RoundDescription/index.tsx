import { useMemo } from "react";
import { useRoundContext } from "../../round-context.tsx";
import { ReadonlyDescription } from "~/pages/RoundPage/RoundArtifacts/RoundDescription/ReadonlyDescription";
import { EditableDescription } from "~/pages/RoundPage/RoundArtifacts/RoundDescription/EditableDescription";

export const RoundDescription = () => {
  const { isOrganizer, round } = useRoundContext();

  const component = useMemo(() => {
    const Description = isOrganizer ? EditableDescription : ReadonlyDescription;

    return <Description roundId={round.id} description={round.description} />;
  }, [isOrganizer, round.id, round.description]);

  return component;
};
