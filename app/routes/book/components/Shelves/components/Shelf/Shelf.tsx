import classNames from 'classnames'
import { useFetcher } from '@remix-run/react'
import { Button, ErrorMessage } from '~/components/ui'
import { FC } from 'react'
import {
  DELETE_SHELF_ACTION_KEY,
  SAVE_SHELF_NAME_ACTION_KEY,
  SHELF_ID_KEY,
  SHELF_NAME_KEY,
} from '~/routes/book/constants'
import { ACTION_KEY } from '~/constants/general'
import { SaveIcon } from '~/assets/icons'

interface IShelfProps {
  id: string
  name: string
  items: { id: string; name: string; shelfId: string }[]
}

export const Shelf: FC<IShelfProps> = ({ id, name, items }) => {
  const deleteShelfFetcher = useFetcher()
  const saveShelfNameFetcher = useFetcher()

  const isDeletingShelf =
    deleteShelfFetcher.formData?.get(ACTION_KEY) === DELETE_SHELF_ACTION_KEY &&
    deleteShelfFetcher.formData?.get(SHELF_ID_KEY) === id

  const shelfNameError = saveShelfNameFetcher.data?.errors?.shelfName

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
        <saveShelfNameFetcher.Form
          method='post'
          className='flex'
        >
          <div className='w-full mb-2'>
            <input
              type='text'
              defaultValue={name}
              name={SHELF_NAME_KEY}
              placeholder='Shelf Name'
              autoComplete='off'
              className={classNames(
                'text-2xl font-extrabold mb-2 w-full outline-none',
                'border-b-2 border-b-background focus:border-b-primary',
                {
                  'border-b-red-600': shelfNameError,
                },
              )}
            />
            <ErrorMessage className='pb-2'>{shelfNameError}</ErrorMessage>
          </div>
          <button
            name={ACTION_KEY}
            value={SAVE_SHELF_NAME_ACTION_KEY}
            className='ml-4'
          >
            <SaveIcon />
          </button>
          <input
            type='hidden'
            name={SHELF_ID_KEY}
            value={id}
          />
        </saveShelfNameFetcher.Form>
        <ul>
          {items.map(item => (
            <li
              className='py-2'
              key={item.id}
            >
              {item.name}
            </li>
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
