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
    window.tableRender = (key, fn) => {
      return function (h, params) {
        let str = fn ? fn(params.row[key]) : params.row[key]
        return h("span", {
          style: {
            overflow: "hidden",
            "text-overflow": "ellipsis",
            "white-space": "nowrap"
          },
          attrs: {
            title: str
          }
        }, str)
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