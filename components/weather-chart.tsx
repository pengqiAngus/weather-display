"use client"

import { useEffect, useRef } from "react"
import * as echarts from "echarts"

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

interface WeatherChartProps {
  forecasts: ForecastDay[]
}

export default function WeatherChart({ forecasts }: WeatherChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    // Initialize chart
    if (chartRef.current) {
      chartInstance.current = echarts.init(chartRef.current)
    }

    // Handle resize
    const handleResize = () => {
      chartInstance.current?.resize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      chartInstance.current?.dispose()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (!chartInstance.current || forecasts.length === 0) return

    const dates = forecasts.map((day) => day.date.split("-").slice(1).join("/"))
    const dayTemps = forecasts.map((day) => Number.parseInt(day.daytemp))
    const nightTemps = forecasts.map((day) => Number.parseInt(day.nighttemp))

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const dayIndex = params[0].dataIndex
          const forecast = forecasts[dayIndex]
          return `
            <div style="font-weight: bold; margin-bottom: 5px;">${forecast.date} (星期${forecast.week === "7" ? "日" : forecast.week})</div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span>白天: ${forecast.daytemp}°C (${forecast.dayweather})</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
              <span>夜间: ${forecast.nighttemp}°C (${forecast.nightweather})</span>
            </div>
          `
        },
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "rgba(255, 255, 255, 0.8)",
        textStyle: {
          color: "#333",
        },
      },
      legend: {
        data: ["白天", "夜间"],
        textStyle: {
          color: "#fff",
        },
        right: 10,
        top: 0,
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: dates,
        axisLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
        axisLabel: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.2)",
          },
        },
        axisLabel: {
          color: "rgba(255, 255, 255, 0.8)",
          formatter: "{value}°C",
        },
      },
      series: [
        {
          name: "白天",
          type: "line",
          data: dayTemps,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#FFD700",
          },
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#FFD700" },
              { offset: 1, color: "#FFA500" },
            ]),
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(255, 215, 0, 0.5)" },
              { offset: 1, color: "rgba(255, 215, 0, 0)" },
            ]),
          },
        },
        {
          name: "夜间",
          type: "line",
          data: nightTemps,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#87CEEB",
          },
          lineStyle: {
            width: 3,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#87CEEB" },
              { offset: 1, color: "#4682B4" },
            ]),
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(135, 206, 235, 0.5)" },
              { offset: 1, color: "rgba(135, 206, 235, 0)" },
            ]),
          },
        },
      ],
    }

    chartInstance.current.setOption(option)
  }, [forecasts])

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
}
