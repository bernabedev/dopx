export const prerender = false

import { webkit } from '@playwright/test'
import type { APIRoute } from 'astro'

let cache: { data: any; timestamp: number } | null = null
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 1 day in milliseconds

export const GET: APIRoute = async () => {
  try {
    // If the cache is valid, return the stored data directly
    if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      return new Response(JSON.stringify({ success: true, data: cache.data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const browser = await webkit.launch({ headless: true })
    const page = await browser.newPage()

    await page.goto(
      'https://www.bancentral.gov.do/SectorExterno/HistoricoTasas',
      {
        waitUntil: 'networkidle'
      }
    )

    const response = await page.evaluate(async () => {
      // Get current date
      const today = new Date()

      // Set lastYear to exactly 12 months ago
      const lastYear = new Date(today)
      lastYear.setFullYear(today.getFullYear() - 1)

      // Create FormData object
      const formData = new FormData()
      formData.append('fromDate', lastYear.toISOString())
      formData.append('toDate', today.toISOString())
      formData.append('isForReporting', 'false') // Ensure value is a string

      const res = await fetch(
        'https://www.bancentral.gov.do/Home/GetHistoricalExchangeRates',
        {
          method: 'POST',
          headers: {
            'User-Agent': navigator.userAgent,
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://www.bancentral.gov.do/'
          },
          body: formData
        }
      )
      return res.text()
    })

    await browser.close()

    const exchangeData = JSON.parse(response)

    // Cache data and current date
    cache = { data: exchangeData, timestamp: Date.now() }

    return new Response(JSON.stringify({ success: true, data: exchangeData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error) {
    console.error('Error al obtener los datos:', error)
    return new Response(
      JSON.stringify({ success: false, error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
