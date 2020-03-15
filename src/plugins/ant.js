import Vue from 'vue'
import {
  AutoComplete,
  Avatar,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Layout,
  message,
  Menu,
  Modal,
  Pagination,
  Popconfirm,
  Popover,
  Row,
  Spin,
  TreeSelect,
  Tabs,
  Tooltip,
  LocaleProvider,
  ConfigProvider
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$destroyAll = Modal.destroyAll

Vue.use(AutoComplete)
Vue.use(Avatar)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Divider)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Input)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Row)
Vue.use(Spin)
Vue.use(TreeSelect)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(LocaleProvider)
Vue.use(ConfigProvider)
