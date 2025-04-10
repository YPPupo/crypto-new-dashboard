import { CoinGeckoService } from "@/services/coingecko.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const coinGeckoService = new CoinGeckoService();
const PER_PAGE = 20;

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

export function useCoinGeckoNews() {
  return useInfiniteQuery<NewsApiResponse>({
    queryKey: ["news"],
    queryFn: ({ pageParam = 1 }) =>
      coinGeckoService.getCoinGeckoNews(pageParam as number),
    getNextPageParam: (lastPage, allPages) => {
      const itemsPerPage = PER_PAGE;
      const currentPage = allPages.length;
      const itemsInCurrentPage = lastPage.data.length;

      if (itemsInCurrentPage < itemsPerPage) {
        return undefined; // No more pages to fetch
      }
      return currentPage + 1;
    },
    initialPageParam: 1,
    staleTime: 60 * 1000,
  });
}
