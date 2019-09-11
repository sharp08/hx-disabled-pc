<template>
  <!-- 康复需求 -->
  <div class="rehabilitation-container">
    <BaseLayout
      :searchObj="searchObj"
      :tableObj="tableObj"
      :toolBarObj="toolBarObj"
      @selectRow="selectRow"
      ref="BaseLayout"
    >
      <template v-slot:tool-bar>
        <!-- 占位 -->
        <div></div>
      </template>
    </BaseLayout>
    <!-- 单一补助项窗口 -->
    <BaseModal
      :modalHeight="winObj.height"
      :modalWidth="winObj.width"
      :title="winObj.render.title"
      @confirm="confirmHandle('form')"
      class="fm-win"
      ref="win"
    >
      <div class="content">
        <Form :label-width="100">
          <FormItem label="康复需求">
            <Select clearable transfer v-model="winObj.model.cureRequire">
              <Option
                :key="idx"
                :value="item.name"
                v-for="(item,idx) in dictObj['DIC_1007']"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否服务">
            <RadioGroup v-model="winObj.model.isService">
              <Radio label="是"></Radio>
              <Radio label="否"></Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="服务内容">
            <Input placeholder="请输入" v-model="winObj.model.serviceContent"></Input>
          </FormItem>
          <FormItem label="服务时间">
            <DatePicker
              :editable="false"
              placeholder="请选择"
              style="width:100%"
              transfer
              type="date"
              v-model="winObj.model.serviceTime"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
    </BaseModal>
    <!-- 确认窗口 -->
    <BaseModal
      :content="confirmWinObj.render.content"
      :title="confirmWinObj.render.title"
      @confirm="confirmWin('confirm')"
      ref="confirmWin"
    ></BaseModal>
    <input @change="upload" hidden name="myfile" ref="file" type="file" />
  </div>
</template>

<script>
import {
  $$postCureList, //  查询列表
  $$postImportCureList, //  导入
  $$getCureWinDetail, // 查询
  $$postCureWinUpdate, //  编辑
  $$getDelCure //  删除
} from "@js/apis.js"
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
      confirmWinObj: {
        type: "",
        render: {},
        vendorList: {
          rehabilitationDel: {
            title: "操作确认",
            content: "是否要删除当前数据？"
          }
        }
      },
      winObj: {
        type: "",
        height: 400,
        width: 500,
        model: {
          cureRequire: "",
          isService: "",
          serviceContent: "",
          serviceTime: ""
        },
        render: {},
        vendorList: {
          add: {
            title: "新增康复需求"
          },
          edit: {
            title: "编辑康复需求"
          }
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
            key: "serviceContent",
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
              this.$refs["file"].click()
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
            minWidth: 100,
            render: tableRender("serviceContent")
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
                        $$getCureWinDetail(params.row.id).then(({ data }) => {
                          this.winObj.model = data
                          this.winObj.type = "edit"
                          this.$refs["win"].showModal = true
                        })
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
                        this.confirmWinObj.type = "rehabilitationDel"
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
        data: [
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
    "winObj.type": {
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
        this.searchObj.list[5].props.list = newVal["DIC_1007"]
      }
    }
  },
  methods: {
    upload(e) {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append("file", file)
      $$postImportCureList(formData)
    },
    // 选中表格一行
    selectRow(cur) {
      console.log(cur)
      this.tableObj.curRow = cur
    },
    confirmHandle(compName) {
      // 编辑窗口
      if (compName === "form") {
        let p = this.winObj.model
        p.serviceTime = $K.fmtDate(p.serviceTime, "yyyy-MM-dd")
        p.idCard = this.tableObj.curRow.idCard
        p.name = this.tableObj.curRow.name
        if (this.winObj.type === "edit") {
          $$postCureWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
    },
    confirmWin() {
      if (this.confirmWinObj.type === "rehabilitationDel") {
        $$getDelCure(this.tableObj.curRow.id).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.$refs["BaseLayout"].refresh()
        })
      }
    }
  }
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
.fm-win {
  .content {
    padding: 10px;
  }
}
</style>
