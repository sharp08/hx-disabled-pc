import BaseLayout from "@coms/BaseLayout"
import BaseModal from "@coms/BaseModal"

let coms = [
  { name: "BaseLayout", component: BaseLayout },
  { name: "BaseModal", component: BaseModal },
]

export default {
  install: (Vue, options) => {
    coms.forEach(item => {
      Vue.component(item.name, item.component)
    })
    window.__LOADING__ = bool => {
      if (bool) {
        Vue.prototype.$Spin.show()
      } else {
        Vue.prototype.$Spin.hide()
      }
    }

    Vue.prototype.$Message.config({});

    ["info", "success", "warning", "error"].forEach(item => {
      window[`__${item.toUpperCase()}__`] = msg => {
        Vue.prototype.$Message.destroy()
        Vue.prototype.$Message[item](msg)
      }
    })
  }
}