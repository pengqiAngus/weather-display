import { useQuery } from "@tanstack/react-query"
import { WeatherResponse } from "@/types/weather"

export function useWeatherData(city: string, initialData?: WeatherResponse) {
    
  return useQuery<WeatherResponse>({
    queryKey: ["weather", city],
    queryFn: async () => {
      const response = await fetch(`/api/weather?city=${city}`)
      if (!response.ok) {
        throw new Error("Failed to fetch weather data")
      }
      return response.json()
    },
    initialData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
} 