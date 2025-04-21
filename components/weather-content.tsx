"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Cloud, CloudDrizzle, CloudRain, CloudSnow, Droplets, Wind, Sun } from "lucide-react"
import WeatherForecast from "@/components/weather-forecast"
import WeatherDetails from "@/components/weather-details"
import WeatherChart from "@/components/weather-chart"
import { motion } from "framer-motion"
import { City } from "@/types/city"
import { CitySearch } from "@/components/city-search"
import { WeatherResponse } from "@/types/weather"
import { useWeatherData } from "@/hooks/use-weather-data"
import { useCitySearch } from "@/hooks/use-city-search"
import { useDebounce } from "@/hooks/use-debounce"

interface WeatherContentProps {
  initialData: WeatherResponse
  initialCity: string
  mainCities: City[]
}

export function WeatherContent({ initialData, initialCity, mainCities }: WeatherContentProps) {
  const [selectedCity, setSelectedCity] = useState(initialCity)
  const [searchQuery, setSearchQuery] = useState("")
  const debouncedSearchQuery = useDebounce(searchQuery, 500)
  const { data: searchResults } = useCitySearch(debouncedSearchQuery)
  const { data: weatherData, isLoading } = useWeatherData(selectedCity, selectedCity === initialCity ? initialData : undefined)

  const handleCityChange = (city: City) => {
    setSelectedCity(city.adcode)
    setSearchQuery("")
  }

  // Function to get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "晴":
        return <Sun className="h-12 w-12 text-yellow-500" />
      case "多云":
        return <Cloud className="h-12 w-12 text-gray-500" />
      case "阴":
        return <Cloud className="h-12 w-12 text-gray-600" />
      case "小雨":
        return <CloudDrizzle className="h-12 w-12 text-blue-400" />
      case "中雨":
        return <CloudRain className="h-12 w-12 text-blue-500" />
      case "大雨":
        return <CloudRain className="h-12 w-12 text-blue-600" />
      case "雪":
        return <CloudSnow className="h-12 w-12 text-blue-200" />
      default:
        return <Cloud className="h-12 w-12 text-gray-500" />
    }
  }

  // Get background gradient based on weather and time
  const getBackgroundGradient = () => {
    if (!weatherData?.forecasts?.length) return "bg-gradient-to-b from-sky-400 to-blue-500"

    const currentWeather = weatherData.forecasts[0]?.casts?.[0]?.dayweather
    if (currentWeather.includes("雨")) {
      return "bg-gradient-to-b from-slate-500 to-slate-700"
    } else if (currentWeather.includes("云") || currentWeather.includes("阴")) {
      return "bg-gradient-to-b from-blue-300 to-blue-500"
    } else if (currentWeather.includes("晴")) {
      return "bg-gradient-to-b from-sky-300 to-blue-600"
    } else if (currentWeather.includes("雪")) {
      return "bg-gradient-to-b from-blue-100 to-blue-300"
    }

    return "bg-gradient-to-b from-sky-400 to-blue-500"
  }
  
  const currentForecast = weatherData?.forecasts?.[0]
  const currentDay = currentForecast?.casts?.[0]

  return (
    <div className={`min-h-screen ${getBackgroundGradient()} text-white transition-all duration-500`}>
      <div className="container mx-auto py-8 px-4">
        <motion.h1
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          天气预报
        </motion.h1>

        <CitySearch onSelectCity={handleCityChange} />

        {/* City Selection */}
        <motion.div
          className="flex justify-center mb-6 overflow-x-auto pb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex space-x-2">
            {mainCities.map((city) => (
              <Button
                key={city.adcode}
                variant={selectedCity === city.adcode ? "default" : "outline"}
                onClick={() => handleCityChange(city)}
                className={`min-w-[80px] ${
                  selectedCity === city.adcode
                    ? "bg-white text-blue-600"
                    : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/40"
                }`}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
            <div className="text-center text-white">
              <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-xl">加载中...</p>
            </div>
          </div>
        )}

        {weatherData && (
          <>
            {/* Current Weather */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="mb-6 bg-white/20 backdrop-blur-sm border-none text-white overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-3xl">{currentForecast?.city}</CardTitle>
                  <CardDescription className="text-white/80">
                    {currentDay?.date} 星期{currentDay?.week === "7" ? "日" : currentDay?.week}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      >
                        {getWeatherIcon(currentDay?.dayweather || "")}
                      </motion.div>
                      <div className="ml-4">
                        <div className="text-5xl font-bold">{currentDay?.daytemp}°C</div>
                        <div className="text-white/80">{currentDay?.dayweather}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <Wind className="h-5 w-5 mr-2 text-white" />
                        <div>
                          <div className="text-sm text-white/80">风向</div>
                          <div>
                            {currentDay?.daywind} {currentDay?.daypower}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm">
                        <Droplets className="h-5 w-5 mr-2 text-white" />
                        <div>
                          <div className="text-sm text-white/80">湿度</div>
                          <div>65%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Weather Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <Card className="bg-white/20 backdrop-blur-sm border-none text-white">
                <CardHeader>
                  <CardTitle className="text-xl">7天温度趋势</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeatherChart forecasts={currentForecast?.casts || []} />
                </CardContent>
              </Card>
            </motion.div>

            {/* Weather Details and Forecast */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Tabs defaultValue="forecast" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-white/20 backdrop-blur-sm">
                  <TabsTrigger
                    value="forecast"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-white"
                  >
                    天气预报
                  </TabsTrigger>
                  <TabsTrigger
                    value="details"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 text-white"
                  >
                    详细信息
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="forecast">
                  <WeatherForecast forecasts={currentForecast?.casts || []} getWeatherIcon={getWeatherIcon} />
                </TabsContent>
                <TabsContent value="details">
                  <WeatherDetails forecast={currentDay} city={currentForecast?.city || ""} />
                </TabsContent>
              </Tabs>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
} 