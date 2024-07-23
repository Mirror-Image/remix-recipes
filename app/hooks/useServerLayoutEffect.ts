import { getIsRunningOnServer } from '~/utils'
import { useEffect, useLayoutEffect } from 'react'

export const useServerLayoutEffect = getIsRunningOnServer() ? useEffect : useLayoutEffect
