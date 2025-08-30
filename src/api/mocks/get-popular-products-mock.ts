import { http, HttpResponse } from 'msw'
import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<never, never, GetPopularProductsResponse>('/metrics/popular-products', () => {
  return HttpResponse.json([
    {
      product: 'Pizza 01',
      amount: 50
    },
    {
      product: 'Pizza 02',
      amount: 52
    },
    {
      product: 'Pizza 03',
      amount: 59
    },
    {
      product: 'Pizza 04',
      amount: 61
    },
    {
      product: 'Pizza 05',
      amount: 10
    }
  ])
})