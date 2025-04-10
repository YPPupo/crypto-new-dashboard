/* eslint-disable @typescript-eslint/no-explicit-any */
interface GlobalData {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  btc_dominance: number;
}

interface MarketData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  sparkline?: {
    price: number[];
  };
  categories?: string[];
}

interface FearGreedData {
  name: string;
  data: {
    value: string;
    value_classification: string;
    timestamp: string;
    time_until_update: string;
  }[];
  metadata?: Record<string, any>;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    tension: number;
  }[];
}

interface HistoricalData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

interface NewsArticle {
  id: string;
  title: string;
  url: string;
  description: string;
  thumb_2x: string;
  created_at: string;
  author: string;
  tags: string[];
  news_site: string;
  updated_at: string;
}

interface NewsApiResponse {
  count: number;
  data: NewsArticle[];
  page: number;
}

interface RawNewsApiResponse {
  count: number;
  data: any[]; // Ajusta el tipo según la respuesta real de la API
  page: number;
}
