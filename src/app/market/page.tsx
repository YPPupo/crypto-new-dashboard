"use client";

import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import { useMarketData } from "@/lib/hooks/useCoinGecko";

export default function Market() {
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  // Se asume que useMarketData recibe itemsPerPage y pageNumber
  const { data, isLoading, isError } = useMarketData(itemsPerPage, pageNumber);
  const [marketData, setMarketData] = useState<MarketData[]>([]);

  useEffect(() => {
    if (data) setMarketData(data);
  }, [data, isLoading]);

  // Reinicia la página actual cuando cambian los filtros o la cantidad de ítems
  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, itemsPerPage]);

  const filteredData = marketData.filter((coin) => {
    const matchesSearch =
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (isLoading) return <MarketSkeleton />;
  if (isError) return <MarketError message={"Please refresh the page."} />;

  return (
    <div className="p-5 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Filtros */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-100 mb-6">
            📈 Mercado de Criptomonedas
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Buscar criptomonedas..."
                className="w-full px-4 py-3 bg-gray-800 rounded-lg text-gray-300
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute right-3 top-3.5 text-gray-400" />
            </div>
            {/* Selector de cantidad de items por página */}
            <div className="relative">
              <select
                className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300
                           appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                {[5, 10, 20, 50].map((num) => (
                  <option key={num} value={num}>
                    {num} por página
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg border border-gray-700">
          <table className="w-full">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-gray-300">#</th>
                <th className="px-6 py-4 text-left text-gray-300">Nombre</th>
                <th className="px-6 py-4 text-right text-gray-300">Precio</th>
                <th className="px-6 py-4 text-right text-gray-300">24h %</th>
                <th className="px-6 py-4 text-right text-gray-300">
                  Market Cap
                </th>
                <th className="px-6 py-4 text-right text-gray-300">
                  Volumen 24h
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.slice(0, itemsPerPage).map((coin, index) => (
                <tr
                  key={coin.id}
                  className="border-t border-gray-700 hover:bg-gray-800 transition-colors"
                >
                  <td className="px-6 py-4 text-gray-400">
                    {(pageNumber - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div>
                        <span className="text-gray-100 font-medium">
                          {coin.name}
                        </span>
                        <span className="text-gray-400 ml-2 text-sm">
                          {coin.symbol.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-100">
                    ${coin.current_price.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-4 text-right ${
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right text-gray-100">
                    $
                    {coin.market_cap.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-100">
                    $
                    {coin.total_volume.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador simple */}
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-gray-300">Página {pageNumber}</span>
          <button
            onClick={() => setPageNumber((prev) => prev + 1)}
            disabled={data && data.length < itemsPerPage}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}

const MarketSkeleton = () => (
  <div className="p-6 bg-gray-900 min-h-screen animate-pulse">
    <div className="max-w-7xl mx-auto">
      <div className="h-12 bg-gray-800 rounded w-64 mb-8"></div>
      <div className="grid gap-4 mb-8">
        <div className="h-10 bg-gray-800 rounded w-full"></div>
        <div className="h-10 bg-gray-800 rounded w-48"></div>
      </div>
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-16 bg-gray-800 rounded mb-2"></div>
      ))}
    </div>
  </div>
);

const MarketError = ({ message }: { message: string }) => (
  <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
    <div className="max-w-2xl text-center p-8 bg-red-900/20 rounded-xl">
      <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h2>
      <p className="text-gray-300">{message}</p>
    </div>
  </div>
);
