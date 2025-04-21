import { mainCities } from "@/data/cities"
import { WeatherResponse } from "@/types/weather"
import { WeatherContent } from "@/components/weather-content"
import { fetchWeatherData } from "@/lib/weather"

export default async function WeatherPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>
    }) {
    
  const params = await searchParams
  const city = params.city || "310000"
  
  const weatherData = await fetchWeatherData(city);

  return (
    <WeatherContent 
      initialData={weatherData} 
      initialCity={city}
      mainCities={mainCities}
    />
  )
}
