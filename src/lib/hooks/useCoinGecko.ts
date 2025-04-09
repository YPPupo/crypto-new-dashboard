import { CoinGeckoService } from "@/services/coingecko.service";
import { useQuery } from "@tanstack/react-query";

const coinGeckoService = new CoinGeckoService();

export function useGlobalData() {
  return useQuery<GlobalData>({
    queryKey: ["globalData"],
    queryFn: () => coinGeckoService.getGlobalData(),
    staleTime: 60 * 1000,
  });
}

export function useMarketData(
  itemsPerPage: number = 10,
  pageNumber: number = 1
) {
  return useQuery<MarketData[]>({
    queryKey: ["marketData", itemsPerPage, pageNumber],
    queryFn: () => coinGeckoService.getMarketData({ itemsPerPage, pageNumber }),
    staleTime: 60 * 1000,
  });
}

export function useRelativePerformance(coins: string[], days: number) {
  return useQuery<HistoricalData[]>({
    queryKey: ["relativePerformance", coins, days],
    queryFn: () => coinGeckoService.getRelativePerformance(coins, days),
    staleTime: 60 * 1000,
  });
}
