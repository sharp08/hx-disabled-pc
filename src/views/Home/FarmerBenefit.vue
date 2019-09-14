<template>
  <!-- 惠农补助 -->
  <div class="farmer-benefit-container">
    <BaseLayout
      :searchObj="searchObj"
      :tableObj="tableObj"
      :toolBarObj="toolBarObj"
      @selectRow="selectRow"
      ref="BaseLayout"
    >
      <template v-slot:tool-bar>
        <div class="total-container">
          <div>合计金额：{{pageTotal}}元</div>
        </div>
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
          <FormItem label="补助项目">
            <Select clearable transfer v-model="winObj.model.subsidyItem">
              <Option
                :key="idx"
                :value="item.name"
                v-for="(item,idx) in dictObj['DIC_1011']"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="补助标准">
            <Input placeholder="请输入" v-model="winObj.model.subsidyStandard"></Input>
          </FormItem>
          <FormItem label="享受年度">
            <DatePicker
              :editable="false"
              placeholder="请选择"
              style="width:100%"
              transfer
              type="year"
              v-model="winObj.model.subsidyYear"
            ></DatePicker>
          </FormItem>
          <FormItem label="发放时间">
            <DatePicker
              :editable="false"
              placeholder="请选择"
              style="width:100%"
              transfer
              type="date"
              v-model="winObj.model.subsidyTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="一折通姓名">
            <Input placeholder="请输入" v-model="winObj.model.cardName"></Input>
          </FormItem>
          <FormItem label="一折通账号">
            <Input placeholder="请输入" v-model="winObj.model.cardNumber"></Input>
          </FormItem>
        </Form>
      </div>
    </BaseModal>

    <!-- 操作确认 -->
    <BaseModal
      :content="confirmWinObj.render.content"
      :title="confirmWinObj.render.title"
      @confirm="confirmWin"
      ref="confirmWin"
    ></BaseModal>
    <input @change="upload" hidden name="myfile" ref="file" type="file" />
  </div>
</template>

<script>
import {
  $$postAllowanceList, // 查询列表
  $$postImportAllowanceList, //  导入
  $$postExportAllowanceList, //  导出
  $$getFarmerWinDetail, // 查询
  $$postFarmerWinUpdate, //  编辑
  $$getDelAllowance //  删除
} from "@js/apis.js"
import { mapGetters } from "vuex"
import DocumentWin from "./DocumentWin"
export default {
  name: "FarmerBenefit",
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
          allowanceDel: {
            title: "操作确认",
            content: "是否要删除当前补助项？"
          }
        }
      },
      winObj: {
        type: "",
        height: 500,
        width: 500,
        model: {
          subsidyItem: "",
          subsidyStandard: "",
          subsidyTime: "",
          subsidyYear: "",
          cardName: "",
          cardNumber: ""
        },
        render: {},
        vendorList: {
          edit: {
            title: "编辑补助项目"
          }
        }
      },
      searchObj: {
        ajax: $$postAllowanceList,
        paramsFmt: p => {
          let r = $K.deepClone(p)
          r.query.subsidyYear = $K.fmtDate(p.query.subsidyYear, "yyyy")
          return r
        },
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          subsidyItem: "",
          subsidyYear: ""
        },
        model: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          subsidyItem: "",
          subsidyYear: ""
        },
        globalLabelWidth: 60,
        list: [
          {
            label: "姓名",
            span: 4,
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
            label: "补助项目",
            span: 4,
            key: "subsidyItem",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "年度",
            span: 5,
            key: "subsidyYear",
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
              let p = this.searchObj.paramsFmt(
                this.$refs["BaseLayout"].curReqParams
              )
              $$postExportAllowanceList(p).then(res => {
                $K.download(res)
              })
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
            align: "center",
            fixed: "left",
            render: tableRender("idCard")
          },
          {
            title: "项目",
            align: "center",
            minWidth: 100,
            render: tableRender("subsidyItem")
          },
          {
            title: "补助标准",
            align: "center",
            minWidth: 100,
            render: tableRender("subsidyStandard")
          },
          {
            title: "享受年度",
            align: "center",
            minWidth: 100,
            render: tableRender("subsidyYear")
          },
          {
            title: "发放时间",
            align: "center",
            minWidth: 100,
            render: tableRender("subsidyTime")
          },
          {
            title: "一折通姓名",
            align: "center",
            minWidth: 100,
            render: tableRender("cardName")
          },
          {
            title: "一折通账号",
            align: "center",
            minWidth: 100,
            render: tableRender("cardNumber")
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
                        $$getFarmerWinDetail(params.row.id).then(({ data }) => {
                          this.winObj.model = data
                          this.winObj.model.subsidyYear = data.subsidyYear.toString()
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
                        this.confirmWinObj.type = "allowanceDel"
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
    ...mapGetters(["dictObj"]),
    pageTotal() {
      return this.tableObj.data.reduce((acc, cur) => {
        return acc + cur.subsidyStandard
      }, 0)
    }
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
      }
    }
  },
  methods: {
    upload(e) {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append("file", file)
      $$postImportAllowanceList(formData)
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
        p.subsidyYear = $K.fmtDate(p.subsidyYear, "yyyy")
        p.subsidyTime = $K.fmtDate(p.subsidyTime, "yyyy-MM-dd")
        p.idCard = this.tableObj.curRow.idCard
        p.name = this.tableObj.curRow.name
        if (this.winObj.type === "edit") {
          $$postFarmerWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
    },
    confirmWin() {
      if (this.confirmWinObj.type === "allowanceDel") {
        $$getDelAllowance(this.tableObj.curRow.id).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.$refs["BaseLayout"].refresh()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.farmer-benefit-container {
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
