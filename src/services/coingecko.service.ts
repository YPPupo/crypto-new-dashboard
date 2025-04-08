import { axiosCoingecko } from "@/lib/axiosCoingecko.ts";

export class CoinGeckoService {
  async getGlobalData() {
    const response = await axiosCoingecko.get<{ data: GlobalData }>("global");
    return response.data.data;
  }

  async getMarketData(params: { itemsPerPage: number; pageNumber: number }) {
    const { itemsPerPage, pageNumber } = params;

    const defaultParams = {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: itemsPerPage,
      page: pageNumber,
      sparkline: true,
    };

    const response = await axiosCoingecko.get<MarketData[]>("coins/markets", {
      params: defaultParams,
    });
    return response.data;
  }

  async getRelativePerformance(
    coins: string[],
    days: number
  ): Promise<HistoricalData[]> {
    const promises = coins.map((coin) => {
      return axiosCoingecko.get<HistoricalData>(`coins/${coin}/market_chart`, {
        params: {
          vs_currency: "usd",
          days,
        },
      });
    });

    const responses = await Promise.all(promises);
    return responses.map((response) => response.data);
  }
}
