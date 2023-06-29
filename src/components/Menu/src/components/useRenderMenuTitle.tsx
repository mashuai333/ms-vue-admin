import type { RouteMeta } from 'vue-router'
import { useRenderIcon } from '@/components/ReIcon/src/hooks'
import { useI18n } from '@/hooks/web/useI18n'
import { h } from 'vue'
export const useRenderMenuTitle = () => {
  const renderMenuTitle = (meta: RouteMeta) => {
    const { t } = useI18n()
    const { title = 'Please set title', icon } = meta
    return icon ? (
      <>
        {h(useRenderIcon(meta.icon), {
          class: 'mr-[5px] text-base'
        })}
        <span class="v-menu__title">{t(title as string)}</span>
      </>
    ) : (
      <span class="v-menu__title">{t(title as string)}</span>
    )
  }

  return {
    renderMenuTitle
  }
}
