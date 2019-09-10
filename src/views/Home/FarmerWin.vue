<template>
  <!-- 惠农补助窗口 -->
  <div class="farmer-win">
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
  $$getFarmerWinList, //  查询窗口列表
  $$postFarmerWinAdd, // 新增
  $$getFarmerWinDetail, // 查询
  $$postFarmerWinUpdate, //  编辑
  $$getFarmerWinDel //  删除
} from "@js/apis.js"
import BaseModal from "@/components/BaseModal"
export default {
  name: "FarmerWin",
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
          title: "享受年度",
          align: "center",
          render: tableRender("subsidyYear")
        },
        {
          title: "补助项目",
          align: "center",
          render: tableRender("subsidyItem")
        },
        {
          title: "补助标准（元）",
          align: "center",
          minWidth: 40,
          render: tableRender("subsidyStandard")
        },
        {
          title: "发放时间",
          align: "center",
          render: tableRender("subsidyTime")
        },
        {
          title: "一折通姓名",
          align: "center",
          render: tableRender("cardName")
        },
        {
          title: "一折通账号",
          align: "center",
          render: tableRender("cardNumber")
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
          subsidyItem: "",
          subsidyStandard: "",
          subsidyTime: "",
          subsidyYear: "",
          cardName: "",
          cardNumber: ""
        },
        render: {},
        vendorList: {
          add: {
            title: "新增补助项目"
          },
          edit: {
            title: "编辑补助项目"
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
      $$getFarmerWinList(p).then(({ data }) => {
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
        p.subsidyYear = $K.fmtDate(p.subsidyYear, "yyyy")
        p.subsidyTime = $K.fmtDate(p.subsidyTime, "yyyy-MM-dd")
        p.idCard = this.curRowObj.idCard
        p.name = this.curRowObj.name
        if (this.winObj.type === "add") {
          $$postFarmerWinAdd(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        } else if (this.winObj.type === "edit") {
          $$postFarmerWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getFarmerWinDel(this.curRow.id).then(res => {
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
.farmer-win {
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
.fm-win {
  .content {
    padding: 10px;
  }
}
</style>
