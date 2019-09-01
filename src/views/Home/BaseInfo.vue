<template>
  <!-- 基本信息 -->
  <div class="base-info-container">
    <!-- <BaseLayout></BaseLayout> -->
    <BaseLayout :searchObj="searchObj" :tableObj="tableObj" :toolBarObj="toolBarObj"></BaseLayout>
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
import BaseLayout from "@/components/BaseLayout"
import BaseModal from "@/components/BaseModal"
import DocumentWin from "./DocumentWin"
import EmploymentWin from "./EmploymentWin"
import StudentWin from "./StudentWin"
import FarmerWin from "./FarmerWin"
export default {
  name: "BaseInfo",
  components: {
    BaseLayout,
    BaseModal,
    DocumentWin,
    EmploymentWin,
    StudentWin,
    FarmerWin
  },
  props: {},
  data() {
    return {
      winObj: {
        name: "",
        render: {},
        vendorList: {
          DocumentWin: { modalHeight: 500, modalWidth: 600, title: "建档立卡" },
          EmploymentWin: {
            modalHeight: 500,
            modalWidth: 800,
            title: "就业培训"
          },
          StudentWin: {
            modalHeight: 500,
            modalWidth: 800,
            title: "残疾学生"
          },
          FarmerWin: {
            modalHeight: 500,
            modalWidth: 800,
            title: "惠农补助"
          }
        }
      },
      searchObj: {
        gutter: 10,
        model: {
          name: "张四",
          gender: 0,
          time: new Date()
        },
        globalLabelWidth: 60,
        list: [
          {
            label: "姓名",
            span: 6,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "身份证",
            span: 6,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "出生日期",
            span: 6,
            key: "time",
            type: "datepicker",
            props: { placeholder: "时间" }
          },
          {
            label: "乡镇",
            span: 6,
            key: "gender",
            type: "select",
            showKey: "name",
            ajaxKey: "id",
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
            label: "户口类型",
            span: 6,
            key: "gender",
            type: "select",
            showKey: "name",
            ajaxKey: "id",
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
            label: "残疾类型",
            span: 6,
            key: "gender",
            type: "select",
            showKey: "name",
            ajaxKey: "id",
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
            span: 6,
            key: "gender",
            type: "select",
            showKey: "name",
            ajaxKey: "id",
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
            span: 6,
            type: "button",
            list: [
              { label: "查询", props: { type: "primary" } },
              { label: "重置" }
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
            clickHandle: () => {
              this.winObj.name = "DocumentWin"
              this.$refs["editWin"].showModal = true
            }
          },
          {
            label: "就业",
            icon: require("../../assets/images/u5.png"),
            props: { type: "success" },
            clickHandle: () => {
              this.winObj.name = "EmploymentWin"
              this.$refs["editWin"].showModal = true
            }
          },
          {
            label: "学生",
            icon: require("../../assets/images/u4.png"),
            props: { type: "success" },
            clickHandle: () => {
              this.winObj.name = "StudentWin"
              this.$refs["editWin"].showModal = true
            }
          },
          {
            label: "惠农",
            icon: require("../../assets/images/u3.png"),
            props: { type: "success" },
            clickHandle: () => {
              this.winObj.name = "FarmerWin"
              this.$refs["editWin"].showModal = true
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
              alert("右右右")
            }
          }
        ]
      },
      tableObj: {
        height: 200,
        columns: [
          {
            title: "身份证",
            align: "center",
            ellipsis: true,
            tooltip: true,
            fixed: "left",
            minWidth: 80,
            key: "name"
          },
          {
            title: "姓名",
            key: "name",
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            align: "center"
          },
          {
            title: "属性",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 240,
            key: "name",
            render: (h, params) => {
              let tags = [
                { label: "档案" },
                { label: "培训" },
                { label: "学生" },
                { label: "补助" }
              ]
              let r = tags.map(item => {
                let temp
                if (item.label === "档案") {
                  temp = "success"
                } else if (item.label === "培训") {
                  temp = "error"
                } else if (item.label === "学生") {
                  temp = "#6633cc"
                } else if (item.label === "补助") {
                  temp = "#FFA2D3"
                }
                return h("Tag", { props: { color: temp } }, item.label)
              })
              return r
            }
          },
          {
            title: "残疾证号",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "性别",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            key: "name"
          },
          {
            title: "出生日期",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "文化程度",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "婚姻状况",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "残疾类别",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "残疾等级",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "残疾详情",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "户口类型",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "发证时间",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "家庭住址",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "乡镇",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            key: "name"
          },
          {
            title: "行政村",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            key: "name"
          },
          {
            title: "联系电话",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
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
    this.tableObj.height = a - b - c + 40
  },
  watch: {
    "winObj.name": {
      handler(newVal) {
        this.winObj.render = this.winObj.vendorList[newVal]
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="less">
.base-info-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
}
</style>
