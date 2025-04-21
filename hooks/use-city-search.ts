import { useQuery } from "@tanstack/react-query"
import { CitySearchResponse } from "@/types/city"

export function useCitySearch(keyword: string) {
  return useQuery<CitySearchResponse>({
    queryKey: ["city", keyword],
    queryFn: async () => {
      if (!keyword) return { districts: [], status: "0", info: "", infocode: "", count: "0", suggestion: { keywords: [], cities: [] } }
      
      const response = await fetch(`/api/city?keyword=${encodeURIComponent(keyword)}`)
      if (!response.ok) {
        throw new Error("Failed to fetch city data")
      }
      return response.json()
    },
    enabled: !!keyword,
  })
} 