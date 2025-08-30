import { env } from '@/env'
import { setupWorker } from 'msw/browser'
import { signInMock } from './sign-in-mock'
import { registerRestaurantMock } from './register-restaurant-mock'
import { getDayOrdersAmountMock } from './get-day-orders-amount'
import { getMonthOrdersAmountMock } from './get-month-orders-amount'
import { getMonthCanceledOrdersAmountMock } from './get-month-canceled-orders-amount'
import { getMonthRevenueMock } from './get-month-revenue'
import { getDailyRevenueInPeriodMock } from './get-daily-revenue-in-period-mock'
import { getPopularProductsMock } from './get-popular-products-mock'
import { getProfileMock } from './get-profile-mock'
import { getManagedRestaurantMock } from './get-managed-restaurant-mock'
import { updateProfileMock } from './update-profile-mock'
import { getOrdersMock } from './get-orders-mock'
import { getOrdersDetailMock } from './get-orders-details-mock'
import { approveOrderMock } from './approve-order-mock'
import { cancelOrderMock } from './cancel-order-mock'
import { dispatchOrderMock } from './dispatch-order-mock'
import { deliverOrderMock } from './deliver-order-mock'


export const worker = setupWorker(
  signInMock, 
  registerRestaurantMock, 
  getDayOrdersAmountMock, 
  getMonthOrdersAmountMock, 
  getMonthCanceledOrdersAmountMock,
  getMonthRevenueMock,
  getDailyRevenueInPeriodMock,
  getPopularProductsMock,
  getPopularProductsMock,
  getProfileMock,
  getManagedRestaurantMock,
  updateProfileMock,
  getOrdersMock,
  getOrdersDetailMock,
  approveOrderMock,
  cancelOrderMock,
  dispatchOrderMock,
  deliverOrderMock
)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }
  
  await worker.start()
}