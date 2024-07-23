import classNames from 'classnames'
import { useFetcher } from '@remix-run/react'
import { Button, ErrorMessage } from '~/components/ui'
import { FC, useRef } from 'react'
import {
  CREATE_SHELF_ITEM_ACTION_KEY,
  DELETE_SHELF_ACTION_KEY,
  SHELF_ID_KEY,
  SHELF_ITEM_NAME_KEY,
} from '~/routes/book/constants'
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
  const createShelfItemFetcher = useFetcher()

  const createItemFormRef = useRef<HTMLFormElement | null>(null)

  const { renderedItems, addItem } = useOptimisticItems({
    savedItems: items,
    createShelfItemState: createShelfItemFetcher.state
  })

  const creteShelfItemError = createShelfItemFetcher.data?.errors?.itemName

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
        <createShelfItemFetcher.Form
          method='post'
          className='mb-2'
          ref={createItemFormRef}
          onSubmit={(event) => {
            event.preventDefault()

            const target = event.target as HTMLFormElement
            const itemNameInput = target.elements.namedItem(SHELF_ITEM_NAME_KEY) as HTMLInputElement

            createShelfItemFetcher.submit({
              itemName: itemNameInput.value,
              shelfId: id,
              _action: CREATE_SHELF_ITEM_ACTION_KEY
            }, { method: 'post' })
            addItem(itemNameInput.value)
            createItemFormRef.current?.reset()
          }}
        >
          <CreateShelfItem
            id={id}
            error={creteShelfItemError || createShelfItemFetcher.data?.errors?.shelfId}
          />
        </createShelfItemFetcher.Form>
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
        onSubmit={(event) => {
          if (!confirm('Are you sure you want to delete this shelf?')) {
            event.preventDefault()
          }
        }}
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
