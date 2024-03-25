import { ReactElement } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { SchoolboyToColumn, toggleRate } from 'entities/rate/api/rate.api'
import { UpdateRateDto } from 'entities/rate/dto/UpdateRateDto'
import { hasRate } from 'entities/rate/lib/has-rate'
import { Rate } from 'entities/rate'
import { notifyError, notifySuccess } from 'shared/lib'

type ToggleRateCellsProps = {
  children: (rate: (dto: UpdateRateDto) => void) => ReactElement
}

export const ToggleRateCells = (props: ToggleRateCellsProps) => {
  const { children } = props

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationKey: ['rates'],
    mutationFn: toggleRate,
    onMutate: async (rate: UpdateRateDto) => {
      const { schoolboyId, columnId } = rate
      const _hasRate = hasRate(rate)
      const newRate: Omit<Rate, 'id'> | undefined = _hasRate ? undefined : { schoolboyId, columnId, title: 'H' }

      await queryClient.cancelQueries({ queryKey: ['rates'] })

      const previousData: SchoolboyToColumn | undefined = queryClient.getQueryData(['rates'])

      queryClient.setQueryData(['rates'], (old: SchoolboyToColumn) => ({
        ...old,
        [schoolboyId]: { ...old[schoolboyId], [columnId]: newRate },
      }))

      notifySuccess(_hasRate ? 'Успішно видаленно' : 'Успішно виставленно')

      Boolean(true)

      return { previousData, _hasRate }
    },
    onError: (err, newData, context) => {
      notifyError(context?._hasRate ? 'Не вдалося видалити' : 'Не вдалося виставлети')
      queryClient.setQueryData(['rates'], context?.previousData)
    },
  })

  return children(mutation.mutate)
}
