import db from '~/db.server'

export function getAllShelves(query: string | null) {
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
          name: 'asc',
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export function createShelf(data: { name: string }) {
  return db.pantryShelf.create({
    data,
  })
}

export function deleteShelf(shelfId: string) {
  return db.pantryShelf.delete({
    where: {
      id: shelfId,
    },
  })
}
