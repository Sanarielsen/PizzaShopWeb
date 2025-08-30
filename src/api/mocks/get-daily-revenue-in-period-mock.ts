import { http, HttpResponse } from 'msw'
import type { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<never, never, GetDailyRevenueInPeriodResponse>('/metrics/daily-receipt-in-period', () => {
  return HttpResponse.json([
    {
      date: '01/01/2025',
      receipt: 20000
    },
    {
      date: '02/01/2025',
      receipt: 10000
    },
    {
      date: '03/01/2025',
      receipt: 22000
    },
    {
      date: '04/01/2025',
      receipt: 15000
    },
    {
      date: '05/01/2025',
      receipt: 10500
    },
    {
      date: '06/01/2025',
      receipt: 8000
    },
    {
      date: '07/01/2025',
      receipt: 9000
    }
  ])
})