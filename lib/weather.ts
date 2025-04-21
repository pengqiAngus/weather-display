import { WeatherResponse } from "@/types/weather"

export async function fetchWeatherData(city: string): Promise<WeatherResponse> {
  const baseUrl = process.env.AMAP_API_URL || ''
  const response = await fetch(`${baseUrl}/weather/weatherInfo?key=${process.env.AMAP_KEY}&city=${city}&extensions=all`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  return response.json()
} 