import { SAVE_SHELF_NAME_ACTION_KEY, SHELF_ID_KEY, SHELF_NAME_KEY } from '~/routes/book/constants'
import classNames from 'classnames'
import { ACTION_KEY } from '~/constants/general'
import { SaveIcon } from '~/assets/icons'
import { ErrorMessage } from '~/components/ui'
import { useFetcher } from '@remix-run/react'
import { FC } from 'react'
import { useGetIsHydrated } from '~/hooks'

interface ISaveShelfNameProps {
  currentName: string
  id: string
}

export const SaveShelfName: FC<ISaveShelfNameProps> = ({ currentName, id }) => {
  const saveShelfNameFetcher = useFetcher()
  const shelfNameError = saveShelfNameFetcher.data?.errors?.shelfName

  const isHydrated = useGetIsHydrated()

  return (
    <saveShelfNameFetcher.Form
      method='post'
      className='mb-2'
    >
      <div className='flex mb-0.5 group'>
        <input
          type='text'
          defaultValue={currentName}
          name={SHELF_NAME_KEY}
          placeholder='Shelf Name'
          autoComplete='off'
          onChange={(event) => {
            const value = event.target.value

            if (value !== '') {
              return saveShelfNameFetcher.submit({
                _action: SAVE_SHELF_NAME_ACTION_KEY,
                shelfName: value,
                shelfId: id,
              }, { method: 'post' })
            }
          }}
          className={classNames(
            'text-2xl font-extrabold w-full outline-none',
            'border-b-2 border-b-background focus:border-b-primary',
            {
              'border-b-red-600': shelfNameError,
            },
          )}
          required
        />
        {!isHydrated && (
          <button
            name={ACTION_KEY}
            value={SAVE_SHELF_NAME_ACTION_KEY}
            className={classNames(
              'ml-4 opacity-0 hover:opacity-100 focus:opacity-100', 'group-focus-within:opacity-100'
            )}
          >
            <SaveIcon />
          </button>
        )}
      </div>
      <ErrorMessage>{shelfNameError || saveShelfNameFetcher.data?.errors?.shelfId}</ErrorMessage>
      <input
        type="hidden"
        name={SHELF_ID_KEY}
        value={id}
      />
    </saveShelfNameFetcher.Form>
  )
}
