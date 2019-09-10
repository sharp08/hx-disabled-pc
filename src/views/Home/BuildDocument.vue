<template>
  <!-- 建档立卡 -->
  <div class="build-document-container">
    <BaseLayout
      :searchObj="searchObj"
      :tableObj="tableObj"
      :toolBarObj="toolBarObj"
      @selectRow="selectRow"
      ref="BaseLayout"
    ></BaseLayout>
    <BaseModal
      :modalHeight="winObj.render.modalHeight"
      :modalWidth="winObj.render.modalWidth"
      :title="winObj.render.title"
      @confirm="confirmHandle(winObj.name)"
      ref="editWin"
    >
      <component :curRowObj="tableObj.curRow" :is="winObj.name" :type="winObj.type" ref="abc"></component>
    </BaseModal>
    <!-- 操作确认 -->
    <BaseModal
      :content="confirmWinObj.render.content"
      :title="confirmWinObj.render.title"
      @confirm="confirmWin"
      ref="confirmWin"
    ></BaseModal>
  </div>
</template>

<script>
import {
  $$postArchiveList, //  查询档案列表
  $$getArchiveDetail, //  查询档案详情
  $$postArchiveUpdate, //  修改档案
  $$getDelDoc //  删除档案
} from "@js/apis.js"
import { mapGetters, mapMutations } from "vuex"
import DocumentWin from "./DocumentWin"
export default {
  name: "BuildDocument",
  components: {
    DocumentWin
  },
  props: {},
  data() {
    return {
      confirmWinObj: {
        type: "",
        render: {},
        vendorList: {
          documentDel: {
            title: "操作确认",
            content: "是否要删除当前档案？"
          }
        }
      },
      winObj: {
        name: "",
        type: "", //  edit
        render: {},
        vendorList: {
          DocumentWin: { modalHeight: 500, modalWidth: 600, title: "建档立卡" }
        }
      },
      searchObj: {
        ajax: $$postArchiveList,
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          country: "",
          householderName: "",
          outPoorAttr: "",
          poorAttr: "",
          poorReason: ""
        },
        model: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          country: "",
          householderName: "",
          outPoorAttr: "",
          poorAttr: "",
          poorReason: ""
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
            label: "户主",
            span: 4,
            key: "householderName",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "脱贫属性",
            span: 5,
            key: "outPoorAttr",
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
            label: "贫困属性",
            span: 5,
            key: "poorAttr",
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
            label: "致贫原因",
            span: 5,
            key: "poorReason",
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
          {
            label: "档案",
            icon: require("../../assets/images/u7.png"),
            props: { type: "success" },
            // 有档案编辑，没档案弹框确认是否新增
            clickHandle: () => {
              if (Object.keys(this.tableObj.curRow).length > 0) {
                $$getArchiveDetail(this.tableObj.curRow.idCard).then(
                  ({ data }) => {
                    if (data) {
                      this.setDocumentInfo(data)
                      this.winObj.name = "DocumentWin"
                      this.winObj.type = "edit"
                      this.$refs["editWin"].showModal = true
                    }
                  }
                )
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          }
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
        curRow: {},
        height: 200,
        highlightRow: true,
        columns: [
          {
            title: "身份证",
            minWidth: 80,
            fixed: "left",
            align: "center",
            render: tableRender("idCard")
          },
          {
            title: "户号",
            align: "center",
            minWidth: 80,
            render: tableRender("householderId")
          },
          {
            title: "姓名",
            align: "center",
            minWidth: 100,
            render: tableRender("name")
          },
          {
            title: "户主姓名",
            align: "center",
            minWidth: 100,
            render: tableRender("householderName")
          },
          {
            title: "户主身份证",
            align: "center",
            minWidth: 100,
            render: tableRender("householderIdCard")
          },
          {
            title: "脱贫属性",
            align: "center",
            minWidth: 100,
            render: tableRender("outPoorAttr")
          },
          {
            title: "贫困属性",
            align: "center",
            minWidth: 100,
            render: tableRender("poorAttr")
          },
          {
            title: "致贫原因",
            align: "center",
            minWidth: 100,
            render: tableRender("poorReason")
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
                        $$getArchiveDetail(params.row.idCard).then(
                          ({ data }) => {
                            if (data) {
                              this.setDocumentInfo(data)
                              this.winObj.name = "DocumentWin"
                              this.winObj.type = "edit"
                              this.$refs["editWin"].showModal = true
                            }
                          }
                        )
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
                        this.confirmWinObj.type = "documentDel"
                        this.$refs["confirmWin"].showModal = true
                      }
                    }
                  },
                  "删除"
                )
              ]
            }
          }
        ],
        data: []
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
    "tableObj.data": {
      handler() {
        this.tableObj.curRow = {}
      }
    },
    "confirmWinObj.type": {
      handler(type) {
        this.confirmWinObj.render = this.confirmWinObj.vendorList[type]
      }
    },
    dictObj: {
      immediate: true,
      handler(newVal) {
        this.searchObj.list[2].props.list = newVal["DIC_1000"]
        this.searchObj.list[3].props.list = newVal["DIC_1001"]
        this.searchObj.list[4].props.list = newVal["DIC_1008"]
        this.searchObj.list[6].props.list = newVal["DIC_1003"]
        this.searchObj.list[7].props.list = newVal["DIC_1004"]
        this.searchObj.list[8].props.list = newVal["DIC_1005"]
      }
    }
  },
  methods: {
    ...mapMutations(["setDocumentInfo"]),
    // 选中表格一行
    selectRow(cur) {
      console.log(cur)
      this.tableObj.curRow = cur
    },
    confirmHandle(compName) {
      // 档案窗口
      if (compName === "DocumentWin") {
        let p = this.$refs["abc"].modelFmt
        if (this.winObj.type === "edit") {
          $$postArchiveUpdate(p).then(res => {
            this.$refs["editWin"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
    },
    confirmWin() {
      if (this.confirmWinObj.type === "documentDel") {
        $$getDelDoc(this.tableObj.curRow.id).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.$refs["BaseLayout"].refresh()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.build-document-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
}
</style>
