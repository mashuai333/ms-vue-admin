import { useAppStoreHook } from '@/store/modules/app'

const appStore = useAppStoreHook()

export const usePageLoading = () => {
  const loadStart = () => {
    appStore.setPageLoading(true)
  }

  const loadDone = () => {
    appStore.setPageLoading(false)
  }

  return {
    loadStart,
    loadDone
  }
}
