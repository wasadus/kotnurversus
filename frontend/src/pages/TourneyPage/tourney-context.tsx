import { createContext, useContext } from "react";
import { ValueRef } from "~/hooks/useValue";
import { TourneyTeam } from "~/types/tourney";

export type SubscribeKey = "teams";

type TourneyContext = {
  isDesktop: boolean;
  isEditable: boolean;
  useSubscribe: (key: SubscribeKey) => void;
  teams: ValueRef<TourneyTeam[]>;
};

export const Context = createContext<TourneyContext>({
  isDesktop: true,
  isEditable: false,
  useSubscribe: () => {},
  teams: { get: [], set: () => {} },
});

export const useTourneyContext = (): TourneyContext => useContext(Context);
