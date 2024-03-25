import { Rate } from '../model/rate.model'

export const hasRate = (rate: Pick<Rate, 'title'>) => !(rate.title === '')
