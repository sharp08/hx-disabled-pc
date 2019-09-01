<template>
  <div class="employment-win">
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
      class="employ-win"
      ref="win"
    >
      <div class="content">
        <Form :label-width="100">
          <FormItem label="培训时间">
            <Input></Input>
          </FormItem>
          <FormItem label="培训时间">
            <Select>
              <Option value="0">种植技术</Option>
              <Option value="1">养殖技术</Option>
            </Select>
          </FormItem>
          <FormItem label="培训内容">
            <Input type="textarea"></Input>
          </FormItem>
        </Form>
      </div>
    </BaseModal>
  </div>
</template>

<script>
import BaseModal from "@/components/BaseModal"
export default {
  name: "EmploymentWin",
  props: {},
  data() {
    return {
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
          key: "name"
        },
        {
          title: "培训类型",
          align: "center",
          key: "name"
        },
        {
          title: "培训内容",
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
          name: "John Brown",
          input: "123123",
          select: "0"
        }
      ],
      winObj: {
        type: "",
        height: 300,
        width: 500,
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
