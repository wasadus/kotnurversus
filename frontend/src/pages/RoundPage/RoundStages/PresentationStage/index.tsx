import { useRoundContext } from "../../round-context";
import { PresentationEndStage } from "~/pages/RoundPage/RoundStages/PresentationStage/PresentationEndStage";
import { PresentationStartStage } from "~/pages/RoundPage/RoundStages/PresentationStage/PresentationStartStage";

export const PresentationStage = () => {
  const { getTimerEnd } = useRoundContext();
  const timerEnd = getTimerEnd();

  return timerEnd ? (
    <PresentationEndStage timerEnd={timerEnd} />
  ) : (
    <PresentationStartStage />
  );
};
