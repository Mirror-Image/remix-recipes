import { useEffect, useState } from 'react'

let hasHydrated = false

export const useGetIsHydrated = () => {
  const [isHydrated, setIsHydrated] = useState(hasHydrated)

  useEffect(() => {
    hasHydrated = true
    setIsHydrated(true)
  }, [])

  return isHydrated
}
