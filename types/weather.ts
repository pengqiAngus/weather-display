// 天气数据响应
export interface WeatherResponse {
  status: string
  count: string
  info: string
  infocode: string
  lives?: WeatherLive[]
  forecasts?: WeatherForecast[]
}

// 实时天气
export interface WeatherLive {
  province: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
}

// 天气预报
export interface WeatherForecast {
  city: string
  adcode: string
  province: string
  reporttime: string
  casts: WeatherCast[]
}

// 天气预测
export interface WeatherCast {
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
  daytemp_float: string
  nighttemp_float: string
} 