import { Button } from '~/components/ui'
import classNames from 'classnames'
import { PlusIcon } from '~/assets/icons'
import { useFetcher } from '@remix-run/react'
import { CREATE_SHELF_ACTION_KEY } from '~/routes/book/constants'
import { ACTION_KEY } from '~/constants/general'

export const CreateShelf = () => {
  const createShelfFetcher = useFetcher()

  const isCreatingShelf = createShelfFetcher.formData?.get(ACTION_KEY) === CREATE_SHELF_ACTION_KEY

  return (
    <createShelfFetcher.Form method='post'>
      <Button
        variant='primary'
        name={ACTION_KEY}
        value={CREATE_SHELF_ACTION_KEY}
        isLoading={isCreatingShelf}
        className={classNames('mt-4 w-full md:w-fit')}
      >
        <PlusIcon />
        <span className='pl-2'>{isCreatingShelf ? 'Creating Shelf' : 'Create Shelf'}</span>
      </Button>
    </createShelfFetcher.Form>
  )
}
