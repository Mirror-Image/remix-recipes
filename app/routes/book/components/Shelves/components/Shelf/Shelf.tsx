import classNames from 'classnames'
import { useFetcher } from '@remix-run/react'
import { Button, ErrorMessage } from '~/components/ui'
import { FC } from 'react'
import { DELETE_SHELF_ACTION_KEY, SHELF_ID_KEY } from '~/routes/book/constants'
import { ACTION_KEY } from '~/constants/general'
import { SaveShelfName, CreateShelfItem, ShelfItem } from './components'
import { useOptimisticItems } from '~/routes/book/components/Shelves/components/Shelf/components/ShelfItem/hooks'

interface IShelfProps {
  id: string
  name: string
  items: { id: string; name: string; shelfId: string }[]
}

export const Shelf: FC<IShelfProps> = ({ id, name, items }) => {
  const deleteShelfFetcher = useFetcher()
  const { renderedItems, addItem } = useOptimisticItems({ savedItems: items })


  const isDeletingShelf =
    deleteShelfFetcher.formData?.get(ACTION_KEY) === DELETE_SHELF_ACTION_KEY &&
    deleteShelfFetcher.formData?.get(SHELF_ID_KEY) === id

  return isDeletingShelf ? null : (
    <li
      className={classNames(
        'border-2 border-primary rounded-md p-4 mb:h-fit',
        'w-[calc(100vw-2rem)] flex-none snap-center',
        'md:w-96',
        'flex flex-col justify-between',
      )}
    >
      <div>
        <SaveShelfName
          currentName={name}
          id={id}
        />
        <CreateShelfItem id={id} addItem={addItem} />
        <ul>
          {renderedItems.map(({ id, name, isOptimistic }) => (
            <ShelfItem
              key={id}
              name={name}
              id={id}
              isOptimistic={isOptimistic}
            />
          ))}
        </ul>
      </div>
      <deleteShelfFetcher.Form
        method='post'
        className='pt-8'
      >
        <input
          type='hidden'
          value={id}
          name={SHELF_ID_KEY}
        />
        <ErrorMessage className='pb-2'>{deleteShelfFetcher.data?.errors?.shelfId}</ErrorMessage>
        <Button
          variant='delete'
          name={ACTION_KEY}
          value={DELETE_SHELF_ACTION_KEY}
          className='w-full'
        >
          Delete Shelf
        </Button>
      </deleteShelfFetcher.Form>
    </li>
  )
}
