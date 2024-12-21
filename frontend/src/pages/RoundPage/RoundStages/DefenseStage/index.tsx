import { useRoundContext } from "../../round-context";
import { DefenseEndStage } from "~/pages/RoundPage/RoundStages/DefenseStage/DefenseEndStage";
import { DefenseStartStage } from "~/pages/RoundPage/RoundStages/DefenseStage/DefenseStartStage";

export const DefenseStage = () => {
  const { getTimerEnd } = useRoundContext();
  const timerEnd = getTimerEnd();

  return timerEnd ? (
    <DefenseEndStage timerEnd={timerEnd} />
  ) : (
    <DefenseStartStage />
  );
};
