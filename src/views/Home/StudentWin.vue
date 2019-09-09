<template>
  <!-- 残疾学生 -->
  <div class="student-win">
    <div class="top">
      <div class="left">
        <img alt class="icon" src="../../assets/images/u11.png" srcset />
        <span>残疾人姓名：{{curRowObj.name}}</span>
      </div>
      <div class="right">
        <span>身份证：{{curRowObj.idCard}}</span>
        <Button
          @click="openWin('add')"
          class="custom-add"
          icon="ios-add"
          shape="circle"
          type="success"
        ></Button>
      </div>
    </div>
    <div class="body">
      <Table :columns="columns" :data="data" :height="tableHeight"></Table>
    </div>
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
import { mapState, mapGetters } from "vuex"
import {
  $$getStudentWinList, //  查询窗口列表
  $$postStudentWinAdd, // 新增
  $$getStudentWinDetail, // 查询
  $$postStudentWinUpdate, //  编辑
  $$getStudentWinDel //  删除
} from "@js/apis.js"
import BaseModal from "@/components/BaseModal"
export default {
  name: "StudentWin",
  props: {
    type: {
      type: String //  add & edit
    },
    curRowObj: {
      type: Object
    }
  },
  data() {
    return {
      confirmWinObj: {
        type: "",
        render: {},
        vendorList: {
          eduDel: {
            title: "操作确认",
            content: "是否要删除该项数据？"
          }
        }
      },
      curRow: {},
      tableHeight: 350,
      columns: [
        {
          title: "教育阶段",
          align: "center",
          render: tableRender("eduLevel")
        },
        {
          title: "就读学校",
          align: "center",
          render: tableRender("eduSchool")
        },
        {
          title: "就读年级",
          align: "center",
          render: tableRender("eduAge")
        },
        {
          title: "就读专业",
          align: "center",
          render: tableRender("eduClass")
        },
        {
          title: "是否辍学",
          align: "center",
          render: tableRender("eduDrop")
        },
        {
          title: "辍学原因",
          align: "center",
          render: tableRender("eduDropReason")
        },
        {
          title: "按钮",
          align: "center",
          minWidth: 60,
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
                      $$getStudentWinDetail(params.row.id).then(({ data }) => {
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
                      this.curRow = params.row
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
      data: [
        {
          name: "文本",
          input: "123123",
          select: "0"
        }
      ],
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
      }
    }
  },
  created() {
    this.queryList()
  },
  mounted() {},
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
    }
  },
  methods: {
    queryList() {
      let p = {
        idCard: this.curRowObj.idCard
      }
      $$getStudentWinList(p).then(({ data }) => {
        this.data = data
      })
    },
    openWin(type) {
      if (type === "add") {
        this.winObj.model = {}
        this.winObj.type = "add"
        this.$refs["win"].showModal = true
      }
    },
    // 窗口确认
    confirmHandle(type) {
      // 表单窗口
      if (type === "form") {
        let p = this.winObj.model        
        p.idCard = this.curRowObj.idCard
        p.name = this.curRowObj.name
        if (this.winObj.type === "add") {
          $$postStudentWinAdd(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        } else if (this.winObj.type === "edit") {
          $$postStudentWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getStudentWinDel(this.curRow.id).then(res => {
          this.$refs["confirmWin"].showModal = false
          this.queryList()
        })
      }
    }
  },
  components: {
    BaseModal
  }
}
</script>

<style scoped lang="less">
.student-win {
  padding: 10px 20px 10px 10px;
  font-size: 14px;
  font-weight: bold;
  .top {
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .icon {
        margin-right: 20px;
      }
    }
    .right {
      .custom-add {
        margin-left: 20px;
        font-weight: bold !important;
        font-size: 20px;
      }
    }
  }
  .body {
    margin-top: 20px;
  }
}
.st-win {
  .content {
    padding: 10px;
  }
}
</style>
