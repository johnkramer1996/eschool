import { ItemsWithCountDto } from 'shared/model/Items-with-count.dto'
import { RateDto } from '../dto/rate.dto'
import { rateMapper } from '../mapper/rate.mapper'
import { rateRoutes } from './rate.routes'
import { Rate } from '../model/rate.model'
import { hasRate } from '../lib/has-rate'
import { UpdateRateDto } from '../dto/UpdateRateDto'
import { axios } from 'shared/api'

export type SchoolboyToColumn = { [index: number]: { [index: number]: Rate } }

export const findRates = async () => {
  const data: ItemsWithCountDto<RateDto> = await axios(rateRoutes.FIND_RATES).then((res) => res.data)

  return data.Items.reduce((prev, val) => {
    ;(prev[val.SchoolboyId] ||= {})[val.ColumnId] = rateMapper(val)
    return prev
  }, {} as SchoolboyToColumn)
}

export const toggleRate = (rate: UpdateRateDto): Promise<any> => {
  const _hasRate = hasRate(rate)
  const payload = { SchoolboyId: rate.schoolboyId, ColumnId: rate.columnId, Title: _hasRate ? undefined : 'H' }

  return axios(rateRoutes.TOGGLE_RATE(_hasRate ? 'UnRate' : 'Rate'), { method: 'POST', data: payload })
}
