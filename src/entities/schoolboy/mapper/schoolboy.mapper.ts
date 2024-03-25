import { SchoolBoyDto } from '../dto/schoolboy.dto'
import { Schoolboy } from '../model/school-boy.model'

export const schoolBoyMapper = (dto: SchoolBoyDto): Schoolboy => ({
  id: dto.Id,
  firstName: dto.FirstName,
  secondName: dto.SecondName,
  lastName: dto.LastName,
})
