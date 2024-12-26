import { useBreakpointValue } from "@chakra-ui/react";
import { addSeconds } from "date-fns";
import { useContext } from "react";
import { RoundState } from "~/types/round";
import { useAuthContext } from "~/utils/auth-context";
import { Context } from "~/pages/RoundPage/Context";

export const useRoundContext = () => {
  const { isAuthenticated } = useAuthContext();
  const { tourney, round } = useContext(Context);
  const isDesktop = useBreakpointValue(
    { base: false, sm: true },
    { ssr: false }
  );

  const state = round.currentState?.state;
  const isPublic = state !== undefined;
  const currentTeamId = round.currentState?.value?.teamId;

  const getTeams = () =>
    round.participants
      .map((p) => tourney.teams.find((team) => p.teamId === team.id))
      .slice(0, 2);

  const getCurrentTeam = () =>
    tourney.teams.find((t) => t.id === currentTeamId);

  const getTimerEnd = () => {
    const startTime = round.currentState?.value?.start;
    if (!startTime) return undefined;
    switch (state) {
      case RoundState.Prepare:
        return addSeconds(startTime, round.settings.prepareSeconds);
      case RoundState.Presentation:
        return addSeconds(startTime, round.settings.presentationSeconds);
      case RoundState.Defense:
        return addSeconds(startTime, round.settings.defenseSeconds);
      case RoundState.Pause:
        return addSeconds(startTime, round.settings.timeoutSeconds);
      default:
        return undefined;
    }
  };

  const isStateFirstTime = (state: RoundState): boolean =>
    round.history.filter((s) => s.state === state).length < 2;

  return {
    isPublic,
    isOrganizer: isDesktop && isAuthenticated,
    tourney,
    round,
    state,
    currentTeamId,
    getTeams,
    getTimerEnd,
    getCurrentTeam,
    isStateFirstTime,
  };
};
