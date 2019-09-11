<template>
  <!-- 就业培训 -->
  <div class="disabled-student-container">
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
    <!-- 单一培训窗口 -->
    <BaseModal
      :modalHeight="winObj.height"
      :modalWidth="winObj.width"
      :title="winObj.render.title"
      @confirm="confirmHandle('form')"
      class="employ-win"
      ref="win"
    >
      <div class="content">
        <Form :label-width="100" :model="winObj.model">
          <FormItem label="培训时间">
            <DatePicker
              :editable="false"
              placeholder="请选择"
              style="width:100%"
              transfer
              type="date"
              v-model="winObj.model.trainTime"
            ></DatePicker>
          </FormItem>
          <FormItem label="培训类型">
            <Select clearable transfer v-model="winObj.model.trainType">
              <Option
                :key="idx"
                :value="item.name"
                v-for="(item,idx) in dictObj['DIC_1010']"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="培训内容">
            <Input type="textarea" v-model="winObj.model.trainContent"></Input>
          </FormItem>
        </Form>
      </div>
    </BaseModal>
    <!-- 确认窗口 -->
    <BaseModal
      :content="confirmWinObj.render.content"
      :title="confirmWinObj.render.title"
      @confirm="confirmHandle('confirm')"
      ref="confirmWin"
    ></BaseModal>
    <input @change="upload" hidden name="myfile" ref="file" type="file" />
  </div>
</template>

<script>
import {
  $$postTrainList, //列表
  $$postImportTrainList, //  导入
  $$getTrainDetail, //  查询单一培训详情
  $$postUpdateTrain, //  修改就业
  $$getDelTrain //  删除就业
} from "@js/apis.js"
import { mapGetters } from "vuex"
import DocumentWin from "./DocumentWin"
export default {
  name: "EmploymentTraining",
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
          trainDel: {
            title: "操作确认",
            content: "是否要删除该项数据？"
          }
        }
      },
      winObj: {
        type: "",
        height: 300,
        width: 500,
        model: {
          trainTime: "",
          trainType: "",
          trainContent: ""
        },
        render: {},
        vendorList: {
          edit: {
            title: "编辑就业培训"
          }
        }
      },
      searchObj: {
        ajax: $$postTrainList,
        paramsFmt: p => {
          let r = $K.deepClone(p)
          r.query.trainTimeYear = $K.fmtDate(p.query.trainTimeYear, "yyyy")
          return r
        },
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          trainType: "",
          trainTimeYear: ""
        },
        model: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          trainType: "",
          trainTimeYear: ""
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
            label: "培训类别",
            span: 4,
            key: "trainType",
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
            label: "培训年度",
            span: 5,
            key: "trainTimeYear",
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
          // {
          //   title: "序号",
          //   type: "index",
          //   fixed: "left",
          //   align: "center",
          //   minWidth: 60
          // },
          {
            title: "身份证",
            minWidth: 80,
            fixed: "left",
            align: "center",
            render: tableRender("idCard")
          },
          {
            title: "姓名",
            align: "center",
            minWidth: 80,
            render: tableRender("name")
          },
          {
            title: "培训类别",
            align: "center",
            minWidth: 100,
            render: tableRender("trainType")
          },
          {
            title: "培训内容",
            align: "center",
            minWidth: 100,
            render: tableRender("trainContent")
          },
          {
            title: "培训年度",
            align: "center",
            minWidth: 100,
            render: tableRender("trainTimeYear")
          },
          {
            title: "培训时间",
            align: "center",
            minWidth: 100,
            render: tableRender("trainTime")
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
                        $$getTrainDetail(params.row.id).then(({ data }) => {
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
                        this.confirmWinObj.type = "trainDel"
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
    "winObj.type": {
      handler(newVal) {
        this.winObj.render = this.winObj.vendorList[newVal]
      }
    },
    "confirmWinObj.type": {
      handler(newVal) {
        this.confirmWinObj.render = this.confirmWinObj.vendorList[newVal]
      }
    },
    dictObj: {
      immediate: true,
      handler(newVal) {
        this.searchObj.list[2].props.list = newVal["DIC_1000"]
        this.searchObj.list[3].props.list = newVal["DIC_1001"]
        this.searchObj.list[4].props.list = newVal["DIC_1008"]
        this.searchObj.list[5].props.list = newVal["DIC_1010"]
      }
    }
  },
  methods: {
    upload(e) {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append("file", file)
      $$postImportTrainList(formData)
    },
    // 选中表格一行
    selectRow(cur) {
      console.log(cur)
      this.tableObj.curRow = cur
    },
    // 窗口确认
    confirmHandle(type) {
      // 表单窗口
      if (type === "form") {
        let p = this.winObj.model
        p.trainTime = $K.fmtDate(p.trainTime)
        p.idCard = this.tableObj.curRow.idCard
        p.name = this.tableObj.curRow.name
        if (this.winObj.type === "edit") {
          $$postUpdateTrain(p).then(res => {
            this.$refs["win"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getDelTrain(this.tableObj.curRow.id).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.$refs["BaseLayout"].refresh()
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.disabled-student-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  .total-container {
    display: flex;
    align-items: center;
  }
}
.employ-win {
  .content {
    padding: 10px;
  }
}
</style>
