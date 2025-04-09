"use client";

import { useMemo } from "react";

interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  quantity: number;
  currentPrice: number;
  purchasePrice: number;
}

const portfolio = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    quantity: 0.5,
    currentPrice: 45000,
    purchasePrice: 42000,
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH",
    quantity: 2,
    currentPrice: 3000,
    purchasePrice: 2800,
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL",
    quantity: 10,
    currentPrice: 150,
    purchasePrice: 120,
  },
];

export default function Portfolio() {
  const totalValue = useMemo(() => {
    return portfolio.reduce(
      (acc, coin) => acc + coin.quantity * coin.currentPrice,
      0
    );
  }, []);

  const calculateProfitLoss = (coin: CryptoAsset) => {
    return (coin.currentPrice - coin.purchasePrice) * coin.quantity;
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-3xl font-bold mb-6">💼 Mi Portafolio</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-4 text-left">Cripto</th>
              <th className="p-4 text-left">Cantidad</th>
              <th className="p-4 text-left">Precio Actual</th>
              <th className="p-4 text-left">Inversión</th>
              <th className="p-4 text-left">Ganancia/Pérdida</th>
              <th className="p-4 text-left">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {portfolio.map((coin) => {
              const profitLoss = calculateProfitLoss(coin);

              return (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-500 transition-colors"
                >
                  <td className="p-4 font-medium">
                    {coin.name} ({coin.symbol})
                  </td>
                  <td className="p-4">{coin.quantity}</td>
                  <td className="p-4">${coin.currentPrice.toLocaleString()}</td>
                  <td className="p-4">
                    ${(coin.quantity * coin.purchasePrice).toLocaleString()}
                  </td>
                  <td
                    className={`p-4 ${
                      profitLoss >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profitLoss >= 0 ? "↑" : "↓"} $
                    {Math.abs(profitLoss).toLocaleString()}
                  </td>
                  <td className="p-4 font-semibold">
                    ${(coin.quantity * coin.currentPrice).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-2xl">
        <h2 className="text-xl font-semibold mb-2">📊 Valor Total</h2>
        <p className="text-3xl font-bold animate-pulse">
          ${totalValue.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
