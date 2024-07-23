import { FC } from 'react'
import { useFetcher } from '@remix-run/react'
import { ACTION_KEY } from '~/constants/general'
import { DELETE_SHELF_ITEM_ACTION_KEY, SHELF_ITEM_ID_KEY } from '~/routes/book/constants'
import { ErrorMessage } from '~/components/ui'
import { TrashIcon } from '~/assets/icons'

interface IShelfItemProps {
  id: string
  name: string
  isOptimistic?: boolean
}

export const ShelfItem: FC<IShelfItemProps> = ({ id, name, isOptimistic }) => {
  const deleteShelfItemFetcher = useFetcher()

  const isDeletingItem = !!deleteShelfItemFetcher.formData

  return isDeletingItem ? null : (
    <li className='mb-1'>
      <deleteShelfItemFetcher.Form method='post'>
        <div className='flex'>
          <p className='w-full'>{name}</p>
          {!isOptimistic && (
            <button
              name={ACTION_KEY}
              value={DELETE_SHELF_ITEM_ACTION_KEY}
            >
              <TrashIcon />
            </button>
          )}
          <input
            type="hidden"
            name={SHELF_ITEM_ID_KEY}
            value={id}
          />
        </div>
        <ErrorMessage>{deleteShelfItemFetcher.data?.errors?.itemId}</ErrorMessage>
      </deleteShelfItemFetcher.Form>
    </li>
  )
}
