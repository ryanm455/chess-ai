import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatsState {
  wins: number;
  draws: number;
  losses: number;
  incrementWins: () => void;
  incrementDraws: () => void;
  incrementLosses: () => void;
  resetStats: () => void;
}

export const useStatsStore = create<StatsState>()(
  persist(
    (set) => ({
      wins: 0,
      draws: 0,
      losses: 0,
      incrementWins: () => set((state) => ({ wins: state.wins + 1 })),
      incrementDraws: () => set((state) => ({ draws: state.draws + 1 })),
      incrementLosses: () => set((state) => ({ losses: state.losses + 1 })),
      resetStats: () => set({ wins: 0, draws: 0, losses: 0 }),
    }),
    {
      name: "stats-storage",
    }
  )
);
