import { NextResponse } from 'next/server'
import { WeatherResponse } from '@/types/weather'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get('city') || 'shanghai'

  try {
    const response = await fetch(
      `${process.env.AMAP_API_URL}/weather/weatherInfo?key=${process.env.AMAP_KEY}&city=${city}&extensions=all`
    )
    const data: WeatherResponse = await response.json()
    
    return NextResponse.json<WeatherResponse>(data)
  } catch (error) {
    return NextResponse.json<WeatherResponse>({ 
      status: "0", 
      count: "0",
      info: "Failed to fetch weather data", 
      infocode: "500",
      lives: [],
      forecasts: []
    }, { status: 500 })
  }
} 