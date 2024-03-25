import { columnRoutes } from './column.routes'
import { ItemsWithCountDto } from 'shared/model'
import { ColumnDto } from '../dto/column.dto'
import { columnMapper } from '../mapper/column.mapper'
import { axios } from 'shared/api'

export const findColumns = async () => {
  const data: ItemsWithCountDto<ColumnDto> = await axios(columnRoutes.FIND_COLUMNS).then((res) => res.data)

  return { items: data.Items.map(columnMapper), quantity: data.Quantity }
}
