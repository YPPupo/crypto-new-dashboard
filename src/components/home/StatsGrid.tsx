"use client";

import React from "react";

interface StatsGridProps {
  global: GlobalData;
  fearGreed: FearGreedData;
}

interface StatCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  children?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  valueColor = "text-indigo-400",
  children,
}) => (
  <div className="bg-gray-800 p-6 rounded-xl">
    <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
    <p className={`text-2xl font-bold ${valueColor}`}>
      {value}
      {children}
    </p>
  </div>
);

export const StatsGrid: React.FC<StatsGridProps> = ({ global, fearGreed }) => {
  const fearGreedValue = Number(fearGreed?.data?.[0]?.value ?? 0);
  const isGreed = fearGreedValue > 50;
  const fearGreedText = isGreed ? "Greed" : "Fear";
  const fearGreedColor = isGreed ? "text-green-400" : "text-red-400";

  const { active_cryptocurrencies, total_market_cap, total_volume } = global;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Active Cryptocurrencies"
        value={active_cryptocurrencies}
      />
      <StatCard
        title="Fear & Greed Index"
        value={`${fearGreedValue} (${fearGreedText})`}
        valueColor={fearGreedColor}
      />
      <StatCard
        title="Market Cap"
        value={`$${total_market_cap?.usd?.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`}
      />
      <StatCard
        title="24h Volume"
        value={`$${total_volume?.usd?.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`}
      />
    </div>
  );
};
