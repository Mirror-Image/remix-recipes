import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useServerLayoutEffect } from '~/hooks'

interface IRenderItem {
  name: string
  id: string
  isOptimistic?: boolean
}

interface IUseOptimisticItems {
  savedItems: IRenderItem[]
}

export const useOptimisticItems = ({ savedItems }: IUseOptimisticItems) => {
  const [optimisticItems, setOptimisticItems] = useState<IRenderItem[]>([])

  const renderedItems = [...optimisticItems, ...savedItems]

  renderedItems.sort((a, b) => {
    if (a.name === b.name) return 0

    return a.name < b.name ? -1 : 1
  })

  useServerLayoutEffect(() => {
    setOptimisticItems([])
  }, [savedItems])

  const addItem = (name: string) => {
    setOptimisticItems((items) => [
      ...items, { name, id: uuidv4(), isOptimistic: true }
    ])
  }


  return { renderedItems, addItem }
}
