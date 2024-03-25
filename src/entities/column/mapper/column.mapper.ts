import { ColumnDto } from '../dto/column.dto'
import { Column } from '../model/column.model'

export const columnMapper = (dto: ColumnDto): Column => ({
  id: dto.Id,
  title: dto.Title,
})
