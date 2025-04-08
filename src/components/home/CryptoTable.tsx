"use client";

import React from "react";
import Image from "next/image";

export function CryptoTable({ coins }: { coins: MarketData[] }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-xl font-bold mb-6">Top 5 Cryptos by Market Cap</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="text-gray-400 text-sm">
            <tr>
              <th className="pb-4 text-left">Crypto</th>
              <th className="pb-4 text-right">Price</th>
              <th className="pb-4 text-right">24h Change</th>
              <th className="pb-4 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <CryptoTableRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Subcomponente para cada fila de la tabla
interface CryptoTableRowProps {
  coin: MarketData;
}

function CryptoTableRow({ coin }: CryptoTableRowProps) {
  // Determina el color según el cambio de 24h
  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeColor = isPositive ? "text-green-400" : "text-red-400";

  return (
    <tr className="border-t border-gray-700">
      <td className="py-4">
        <div className="flex items-center">
          <Image
            src={coin.image}
            alt={coin.name}
            width={24}
            height={24}
            className="w-8 h-8 mr-3 rounded-full"
          />
          <div>
            <span className="font-medium">{coin.name}</span>
            <span className="text-gray-400 ml-2">
              {coin.symbol?.toUpperCase()}
            </span>
          </div>
        </div>
      </td>

      <td className="py-4 text-right">
        ${coin.current_price.toLocaleString()}
      </td>

      <td className={`py-4 text-right ${changeColor}`}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </td>

      <td className="py-4 text-right">
        $
        {coin.market_cap.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}
      </td>
    </tr>
  );
}
