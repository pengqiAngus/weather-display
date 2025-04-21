import { NextResponse } from 'next/server'
import { CitySearchResponse } from '@/types/city'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword')

  if (!keyword) {
    return NextResponse.json<CitySearchResponse>({ 
      status: "0", 
      info: "Keyword is required", 
      infocode: "400", 
      count: "0", 
      suggestion: { keywords: [], cities: [] },
      districts: []
    }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://restapi.amap.com/v3/config/district?key=${process.env.AMAP_KEY}&keywords=${encodeURIComponent(
        keyword
      )}&subdistrict=0`
    )
    const data: CitySearchResponse = await response.json()
    
    return NextResponse.json<CitySearchResponse>(data)
  } catch (error) {
    return NextResponse.json<CitySearchResponse>({ 
      status: "0", 
      info: "Failed to fetch city data", 
      infocode: "500", 
      count: "0", 
      suggestion: { keywords: [], cities: [] },
      districts: []
    }, { status: 500 })
  }
} 