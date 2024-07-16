import db from '~/db.server'
import { SORT_PARAMS_ENUM } from '~/types/general'
import { handleDelete } from '~/utils/model'

export const getAllShelves = (query: string | null) => {
  return db.pantryShelf.findMany({
    where: {
      name: {
        contains: query ?? '',
        mode: 'insensitive',
      },
    },
    include: {
      items: {
        orderBy: {
          name: SORT_PARAMS_ENUM.ASC,
        },
      },
    },
    orderBy: {
      createdAt: SORT_PARAMS_ENUM.DESC,
    },
  })
}

export const createShelf = (data: { name: string }) => {
  return db.pantryShelf.create({
    data,
  })
}

export const deleteShelf = (shelfId: string) => {
  return handleDelete(() =>
    db.pantryShelf.delete({
      where: {
        id: shelfId,
      },
    }),
  )
}

export const saveShelfName = (shelfId: string, shelfName: string) => {
  return db.pantryShelf.update({
    where: {
      id: shelfId,
    },
    data: {
      name: shelfName,
    },
  })
}
