<template>
  <!-- 康复需求 -->
  <div class="rehabilitation-container">
    <BaseLayout
      :searchObj="searchObj"
      :tableObj="tableObj"
      :toolBarObj="toolBarObj"
      ref="BaseLayout"
    >
      <template v-slot:tool-bar>
        <!-- 占位 -->
        <div></div>
      </template>
    </BaseLayout>
    <BaseModal
      :modalHeight="winObj.render.modalHeight"
      :modalWidth="winObj.render.modalWidth"
      :title="winObj.render.title"
      ref="editWin"
    >
      <component :is="winObj.name"></component>
    </BaseModal>
  </div>
</template>

<script>
import { $$postCureList } from "@js/apis.js"
import { mapGetters } from "vuex"
import DocumentWin from "./DocumentWin"
export default {
  name: "Rehabilitation",
  components: {
    DocumentWin
  },
  props: {},
  data() {
    return {
      winObj: {
        name: "",
        render: {},
        vendorList: {
          DocumentWin: { modalHeight: 500, modalWidth: 600, title: "建档立卡" }
        }
      },
      searchObj: {
        ajax: $$postCureList,
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          cureRequire: "",
          isService: "",
          serviceTimeYear: ""
        },
        model: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          cureRequire: "",
          isService: "",
          serviceTimeYear: ""
        },
        globalLabelWidth: 60,
        list: [
          {
            label: "姓名",
            span: 4,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "身份证",
            span: 5,
            key: "idCard",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "残疾类型",
            span: 5,
            key: "disabledType",
            type: "select",
            showKey: "name",
            ajaxKey: "name",
            props: {
              placeholder: "请选择",
              list: [
                {
                  id: 0,
                  name: "车道乡"
                },
                {
                  id: 1,
                  name: "乡道车"
                }
              ]
            }
          },
          {
            label: "残疾等级",
            span: 5,
            key: "disabledLevel",
            type: "select",
            showKey: "name",
            ajaxKey: "name",
            props: {
              placeholder: "请选择",
              list: [
                {
                  id: 0,
                  name: "车道乡"
                },
                {
                  id: 1,
                  name: "乡道车"
                }
              ]
            }
          },
          {
            label: "乡镇",
            span: 5,
            key: "town",
            type: "select",
            showKey: "name",
            ajaxKey: "name",
            props: {
              placeholder: "请选择",
              list: [
                {
                  id: 0,
                  name: "车道乡"
                },
                {
                  id: 1,
                  name: "乡道车"
                }
              ]
            }
          },
          {
            label: "康复需求",
            span: 4,
            key: "cureRequire",
            type: "select",
            showKey: "name",
            ajaxKey: "name",
            props: {
              placeholder: "请选择",
              list: [
                {
                  id: 0,
                  name: "车道乡"
                },
                {
                  id: 1,
                  name: "乡道车"
                }
              ]
            }
          },
          {
            label: "服务内容",
            span: 5,
            key: "isService",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "服务年度",
            span: 5,
            key: "serviceTimeYear",
            type: "datepicker",
            props: { placeholder: "请选择", type: "year" }
          },
          {
            span: 5,
            type: "button",
            list: [
              {
                type: "defaultSearch"
              },
              {
                type: "defaultReset"
              }
            ]
          }
        ]
      },
      toolBarObj: {
        leftList: [
          // {
          //   label: "档案",
          //   icon: require("../../assets/images/u7.png"),
          //   props: { type: "success" },
          //   clickHandle: () => {
          //     this.winObj.name = "DocumentWin"
          //     this.$refs["editWin"].showModal = true
          //   }
          // }
        ],
        rightList: [
          {
            label: "导入",
            icon: require("../../assets/images/u9.png"),
            props: { type: "success" },
            clickHandle: () => {
              alert("右右右")
            }
          },
          {
            label: "导出",
            icon: require("../../assets/images/u8.png"),
            props: { type: "primary" },
            clickHandle: () => {
              alert("右右右")
            }
          },
          {
            label: "刷新",
            icon: require("../../assets/images/u10.png"),
            props: { type: "primary" },
            clickHandle: () => {
              this.$refs["BaseLayout"].refresh()
            }
          }
        ]
      },
      tableObj: {
        height: 200,
        columns: [
          {
            title: "序号",
            type: "index",
            fixed: "left",
            align: "center",
            minWidth: 60
          },
          {
            title: "姓名",
            align: "center",
            minWidth: 80,
            render: tableRender("name")
          },
          {
            title: "身份证",
            minWidth: 80,
            align: "center",
            render: tableRender("idCard")
          },
          {
            title: "康复需求",
            align: "center",
            minWidth: 100,
            render: tableRender("cureRequire")
          },
          {
            title: "是否服务",
            align: "center",
            minWidth: 100,
            render: tableRender("isService")
          },
          {
            title: "服务内容",
            align: "center",
            minWidth: 100
          },
          {
            title: "服务时间",
            align: "center",
            minWidth: 100,
            render: tableRender("serviceTime")
          },
          {
            title: "残疾类别",
            align: "center",
            minWidth: 100,
            render: tableRender("disabledType")
          },
          {
            title: "残疾等级",
            align: "center",
            minWidth: 100,
            render: tableRender("disabledLevel")
          },
          {
            title: "家庭住址",
            align: "center",
            minWidth: 100,
            render: tableRender("address")
          },
          {
            title: "联系电话",
            align: "center",
            minWidth: 100,
            render: tableRender("telephone")
          },
          {
            title: "乡镇",
            align: "center",
            minWidth: 100,
            render: tableRender("town")
          },
          {
            title: "操作",
            align: "center",
            minWidth: 140,
            render: (h, params) => {
              return [
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      "margin-right": "5px"
                    },
                    on: {
                      click: () => {
                        alert("点击编辑")
                      }
                    }
                  },
                  "编辑"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        alert("点击删除")
                      }
                    }
                  },
                  "删除"
                )
              ]
            }
          }
        ],
        data: [
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          },
          {
            name: "文本文本",
            input: "123123",
            select: "0"
          }
        ]
      }
    }
  },
  mounted() {
    let a = document.querySelector(".combination-container").clientHeight
    let b = document.querySelector(".tool-bar-container").clientHeight
    let c = document.querySelector(".page-container").clientHeight
    this.tableObj.height = a - b - c
  },
  computed: {
    ...mapGetters(["dictObj"])
  },
  watch: {
    "winObj.name": {
      handler(newVal) {
        this.winObj.render = this.winObj.vendorList[newVal]
      }
    },
    dictObj: {
      immediate: true,
      handler(newVal) {
        this.searchObj.list[2].props.list = newVal["DIC_1000"]
        this.searchObj.list[3].props.list = newVal["DIC_1001"]
        this.searchObj.list[4].props.list = newVal["DIC_1008"]
        this.searchObj.list[5].props.list = newVal["DIC_1007"]
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.rehabilitation-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  .total-container {
    display: flex;
    align-items: center;
  }
}
</style>
