import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60000, // Los datos se consideran frescos por 1 minuto
      retry: false, // Evita reintentos automáticos si la petición falla
    },
  },
});
