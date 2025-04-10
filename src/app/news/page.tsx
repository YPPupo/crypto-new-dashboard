"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import NewsImage from "@public/images/news.jpg";
import { useCoinGeckoNews } from "@/lib/hooks/useCoinGecko";

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
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useCoinGeckoNews();

  const articles = data?.pages?.flatMap((page) => page.data) ?? [];

  const loadMoreNews = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">🗞 Noticias Cripto (CoinGecko)</h1>
        <p className="text-gray-600 mt-2">
          Actualizaciones en tiempo real del mercado
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading && !isFetchingNextPage
          ? Array(6)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          : articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
        {isFetchingNextPage &&
          Array(3) // Mostrar algunos esqueletos mientras se cargan más
            .fill(0)
            .map((_, i) => <SkeletonCard key={`loading-${i}`} />)}
      </div>

      {/* Load more news */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={loadMoreNews}
            disabled={isFetchingNextPage || isLoading}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 transition-colors"
          >
            {isFetchingNextPage ? "Cargando más..." : "Ver más noticias"}
          </button>
        </div>
      )}

      {/* No more news available (opcional, dependiendo de la lógica de hasNextPage) */}
      {!hasNextPage && articles.length > 0 && (
        <p className="text-center text-gray-500 mt-6">
          No hay más noticias disponibles
        </p>
      )}

      {/* Mensaje inicial de no hay noticias si la primera carga está vacía */}
      {!isLoading && articles.length === 0 && !isError && (
        <p className="text-center text-gray-500 mt-6">
          No se encontraron noticias.
        </p>
      )}

      {/* Error handling */}
      {isError && error && (
        <div className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg">
          Error: {(error as Error).message}
        </div>
      )}
    </div>
  );
}

const NewsCard = ({ article }: { article: NewsArticle }) => {
  return (
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
        <p className="text-gray-600 mb-3 line-clamp-3">{article.description}</p>
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
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
      <Skeleton height={200} />
      <div className="p-4">
        <Skeleton count={3} />
      </div>
    </div>
  );
};
