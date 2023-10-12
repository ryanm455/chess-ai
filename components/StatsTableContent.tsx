"use client";

import { useStatsStore } from "hooks/stats";

const StatsTableContent = () => {
  const gameStats = useStatsStore(({ wins, draws, losses }) => ({
    wins,
    draws,
    losses,
  }));

  return Object.entries(gameStats).map((e) => (
    <tr key={e[0]}>
      <td>{e[0].charAt(0).toUpperCase() + e[0].slice(1)}</td>
      <td>{e[1]}</td>
    </tr>
  ));
};

export default StatsTableContent;
