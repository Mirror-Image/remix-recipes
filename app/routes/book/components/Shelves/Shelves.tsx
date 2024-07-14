import { useLoaderData } from '@remix-run/react'
import { loader } from '~/routes/book/pantry'
import { Shelf } from './components'
import classNames from 'classnames'

export const Shelves = () => {
  const data = useLoaderData<typeof loader>()

  return (
    <ul
      className={classNames(
        'flex gap-8 overflow-x-auto mt-4 pb-4',
        'snap-x snap-mandatory md:snap-none',
      )}
    >
      {data.shelves.map(({ id, name, items }) => (
        <Shelf
          key={id}
          name={name}
          items={items}
          id={id}
        />
      ))}
    </ul>
  )
}
