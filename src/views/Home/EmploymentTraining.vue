<template>
  <div class="disabled-student-container">
    <BaseLayout :searchObj="searchObj" :tableObj="tableObj" :toolBarObj="toolBarObj">
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
import BaseLayout from "@/components/BaseLayout"
import BaseModal from "@/components/BaseModal"
import DocumentWin from "./DocumentWin"
export default {
  name: "FarmerBenefit",
  components: {
    BaseLayout,
    BaseModal,
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
            span: 4,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "身份证",
            span: 5,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "残疾类型",
            span: 5,
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
            span: 5,
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
            label: "乡镇",
            span: 5,
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
            label: "培训类别",
            span: 4,
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
            label: "培训年度",
            span: 5,
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
            span: 5,
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
              alert("右右右")
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
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            key: "name"
          },
          {
            title: "身份证",
            key: "name",
            ellipsis: true,
            tooltip: true,
            minWidth: 80,
            align: "center"
          },
          {
            title: "培训类别",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "培训内容",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "培训年度",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
            key: "name"
          },
          {
            title: "培训时间",
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
            title: "家庭住址",
            align: "center",
            ellipsis: true,
            tooltip: true,
            minWidth: 100,
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
            title: "乡镇",
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
    this.tableObj.height = a - b - c
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
.disabled-student-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
  .total-container {
    display: flex;
    align-items: center;
  }
}
</style>
