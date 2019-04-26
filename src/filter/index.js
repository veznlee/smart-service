import { toMoney, dateFormat } from './common.js'

const importFilter = Vue => {
  Vue.filter('toMoney',toMoney);
  Vue.filter('dateFormat',dateFormat);
}
export default importFilter