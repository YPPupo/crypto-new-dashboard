"use client";

import { useGlobalData, useMarketData } from "@/lib/hooks/useCoinGecko";
import { useFearGreed } from "@/lib/hooks/useAlternative";
import Skeleton from "react-loading-skeleton";
import { CryptoTable } from "@/components/home/CryptoTable";
import { StatsGrid } from "@/components/home/StatsGrid";
import { MarketPerformanceChart } from "@/components/home/PerformanceChart";

export default function Home() {
  const {
    data: globalData,
    isLoading: isGlobalLoading,
    isError: isGlobalError,
  } = useGlobalData();

  const {
    data: marketData,
    isLoading: isMarketLoading,
    isError: isMarketError,
  } = useMarketData();

  const {
    data: fearGreedData,
    isLoading: isFearGreedLoading,
    isError: isFearGreedError,
  } = useFearGreed();

  const isLoading = [isGlobalLoading, isMarketLoading, isFearGreedLoading].some(
    Boolean
  );
  const isError = [isGlobalError, isMarketError, isFearGreedError].some(
    Boolean
  );
  const isDataMissing = !globalData || !marketData || !fearGreedData;

  if (isLoading) return <LoadingScreen />;

  if (isError || isDataMissing) return <ErrorScreen />;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">📊 Crypto Dashboard</h1>

        <StatsGrid global={globalData} fearGreed={fearGreedData} />
        <MarketPerformanceChart />
        <CryptoTable coins={marketData} />
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <Skeleton height={40} className="mb-8 bg-gray-800" count={4} />
        <Skeleton height={320} className="mb-8 bg-gray-800" />
        <Skeleton height={320} className="bg-gray-800" />
      </div>
    </div>
  );
}

function ErrorScreen() {
  return (
    <div className="min-h-[70vh] w-full flex bg-gray-900 text-red-400 p-8 place-content-center place-items-center">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl">⚠️ Error fetching data</h2>
        <p className="mt-4">Please try refreshing the page</p>
      </div>
    </div>
  );
}
