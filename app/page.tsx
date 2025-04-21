import { mainCities } from "@/data/cities"
import { WeatherResponse } from "@/types/weather"
import { WeatherContent } from "@/components/weather-content"

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>
    }) {
    
  const params = await searchParams
  const city = params.city || "310000"
  
  const response = await fetch(`http://localhost:3000/api/weather?city=${city}`, {
    cache: 'no-store'
  })
  if (!response.ok) {
    throw new Error("Failed to fetch weather data")
  }
  const weatherData = await response.json()

  return (
    <WeatherContent 
      initialData={weatherData} 
      initialCity={city}
      mainCities={mainCities}
    />
  )
}
