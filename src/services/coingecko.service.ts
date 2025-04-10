import { axiosCoingecko } from "@/lib/axiosCoingecko.ts";

const NEWS_API_URL = "https://api.coingecko.com/api/v3/news";
const PER_PAGE = 20;

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

  async getCoinGeckoNews(pageParam: number): Promise<NewsApiResponse> {
    console.log("Fetching news for page:", pageParam);
    const response = await axiosCoingecko.get<RawNewsApiResponse>(
      NEWS_API_URL,
      {
        params: {
          page: pageParam,
          per_page: PER_PAGE,
        },
        // timeout: 10000,
      }
    );

    const articles: NewsArticle[] = response.data.data.map((item, index) => ({
      id: `${pageParam}-${index}-${item.url}`,
      title: item.title,
      url: item.url,
      description: item.description,
      thumb_2x: item.thumb_2x,
      tags: item.tags || [],
      author: item.author || item.news_site || "Fuente desconocida",
      created_at: item.updated_at,
      news_site: item.news_site || "Unknown",
      updated_at: item.updated_at,
    }));

    console.log(`Fetched ${articles.length} articles for page ${pageParam}`);

    return {
      data: articles,
      count: response.data.count,
      page: response.data.page,
    };
  }
}
