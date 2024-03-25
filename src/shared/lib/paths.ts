export const PATH_PAGE = {
  root: '/',
  schoolboys: {
    root: `/schoolboys/`,
    schoolboy: (schoolboyId: string) => `/schoolboys/${schoolboyId}`,
  },
  404: '/404',
  error: '/error',
}
