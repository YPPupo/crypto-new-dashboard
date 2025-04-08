import axiosAlternativeMe from "@/lib/axiosAlternativeMe";

export class AlternativeService {
  async getFearGreed() {
    const response = await axiosAlternativeMe.get<FearGreedData>(
      `/fng/?limit=1`
    );
    return response.data;
  }
}
