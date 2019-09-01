<template>
  <div class="farmer-win">
    <div class="top">
      <div class="left">
        <img alt class="icon" src="../../assets/images/u11.png" srcset />
        <span>残疾人姓名：张三</span>
      </div>
      <div class="right">
        <span>身份证：622822198309211232</span>
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
      class="fm-win"
      ref="win"
    >
      <div class="content">
        <Form :label-width="100">
          <FormItem label="项目">
            <Select>
              <Option value="0">临时救助</Option>
              <Option value="1">康复救助</Option>
            </Select>
          </FormItem>
          <FormItem label="补助标准">
            <Input></Input>
          </FormItem>
          <FormItem label="享受年度">
            <Input></Input>
          </FormItem>
          <FormItem label="发放时间">
            <Input></Input>
          </FormItem>
          <FormItem label="一折通姓名">
            <Input></Input>
          </FormItem>
          <FormItem label="一折通账号">
            <Input></Input>
          </FormItem>
        </Form>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal"
export default {
  name: "FarmerWin",
  props: {},
  data() {
    return {
      tableHeight: 350,
      columns: [
        {
          title: "享受年度",
          align: "center",
          key: "name"
        },
        {
          title: "项目",
          align: "center",
          key: "name"
        },
        {
          title: "补助标准（元）",
          align: "center",
          minWidth: 40,
          key: "name"
        },
        {
          title: "发放时间",
          align: "center",
          key: "name"
        },
        {
          title: "一折通姓名",
          align: "center",
          key: "name"
        },
        {
          title: "一折通账号",
          align: "center",
          key: "name"
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
                      this.winObj.type = "edit"
                      this.$refs["win"].showModal = true
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
                      alert(123)
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
  mounted() {},
  computed: {},
  watch: {
    "winObj.type": {
      handler(newVal) {
        this.winObj.render = this.winObj.vendorList[newVal]
      }
    }
  },
  methods: {
    openWin(type) {
      if (type === "add") {
        this.winObj.type = "add"
        this.$refs["win"].showModal = true
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
