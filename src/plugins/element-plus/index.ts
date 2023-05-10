import { App, Component } from 'vue'
import {
  ElButton,
  ElCalendar,
  ElCascader,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElConfigProvider,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopper,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubMenu,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTimePicker,
  ElTimeSelect,
  ElTooltip,
  ElTree,
  ElTreeV2,
  ElTreeSelect,
  ElUpload,
  ElSelectV2,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRadioGroup,
  ElRadioButton,
  // 指令
  ElLoading,
  ElInfiniteScroll
} from 'element-plus'

// Directives
const plugins = [ElLoading, ElInfiniteScroll]

const components = [
  ElButton,
  ElCalendar,
  ElCascader,
  ElCheckbox,
  ElCol,
  ElContainer,
  ElConfigProvider,
  ElDatePicker,
  ElDialog,
  ElDivider,
  ElDropdown,
  ElDropdownItem,
  ElDropdownMenu,
  ElEmpty,
  ElFooter,
  ElForm,
  ElFormItem,
  ElHeader,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElMenuItemGroup,
  ElOption,
  ElOptionGroup,
  ElPageHeader,
  ElPagination,
  ElPopconfirm,
  ElPopper,
  ElPopover,
  ElRadio,
  ElRow,
  ElScrollbar,
  ElSelect,
  ElSubMenu,
  ElSwitch,
  ElTabPane,
  ElTable,
  ElTableColumn,
  ElTabs,
  ElTimePicker,
  ElTimeSelect,
  ElTooltip,
  ElTree,
  ElTreeV2,
  ElTreeSelect,
  ElUpload,
  ElSelectV2,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElRadioGroup,
  ElRadioButton
]

export function useElementPlus(app: App) {
  // 注册组件
  components.forEach((component: Component) => {
    app.component(component.name, component)
  })
  // 注册指令
  plugins.forEach(plugin => {
    app.use(plugin)
  })
}
