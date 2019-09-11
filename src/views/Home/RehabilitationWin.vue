<template>
  <!-- 康复需求窗口 -->
  <div class="rehabilitation-win">
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
      @confirm="confirmHandle('confirm')"
      ref="confirmWin"
    ></BaseModal>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
import {
  $$getCureWinList, //  查询窗口列表
  $$postCureWinAdd, // 新增
  $$getCureWinDetail, // 查询
  $$postCureWinUpdate, //  编辑
  $$getDelCure //  删除
} from "@js/apis.js"
import BaseModal from "@/components/BaseModal"
export default {
  name: "RehabilitationWin",
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
          title: "康复需求",
          align: "center",
          render: tableRender("cureRequire")
        },
        {
          title: "是否服务",
          align: "center",
          render: tableRender("isService")
        },
        {
          title: "服务内容",
          align: "center",
          minWidth: 40,
          render: tableRender("serviceContent")
        },
        {
          title: "服务时间",
          align: "center",
          render: tableRender("serviceTime")
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
      $$getCureWinList(p).then(({ data }) => {
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
        p.serviceTime = $K.fmtDate(p.serviceTime, "yyyy-MM-dd")
        p.idCard = this.curRowObj.idCard
        p.name = this.curRowObj.name
        if (this.winObj.type === "add") {
          $$postCureWinAdd(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        } else if (this.winObj.type === "edit") {
          $$postCureWinUpdate(p).then(res => {
            this.$refs["win"].showModal = false
            this.queryList()
          })
        }
      }
      // 二次确认窗口
      else if (type === "confirm") {
        $$getDelCure(this.curRow.id).then(res => {
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
.rehabilitation-win {
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
