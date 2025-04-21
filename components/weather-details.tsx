"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Sunrise, Sunset, Thermometer, Wind } from "lucide-react"
import { motion } from "framer-motion"

interface ForecastDay {
  date: string
  week: string
  dayweather: string
  nightweather: string
  daytemp: string
  nighttemp: string
  daywind: string
  nightwind: string
  daypower: string
  nightpower: string
}

interface WeatherDetailsProps {
  forecast?: ForecastDay
  city: string
}

export default function WeatherDetails({ forecast, city }: WeatherDetailsProps) {
  if (!forecast) return null

  const detailItems = [
    {
      icon: <Thermometer className="h-5 w-5 text-white" />,
      label: "温度范围",
      value: `${forecast.nighttemp}°C - ${forecast.daytemp}°C`,
    },
    {
      icon: <Wind className="h-5 w-5 text-white" />,
      label: "白天风向",
      value: `${forecast.daywind} ${forecast.daypower}`,
    },
    {
      icon: <Wind className="h-5 w-5 text-white" />,
      label: "夜间风向",
      value: `${forecast.nightwind} ${forecast.nightpower}`,
    },
    {
      icon: <Droplets className="h-5 w-5 text-white" />,
      label: "湿度",
      value: "65%", // Placeholder as it's not in the API data
    },
    {
      icon: <Sunrise className="h-5 w-5 text-white" />,
      label: "日出",
      value: "06:12", // Placeholder as it's not in the API data
    },
    {
      icon: <Sunset className="h-5 w-5 text-white" />,
      label: "日落",
      value: "18:24", // Placeholder as it's not in the API data
    },
  ]

  return (
    <div className="mt-4 space-y-4">
      <Card className="bg-white/20 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg">天气详情 - {city}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detailItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="mr-3">{item.icon}</div>
                <div>
                  <div className="text-sm text-white/80">{item.label}</div>
                  <div className="font-medium">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/20 backdrop-blur-sm border-none text-white">
        <CardHeader>
          <CardTitle className="text-lg">天气对比</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <motion.div
              className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm w-[45%]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-white/80">白天</div>
              <div className="font-medium">{forecast.dayweather}</div>
              <div className="text-2xl font-bold">{forecast.daytemp}°C</div>
            </motion.div>
            <div className="h-16 w-px bg-white/30"></div>
            <motion.div
              className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm w-[45%]"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm text-white/80">夜间</div>
              <div className="font-medium">{forecast.nightweather}</div>
              <div className="text-2xl font-bold">{forecast.nighttemp}°C</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
