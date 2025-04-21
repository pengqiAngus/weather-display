// 城市基本信息
export interface City {
  adcode: string
  name: string
  citycode?: string[]
  center?: string
  level?: CityLevel
  districts?: City[]
}

// 城市级别
export type CityLevel = "province" | "city" | "district" | "street"

// 搜索建议
export interface CitySuggestion {
  keywords: string[]
  cities: string[]
}

// 城市搜索响应
export interface CitySearchResponse {
  status: string
  info: string
  infocode: string
  count: string
  suggestion: CitySuggestion
  districts: City[]
}
