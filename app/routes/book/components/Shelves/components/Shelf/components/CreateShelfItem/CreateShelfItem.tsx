import {
  CREATE_SHELF_ITEM_ACTION_KEY,
  SHELF_ID_KEY,
  SHELF_ITEM_NAME_KEY,
} from '~/routes/book/constants'
import classNames from 'classnames'
import { ACTION_KEY } from '~/constants/general'
import { SaveIcon } from '~/assets/icons'
import { ErrorMessage } from '~/components/ui'
import { FC } from 'react'

interface ICreateShelfItemProps {
  id: string
  error?: string
}

export const CreateShelfItem: FC<ICreateShelfItemProps> = ({ id, error }) => (
  <>
    <div className='flex mb-0.5 group'>
      <input
        type='text'
        name={SHELF_ITEM_NAME_KEY}
        placeholder='New Item'
        autoComplete='off'
        className={classNames(
          'w-full outline-none',
          'border-b-2 border-b-background focus:border-b-primary',
          {
            'border-b-red-600': error,
          },
        )}
        required
      />
      <button
        name={ACTION_KEY}
        value={CREATE_SHELF_ITEM_ACTION_KEY}
        className={classNames(
          'ml-4 opacity-0 hover:opacity-100 focus:opacity-100',
          'group-focus-within:opacity-100'
        )}
      >
        <SaveIcon />
      </button>
    </div>
    <ErrorMessage>
      {error}
    </ErrorMessage>
    <input
      type='hidden'
      name={SHELF_ID_KEY}
      value={id}
    />
  </>
)
