import {
  CREATE_SHELF_ITEM_ACTION_KEY,
  SHELF_ID_KEY,
  SHELF_ITEM_NAME_KEY,
} from '~/routes/book/constants'
import classNames from 'classnames'
import { ACTION_KEY } from '~/constants/general'
import { SaveIcon } from '~/assets/icons'
import { ErrorMessage } from '~/components/ui'
import { useFetcher } from '@remix-run/react'
import { FC, useRef } from 'react'

interface ICreateShelfItemProps {
  id: string
  addItem: (name: string) => void
}

export const CreateShelfItem: FC<ICreateShelfItemProps> = ({ id, addItem }) => {
  const createShelfItemFetcher = useFetcher()
  const creteShelfItemError = createShelfItemFetcher.data?.errors?.itemName

  const createItemFormRef = useRef<HTMLFormElement | null>(null)

  return (
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
      <div className='flex mb-0.5'>
        <input
          type='text'
          name={SHELF_ITEM_NAME_KEY}
          placeholder='New Item'
          autoComplete='off'
          className={classNames(
            'w-full outline-none',
            'border-b-2 border-b-background focus:border-b-primary',
            {
              'border-b-red-600': creteShelfItemError,
            },
          )}
        />
        <button
          name={ACTION_KEY}
          value={CREATE_SHELF_ITEM_ACTION_KEY}
          className='ml-4'
        >
          <SaveIcon />
        </button>
      </div>
      <ErrorMessage>
        {creteShelfItemError || createShelfItemFetcher.data?.errors?.shelfId}
      </ErrorMessage>
      <input
        type='hidden'
        name={SHELF_ID_KEY}
        value={id}
      />
    </createShelfItemFetcher.Form>
  )
}
