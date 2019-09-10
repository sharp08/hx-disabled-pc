<template>
  <!-- 就业培训窗口 -->
  <div class="employment-win">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import {
  $$getPageByIdCard, //  查询列表
  $$postAddTrain, //  新增就业
  $$postUpdateTrain, //  修改就业
  $$getDelTrain, //  删除就业
  $$getTrainDetail //  查询单一培训详情
} from "@js/apis.js"
import BaseModal from "@/components/BaseModal"
export default {
  name: "EmploymentWin",
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
          trainDel: {
            title: "操作确认",
            content: "是否要删除该项数据？"
          }
        }
      },
      curRow: {},
      tableHeight: 350,
      columns: [
        {
          title: "序号",
          align: "center",
          type: "index"
        },
        {
          title: "培训时间",
          align: "center",
          render: tableRender("trainTime")
        },
        {
          title: "培训类型",
          align: "center",
          render: tableRender("trainType")
        },
        {
          title: "培训内容",
          align: "center",
          render: tableRender("trainContent")
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
                      this.curRow = params.row
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
      data: [
        {
          name: "John Brown",
          input: "123123",
          select: "0"
        }
      ],
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
          add: {
            title: "新增就业培训"
          },
          edit: {
            title: "编辑就业培训"
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
      $$getPageByIdCard(p).then(({ data }) => {
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
        p.trainTime = $K.fmtDate(p.trainTime)
        p.idCard = this.curRowObj.idCard
        p.name = this.curRowObj.name
        if (this.winObj.type === "add") {
          $$postAddTrain(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        } else if (this.winObj.type === "edit") {
          $$postUpdateTrain(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getDelTrain(this.curRow.id).then(res => {
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
.employment-win {
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
.employ-win {
  .content {
    padding: 10px;
  }
}
</style>
