export const rateRoutes = {
  FIND_RATES: '/Rate',
  TOGGLE_RATE: (vote: ToggleRateRoute) => `/${vote}`,
}

export type ToggleRateRoute = 'Rate' | 'UnRate'
