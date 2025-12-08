import { NextResponse } from 'next/server'

const COUNTRIES_API = 'https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,subregion,languages,area,cca2,cca3'

let cachedData: any = null
let cacheTime: number = 0
const CACHE_DURATION = 3600000 // 1 hour in milliseconds

export async function GET() {
  try {
    // Return cached data if still valid
    const now = Date.now()
    if (cachedData && (now - cacheTime) < CACHE_DURATION) {
      return NextResponse.json(cachedData)
    }

    const response = await fetch(COUNTRIES_API, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CountryQuizGame/1.0'
      }
    })

    if (!response.ok) {
      console.error(`REST Countries API returned ${response.status}`)
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    // Cache the successful response
    cachedData = data
    cacheTime = now

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error fetching countries:', error?.message || error)

    // If we have cached data, return it even if expired
    if (cachedData) {
      console.log('Returning stale cache due to error')
      return NextResponse.json(cachedData)
    }

    return NextResponse.json(
      { error: 'Failed to fetch countries', message: error?.message || 'Unknown error' },
      { status: 500 }
    )
  }
}
