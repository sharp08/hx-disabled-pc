<template>
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
    <BaseModal
      :modalHeight="winObj.height"
      :modalWidth="winObj.width"
      :title="winObj.render.title"
      @confirm="confirmHandle('form')"
      class="st-win"
      ref="win"
    >
      <div class="content">
        <Form :label-width="100" :model="winObj.model">
          <FormItem label="教育阶段">
            <Select clearable transfer v-model="winObj.model.eduLevel">
              <Option
                :key="idx"
                :value="item.name"
                v-for="(item,idx) in dictObj['DIC_1006']"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="学校">
            <Input clearable placeholder="请输入" v-model="winObj.model.eduSchool"></Input>
          </FormItem>
          <FormItem label="年级">
            <Input clearable placeholder="请输入" v-model="winObj.model.eduAge"></Input>
          </FormItem>
          <FormItem label="专业">
            <Input clearable placeholder="请输入" v-model="winObj.model.eduClass"></Input>
          </FormItem>
          <FormItem label="是否辍学">
            <RadioGroup v-model="winObj.model.eduDrop">
              <Radio label="是">是</Radio>
              <Radio label="否">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="辍学原因">
            <Input placeholder="请输入" type="textarea" v-model="winObj.model.eduDropReason"></Input>
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
  </div>
</template>

<script>
import {
  $$postStudentList, //列表
  $$getStudentWinDetail, //详情
  $$postStudentWinUpdate, //修改
  $$getStudentWinDel //  删除
} from "@js/apis.js"
import { mapGetters } from "vuex"
import DocumentWin from "./DocumentWin"
export default {
  name: "DisabledStudent",
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
          eduDel: {
            title: "操作确认",
            content: "是否要删除当前数据？"
          }
        }
      },
      winObj: {
        type: "",
        height: 500,
        width: 500,
        model: {
          eduLevel: "",
          eduSchool: "",
          eduAge: "",
          eduClass: "",
          eduDrop: "",
          eduDropReason: ""
        },
        render: {},
        vendorList: {
          add: {
            title: "新增教育阶段"
          },
          edit: {
            title: "编辑教育阶段"
          }
        }
      },
      searchObj: {
        ajax: $$postStudentList,
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          eduLevel: "",
          eduDrop: ""
        },
        model: {
          name: "",
          idCard: "",
          disabledType: "",
          disabledLevel: "",
          town: "",
          eduLevel: "",
          eduDrop: ""
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
            label: "教育阶段",
            span: 4,
            key: "eduLevel",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "是否辍学",
            span: 5,
            key: "eduDrop",
            type: "select",
            showKey: "name",
            ajaxKey: "id",
            props: {
              placeholder: "请选择",
              list: [
                {
                  id: 0,
                  name: "是"
                },
                {
                  id: 1,
                  name: "否"
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
        curRow: {},
        height: 200,
        highlightRow: true,
        columns: [
          {
            title: "身份证",
            key: "name",
            fixed: "left",
            minWidth: 80,
            render: tableRender("idCard")
          },
          {
            title: "姓名",
            align: "center",
            minWidth: 80,
            render: tableRender("name")
          },
          {
            title: "教育阶段",
            align: "center",
            minWidth: 100,
            render: tableRender("eduLevel")
          },
          {
            title: "就读学校",
            align: "center",
            minWidth: 100,
            render: tableRender("eduSchool")
          },
          {
            title: "就读年级",
            align: "center",
            minWidth: 100,
            render: tableRender("eduAge")
          },
          {
            title: "就读专业",
            align: "center",
            minWidth: 100,
            render: tableRender("eduClass")
          },
          {
            title: "是否辍学",
            align: "center",
            minWidth: 100,
            render: tableRender("eduDrop")
          },
          {
            title: "辍学原因",
            align: "center",
            minWidth: 100,
            render: tableRender("eduDropReason")
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
                        $$getStudentWinDetail(params.row.id).then(
                          ({ data }) => {
                            this.winObj.model = data
                            this.winObj.type = "edit"
                            this.$refs["win"].showModal = true
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
                        this.confirmWinObj.type = "eduDel"
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
    "tableObj.data": {
      handler() {
        this.tableObj.curRow = {}
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
      }
    }
  },
  methods: {
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
        p.idCard = this.tableObj.curRow.idCard
        p.name = this.tableObj.curRow.name
        if (this.winObj.type === "edit") {
          $$postStudentWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getStudentWinDel(this.tableObj.curRow.id).then(res => {
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
.st-win {
  .content {
    padding: 10px;
  }
}
</style>
