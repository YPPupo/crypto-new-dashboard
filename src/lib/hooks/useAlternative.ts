import { AlternativeService } from "@/services/alternative.service";
import { useQuery } from "@tanstack/react-query";

const alternativeService = new AlternativeService();

export function useFearGreed() {
  return useQuery({
    queryKey: ["fearGreed"],
    queryFn: () => alternativeService.getFearGreed(),
    staleTime: 60_000,
  });
}
