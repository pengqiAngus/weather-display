"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { WeatherCast } from "@/types/weather"

interface WeatherForecastProps {
  forecasts: WeatherCast[]
  getWeatherIcon: (condition: string) => ReactNode
}

export default function WeatherForecast({ forecasts, getWeatherIcon }: WeatherForecastProps) {
  // Display all days in the forecast
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {forecasts.map((day, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-white/20 backdrop-blur-sm border-none text-white overflow-hidden hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="font-medium mb-2">
                  {day.date.split("-")[1]}/{day.date.split("-")[2]}
                  <span className="ml-2 text-white/80">星期{day.week === "7" ? "日" : day.week}</span>
                </p>
                <motion.div
                  className="flex justify-center mb-2"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 1 }}
                >
                  {getWeatherIcon(day.dayweather)}
                </motion.div>
                <p className="mb-1">{day.dayweather}</p>
                <div className="flex justify-center items-center space-x-4">
                  <span className="text-lg font-bold">{day.daytemp}°</span>
                  <span className="text-white/80">{day.nighttemp}°</span>
                </div>
                <p className="text-sm text-white/80 mt-2">
                  {day.daywind} 风 {day.daypower}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
