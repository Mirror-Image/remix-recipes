import { Button } from '~/components/ui'
import classNames from 'classnames'
import { PlusIcon } from '~/assets/icons'
import { Form, useNavigation } from '@remix-run/react'

export const CreateShelf = () => {
  const navigation = useNavigation()

  const isCreatingShelf = navigation.formData?.get('_action') === 'createShelf'

  return (
    <Form method='post'>
      <Button
        variant='primary'
        name='_action'
        value='createShelf'
        isLoading={isCreatingShelf}
        className={classNames('mt-4 w-full md:w-fit')}
      >
        <PlusIcon />
        <span className='pl-2'>{isCreatingShelf ? 'Creating Shelf' : 'Create Shelf'}</span>
      </Button>
    </Form>
  )
}
