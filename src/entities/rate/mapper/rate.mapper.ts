import { RateDto } from '../dto/rate.dto'
import { Rate } from '../model/rate.model'

export const rateMapper = (dto: RateDto): Rate => ({
  id: dto.Id,
  title: dto.Title,
  schoolboyId: dto.SchoolboyId,
  columnId: dto.ColumnId,
})
