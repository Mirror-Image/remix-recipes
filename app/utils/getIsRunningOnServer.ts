export const getIsRunningOnServer = () => {
  return typeof window === 'undefined'
}
