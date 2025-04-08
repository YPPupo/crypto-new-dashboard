/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import NewsImage from "@public/images/news.jpg";

interface NewsArticle {
  id: string;
  title: string;
  url: string;
  description: string;
  thumb_2x: string;
  created_at: string;
  author: string;
  tags: string[];
}

export default function News() {
  const [state, setState] = useState<{
    articles: NewsArticle[];
    loading: boolean;
    error: string | null;
    page: number;
    hasMore: boolean;
  }>({
    articles: [],
    loading: true,
    error: null,
    page: 1,
    hasMore: true,
  });

  const fetchNews = async (abortController?: AbortController) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      const res = await axios.get("https://api.coingecko.com/api/v3/news", {
        params: {
          page: state.page,
          per_page: 12,
        },
        signal: abortController?.signal,
      });

      setState((prev) => ({
        ...prev,
        articles: [...prev.articles, ...res.data.data],
        loading: false,
        hasMore: res.data.data.length > 0,
      }));
    } catch (error: any) {
      if (axios.isCancel(error)) return;

      const errorMessage =
        error.response?.data?.message || "Error al cargar las noticias";
      setState((prev) => ({
        ...prev,
        error: errorMessage,
        loading: false,
      }));
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    fetchNews(abortController);

    return () => abortController.abort();
  }, [state.page]);

  const loadMore = () => {
    if (!state.loading && state.hasMore) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  return (
    <div className="p-5">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🗞 Noticias Cripto (CoinGecko)</h1>
        <p className="text-gray-600 mt-2">
          Actualizaciones en tiempo real del mercado
        </p>
      </div>

      {state.error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          Error: {state.error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.loading && state.page === 1
          ? Array(6)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white shadow-lg rounded-xl overflow-hidden"
                >
                  <Skeleton height={200} />
                  <div className="p-4">
                    <Skeleton count={3} />
                  </div>
                </div>
              ))
          : state.articles.map((article) => (
              <article
                key={article.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Image
                  src={article.thumb_2x ?? NewsImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  width={640}
                  height={320}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/news.jpg";
                  }}
                />
                <div className="p-4">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mb-2"
                  >
                    <h2 className="text-xl font-semibold text-black hover:text-blue-500 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                  </a>
                  <p className="text-gray-600 mb-3 line-clamp-3">
                    {article.description}
                  </p>
                  {/* <div className="flex flex-wrap gap-2 mb-2">
                    {article.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-100 rounded-full text-sm capitalize"
                      >
                        {tag.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div> */}
                  <p className="text-sm text-gray-400">
                    {article.author || "Autor desconocido"} •{" "}
                    {new Date(article.created_at).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </article>
            ))}
      </div>

      {!state.loading && state.hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMore}
            disabled={state.loading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
          >
            {state.loading ? "Cargando..." : "Ver más noticias"}
          </button>
        </div>
      )}

      {!state.hasMore && (
        <p className="text-center text-gray-500 mt-6">
          No hay más noticias disponibles
        </p>
      )}
    </div>
  );
}
