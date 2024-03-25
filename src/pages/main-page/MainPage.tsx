import { findSchoolboys } from 'entities/schoolboy'
import { PATH_PAGE } from 'shared/lib/paths'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { findColumns } from 'entities/column'
import { findRates } from 'entities/rate'
import { ToggleRateCells } from 'features/rate/toggle-rate'

export const MainPage = () => {
  const schoolboyData = useQuery({ queryKey: ['schoolBoys'], queryFn: findSchoolboys })
  const columnData = useQuery({ queryKey: ['columns'], queryFn: findColumns })
  const ratesData = useQuery({ queryKey: ['rates'], queryFn: findRates })

  if (schoolboyData.isLoading || schoolboyData.isPending) return <div>Loading...</div>
  if (columnData.isLoading || columnData.isPending) return <div>Loading...</div>
  if (ratesData.isLoading || ratesData.isPending) return <div>Loading...</div>

  if (schoolboyData.error) return <div>{'An error has occurred: ' + schoolboyData.error.message}</div>
  if (columnData.error) return <div>{'An error has occurred: ' + columnData.error.message}</div>
  if (ratesData.error) return <div>{'An error has occurred: ' + ratesData.error.message}</div>

  const { data: schoolboys } = schoolboyData
  const { data: columns } = columnData
  const { data: rates } = ratesData

  return (
    <section className='section'>
      <div className='container'>
        <Table aria-label='schoolboy table'>
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Ім’я учня</TableCell>
              {columns.items.map((column) => {
                return <TableCell key={column.id}>{column.title}</TableCell>
              })}
            </TableRow>
          </TableHead>

          <TableBody>
            {schoolboys.items.map((user, i) => {
              const schoolboyId = user.id
              const shoolboyRate = rates?.[schoolboyId] ?? []
              const to = PATH_PAGE.schoolboys.schoolboy(String(schoolboyId))

              return (
                <TableRow key={schoolboyId}>
                  <TableCell component='th' scope='row'>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    <Link to={to} className='text-link'>
                      {user.firstName} {user.lastName}
                    </Link>
                  </TableCell>

                  <ToggleRateCells>
                    {(toggle) => {
                      return (
                        <>
                          {columns.items.map((column) => {
                            const columnId = column.id
                            const rate = shoolboyRate[columnId]
                            const title = rate ? rate.title : ''
                            const onClick = () => toggle({ schoolboyId, columnId, title })
                            return (
                              <TableCell key={columnId} onClick={onClick} className='MuiTableCell-body--rate'>
                                {title}
                              </TableCell>
                            )
                          })}
                        </>
                      )
                    }}
                  </ToggleRateCells>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
