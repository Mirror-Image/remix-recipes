import { SAVE_SHELF_NAME_ACTION_KEY, SHELF_ID_KEY, SHELF_NAME_KEY } from '~/routes/book/constants'
import classNames from 'classnames'
import { ACTION_KEY } from '~/constants/general'
import { SaveIcon } from '~/assets/icons'
import { ErrorMessage } from '~/components/ui'
import { useFetcher } from '@remix-run/react'
import { FC } from 'react'

interface ISaveShelfNameProps {
  currentName: string
  id: string
}

export const SaveShelfName: FC<ISaveShelfNameProps> = ({ currentName, id }) => {
  const saveShelfNameFetcher = useFetcher()
  const shelfNameError = saveShelfNameFetcher.data?.errors?.shelfName

  return (
    <saveShelfNameFetcher.Form
      method='post'
      className='mb-2'
    >
      <div className='flex mb-0.5'>
        <input
          type='text'
          defaultValue={currentName}
          name={SHELF_NAME_KEY}
          placeholder='Shelf Name'
          autoComplete='off'
          className={classNames(
            'text-2xl font-extrabold w-full outline-none',
            'border-b-2 border-b-background focus:border-b-primary',
            {
              'border-b-red-600': shelfNameError,
            },
          )}
        />
        <button
          name={ACTION_KEY}
          value={SAVE_SHELF_NAME_ACTION_KEY}
          className='ml-4'
        >
          <SaveIcon />
        </button>
      </div>

      <ErrorMessage>{shelfNameError || saveShelfNameFetcher.data?.errors?.shelfId}</ErrorMessage>
      <input
        type='hidden'
        name={SHELF_ID_KEY}
        value={id}
      />
    </saveShelfNameFetcher.Form>
  )
}
