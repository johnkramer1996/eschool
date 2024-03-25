import { schoolBoyMapper as schoolboyMapper } from '../mapper/schoolboy.mapper'
import { schoolboyRoutes } from './schoolboy.routes'
import { SchoolBoyDto } from '../dto/schoolboy.dto'
import { ItemsWithCountDto } from '../../../shared/model/Items-with-count.dto'
import { axios } from 'shared/api'

export const findSchoolboys = async () => {
  const data: ItemsWithCountDto<SchoolBoyDto> = await axios(schoolboyRoutes.FIND_SCHOOLBOYS).then((res) => res.data)

  return {
    items: data.Items.map(schoolboyMapper),
    quantity: data.Quantity,
  }
}
