import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useRelativePerformance } from "@/lib/hooks/useCoinGecko";

Chart.register(...registerables);

const coins: (keyof typeof coinColors)[] = ["bitcoin", "ethereum", "binancecoin"];

const coinColors = {
  bitcoin: "rgb(99, 102, 241)",
  ethereum: "rgb(239, 68, 68)",
  binancecoin: "rgb(16, 185, 129)",
};

export const MarketPerformanceChart = () => {
  const { data, isLoading, isError } = useRelativePerformance(coins, 180);

  const processData = (data: HistoricalData[]) => {
    const labels = data[0].prices.map(([timestamp]) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString("es-ES");
    });

    const datasets = data.map((result, index) => {
      const prices = result.prices.map(([, price]) => price);
      const initialPrice = prices[0];

      const relativePerformance = prices.map((price) =>
        parseFloat(((price / initialPrice) * 100).toFixed(2))
      );

      return {
        label: coins[index].toUpperCase(),
        data: relativePerformance,
        borderColor: coinColors[coins[index]] || "rgb(255,255,255)",
        tension: 0.4,
      };
    });

    return { labels, datasets };
  };

  if (isLoading) return <p>Cargando datos...</p>;
  if (isError || !data) return <p>Error al obtener datos</p>;

  const chartData = processData(data);

  return (
    <div className="bg-gray-800 p-6 rounded-xl mb-8">
      <h2 className="text-xl font-bold mb-6">Performance Global del Mercado</h2>
      <div className="h-80">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: "bottom" } },
            scales: {
              y: { grid: { color: "#374151" }, ticks: { color: "#9CA3AF" } },
              x: { grid: { color: "#374151" }, ticks: { color: "#9CA3AF" } },
            },
          }}
        />
      </div>
    </div>
  );
};
