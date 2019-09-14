<template>
  <!-- 基本信息 -->
  <div class="base-info-container">
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
      :showConfirm="winObj.name==='InfoWin'||winObj.name==='DocumentWin'"
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
    <input @change="upload" hidden name="myfile" ref="file" type="file" />
  </div>
</template>

<script>
import {
  $$postInfoList, //  查询基本信息列表
  $$postExportInfoList, //  批量导出
  $$postImportInfoList, //  批量导入
  $$getInfoDetail, //  获取基本信息详情
  $$postAddInfo, //  新增基本信息
  $$postUpdateInfo, //  修改基本信息
  $$getDelInfo, //  删除基本信息
  $$getArchiveDetail, //  查询档案详情
  $$postArchiveAdd, //  新增档案
  $$postArchiveUpdate //  修改档案
} from "@js/apis.js"
import { mapState, mapGetters, mapMutations } from "vuex"
import InfoWin from "./InfoWin"
import DocumentWin from "./DocumentWin"
import EmploymentWin from "./EmploymentWin"
import StudentWin from "./StudentWin"
import FarmerWin from "./FarmerWin"
import RehabilitationWin from "./RehabilitationWin"
export default {
  name: "BaseInfo",
  components: {
    InfoWin,
    DocumentWin,
    EmploymentWin,
    StudentWin,
    FarmerWin,
    RehabilitationWin
  },
  props: {},
  data() {
    return {
      confirmWinObj: {
        type: "",
        render: {},
        vendorList: {
          infoDel: {
            title: "操作确认",
            content: "是否要删除该项数据？"
          },
          archiveAdd: {
            title: "操作确认",
            content: "当前没有档案，是否新增？"
          }
        }
      },
      winObj: {
        name: "",
        type: "", //  add edit
        render: {},
        vendorList: {
          InfoWin: {
            modalHeight: 500,
            modalWidth: 600,
            title: "基本信息"
          },
          DocumentWin: {
            modalHeight: 500,
            modalWidth: 600,
            title: "建档立卡"
          },
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
          },
          RehabilitationWin: {
            modalHeight: 500,
            modalWidth: 800,
            title: "康复需求"
          }
        }
      },
      searchObj: {
        ajax: $$postInfoList,
        paramsFmt: p => {
          let r = $K.deepClone(p)
          r.query.bStartTime =
            $K.fmtDate(p.query.birthday[0], "yyyy-MM-dd") || ""
          r.query.bEndTime = $K.fmtDate(p.query.birthday[1], "yyyy-MM-dd") || ""
          delete r.query.birthday
          return r
        },
        gutter: 10,
        default: {
          name: "",
          idCard: "",
          birthday: [],
          town: "",
          residenceType: "",
          disabledType: "",
          disabledLevel: ""
        },
        model: {
          name: "",
          idCard: "",
          birthday: [],
          town: "",
          residenceType: "",
          disabledType: "",
          disabledLevel: ""
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
            key: "idCard",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "出生日期",
            span: 6,
            key: "birthday",
            type: "datepicker",
            props: { placeholder: "时间", type: "daterange" }
          },
          {
            label: "乡镇",
            span: 6,
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
            label: "户口类型",
            span: 6,
            key: "residenceType",
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
            label: "残疾类型",
            span: 6,
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
            span: 6,
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
            span: 6,
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
                    } else {
                      this.confirmWinObj.type = "archiveAdd"
                      this.$refs["confirmWin"].showModal = true
                    }
                  }
                )
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          },
          {
            label: "就业",
            icon: require("../../assets/images/u5.png"),
            props: { type: "success" },
            clickHandle: () => {
              if (Object.keys(this.tableObj.curRow).length > 0) {
                this.winObj.name = "EmploymentWin"
                this.$refs["editWin"].showModal = true
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          },
          {
            label: "学生",
            icon: require("../../assets/images/u4.png"),
            props: { type: "success" },
            clickHandle: () => {
              if (Object.keys(this.tableObj.curRow).length > 0) {
                this.winObj.name = "StudentWin"
                this.$refs["editWin"].showModal = true
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          },
          {
            label: "惠农",
            icon: require("../../assets/images/u3.png"),
            props: { type: "success" },
            clickHandle: () => {
              if (Object.keys(this.tableObj.curRow).length > 0) {
                this.winObj.name = "FarmerWin"
                this.$refs["editWin"].showModal = true
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          },
          {
            label: "康复",
            icon: require("../../assets/images/u6.png"),
            props: { type: "success" },
            clickHandle: () => {
              if (Object.keys(this.tableObj.curRow).length > 0) {
                this.winObj.name = "RehabilitationWin"
                this.$refs["editWin"].showModal = true
              } else {
                __INFO__("请先选择一条数据")
              }
            }
          }
        ],
        rightList: [
          {
            label: "新增",
            icon: require("../../assets/images/u7.png"),
            props: { type: "success" },
            clickHandle: () => {
              this.winObj.name = "InfoWin"
              this.winObj.type = "add"
              this.$refs["editWin"].showModal = true
            }
          },
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
              $$postExportInfoList(p).then(res => {
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
            align: "center",
            fixed: "left",
            minWidth: 80,
            render: tableRender("idCard")
          },
          {
            title: "姓名",
            render: tableRender("name"),
            minWidth: 80,
            align: "center"
          },
          // {
          //   title: "属性",
          //   align: "center",
          //
          //
          //   minWidth: 240,
          //   key: "name",
          //   render: (h, params) => {
          //     let tags = [
          //       { label: "档案" },
          //       { label: "培训" },
          //       { label: "学生" },
          //       { label: "补助" }
          //     ]
          //     let r = tags.map(item => {
          //       let temp
          //       if (item.label === "档案") {
          //         temp = "success"
          //       } else if (item.label === "培训") {
          //         temp = "error"
          //       } else if (item.label === "学生") {
          //         temp = "#6633cc"
          //       } else if (item.label === "补助") {
          //         temp = "#FFA2D3"
          //       }
          //       return h("Tag", { props: { color: temp } }, item.label)
          //     })
          //     return r
          //   }
          // },
          {
            title: "残疾证号",
            align: "center",
            minWidth: 100,
            render: tableRender("dpCard")
          },
          {
            title: "性别",
            align: "center",
            minWidth: 80,
            render: tableRender("sex")
          },
          {
            title: "出生日期",
            align: "center",
            minWidth: 100,
            render: tableRender("birthday")
          },
          {
            title: "文化程度",
            align: "center",
            minWidth: 100,
            render: tableRender("educationLevel")
          },
          {
            title: "婚姻状况",
            align: "center",
            minWidth: 100,
            render: tableRender("marriageType")
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
            title: "残疾详情",
            align: "center",
            render: tableRender("disabledDetail"),
            minWidth: 100
          },
          {
            title: "户口类型",
            align: "center",
            render: tableRender("residenceType"),
            minWidth: 100
          },
          {
            title: "发证时间",
            align: "center",
            minWidth: 100,
            render: tableRender("dpCardTime")
          },
          {
            title: "家庭住址",
            align: "center",
            minWidth: 100,
            render: tableRender("address")
          },
          {
            title: "乡镇",
            align: "center",
            minWidth: 80,
            render: tableRender("town")
          },
          {
            title: "行政村",
            align: "center",
            minWidth: 80,
            render: tableRender("village")
          },
          {
            title: "联系电话",
            align: "center",
            minWidth: 100,
            render: tableRender("telephone")
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
                        this.tableObj.curRow = params.row
                        $$getInfoDetail(params.row.idCard).then(({ data }) => {
                          this.setBaseInfo(data)
                          this.winObj.name = "InfoWin"
                          this.winObj.type = "edit"
                          this.$refs["editWin"].showModal = true
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
                        this.tableObj.curRow = params.row
                        this.confirmWinObj.type = "infoDel"
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
  created() {},
  mounted() {
    let a = document.querySelector(".combination-container").clientHeight
    let b = document.querySelector(".tool-bar-container").clientHeight
    let c = document.querySelector(".page-container").clientHeight
    this.tableObj.height = a - b - c + 40
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
        this.searchObj.list[3].props.list = newVal["DIC_1008"]
        this.searchObj.list[4].props.list = newVal["DIC_1002"]
        this.searchObj.list[5].props.list = newVal["DIC_1000"]
        this.searchObj.list[6].props.list = newVal["DIC_1001"]
      }
    }
  },
  methods: {
    ...mapMutations(["setBaseInfo", "setDocumentInfo"]),
    upload(e) {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append("file", file)
      $$postImportInfoList(formData)
    },
    // 选中表格一行
    selectRow(cur) {
      console.log(cur)
      this.tableObj.curRow = cur
    },
    confirmHandle(compName) {
      // 基本信息窗口
      if (compName === "InfoWin") {
        let pass = this.$refs["abc"].valid()
        if (!pass) return
        let p = this.$refs["abc"].modelFmt
        if (this.winObj.type === "add") {
          $$postAddInfo(p).then(res => {
            this.$refs["editWin"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        } else if (this.winObj.type === "edit") {
          $$postUpdateInfo(p).then(res => {
            this.$refs["editWin"].showModal = false
            this.$refs["BaseLayout"].refresh()
          })
        }
      }
      // 档案窗口
      else if (compName === "DocumentWin") {
        let p = this.$refs["abc"].modelFmt
        if (this.winObj.type === "add") {
          $$postArchiveAdd(p).then(res => {
            this.$refs["editWin"].showModal = false
          })
        } else if (this.winObj.type === "edit") {
          $$postArchiveUpdate(p).then(res => {
            this.$refs["editWin"].showModal = false
          })
        }
      }
    },
    confirmWin() {
      if (this.confirmWinObj.type === "infoDel") {
        $$getDelInfo(this.tableObj.curRow.idCard).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.$refs["BaseLayout"].refresh()
        })
      } else if (this.confirmWinObj.type === "archiveAdd") {
        this.$refs["confirmWin"].showModal = false
        this.winObj.name = "DocumentWin"
        this.winObj.type = "add"
        this.$refs["editWin"].showModal = true
      }
    }
  }
}
</script>

<style scoped lang="less">
.base-info-container {
  height: 100%;
  background: rgba(242, 242, 242, 1);
  display: flex;
}
</style>
