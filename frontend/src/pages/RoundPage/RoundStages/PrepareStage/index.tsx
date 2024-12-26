import { useRoundContext } from "../../round-context";
import { PrepareStartStage } from "~/pages/RoundPage/RoundStages/PrepareStage/PrepareStartStage";
import { PrepareEndStage } from "~/pages/RoundPage/RoundStages/PrepareStage/PrepareEndStage";

export const PrepareStage = () => {
  const { getTimerEnd } = useRoundContext();
  const timerEnd = getTimerEnd();

  return timerEnd ? (
    <PrepareEndStage timerEnd={timerEnd} />
  ) : (
    <PrepareStartStage />
  );
};
