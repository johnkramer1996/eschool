import { useQuery } from '@tanstack/react-query'
import { findSchoolboys } from 'entities/schoolboy'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib/paths'
import { TableContainer, Table, TableHead, TableRow, TableCell, Button } from '@mui/material'

export const SchoolboyPage = () => {
  const { schoolBoyId } = useParams()
  const schoolboysData = useQuery({
    queryKey: ['schoolBoys'],
    queryFn: findSchoolboys,
    select: (data) => data.items.find((schoolboy) => String(schoolboy.id) === schoolBoyId),
  })

  if (schoolboysData.isPending) return <div>Loading...</div>

  if (schoolboysData.error) return <div>{'An error has occurred: ' + schoolboysData.error.message}</div>

  const { data: schoolboy } = schoolboysData

  if (!schoolboy) return <Navigate to={PATH_PAGE[404]} />

  const list = [schoolboy.firstName, schoolboy.lastName, schoolboy.secondName].filter((el) => el)

  return (
    <section className='section'>
      <div className='container'>
        <TableContainer>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                {list.map((el, i) => (
                  <TableCell key={i}>{el}</TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Button variant='outlined' component={Link} to={PATH_PAGE.root} sx={{ mt: 2 }}>
          Назад
        </Button>
      </div>
    </section>
  )
}
