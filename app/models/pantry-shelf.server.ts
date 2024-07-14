import db from '~/db.server'
import { Prisma } from '@prisma/client'
import { SORT_PARAMS_ENUM } from '~/types/general'

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

export const deleteShelf = async (shelfId: string) => {
  try {
    const deleted = await db.pantryShelf.delete({
      where: {
        id: shelfId,
      },
    })

    return deleted
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return error.message
      }
    }

    throw error
  }
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
