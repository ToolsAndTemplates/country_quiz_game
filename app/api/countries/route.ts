import { NextResponse } from 'next/server'

const COUNTRIES_API = 'https://restcountries.com/v3.1/all'

export async function GET() {
  try {
    const response = await fetch(COUNTRIES_API, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching countries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch countries' },
      { status: 500 }
    )
  }
}
