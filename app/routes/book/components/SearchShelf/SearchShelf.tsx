import classNames from 'classnames'
import { SearchIcon } from '~/assets/icons'
import { Form, useNavigation, useSearchParams } from '@remix-run/react'

export const SearchShelf = () => {
  const [searchParams] = useSearchParams()
  const navigation = useNavigation()

  const isSearching = navigation.formData?.has('q')

  return (
    <Form
      className={classNames(
        'flex border-2 border-gray-300 rounded-md',
        'focus-within:border-primary md:w-80',
        {
          'animate-pulse': isSearching,
        },
      )}
    >
      <button
        type='submit'
        className='px-2 mr-1'
      >
        <SearchIcon />
      </button>
      <input
        type='text'
        name='q'
        defaultValue={searchParams.get('q') ?? ''}
        autoComplete='off'
        placeholder='Search Shelves...'
        className='w-full py-3 px-2 outline-none'
      />
    </Form>
  )
}
