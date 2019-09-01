<template>
  <div class="base-layout-container">
    <div class="search-container">
      <Form :label-width="searchObj.globalLabelWidth" :model="searchObj.model">
        <Row :gutter="searchObj.gutter">
          <Col :key="idx" :span="item.span" v-for="(item,idx) in searchObj.list">
            <FormItem :label="item.label" :label-width="item.labelWidth" class="custom-form-item">
              <Input
                v-bind="item.props"
                v-if="item.type==='input'"
                v-model="searchObj.model[item.key]"
              ></Input>
              <Select v-else-if="item.type==='select'" v-model="searchObj.model[item.key]">
                <Option
                  :key="subItem.value"
                  :value="subItem[item.ajaxKey]"
                  v-for="subItem in item.props.list"
                >{{ subItem[item.showKey] }}</Option>
              </Select>
              <DatePicker
                style="width:100%;"
                v-bind="item.props"
                v-else-if="item.type==='datepicker'"
                v-model="searchObj.model[item.key]"
              ></DatePicker>
              <div class="btns-container">
                <Button
                  :key="index"
                  style="margin-right:5px;"
                  v-bind="subItem.props"
                  v-for="(subItem,index) in item.list"
                >{{subItem.label}}</Button>
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="combination-container">
      <div class="tool-bar-container">
        <div class="left" v-if="toolBarObj.leftList.length>0">
          <Button
            :key="idx"
            @click="item.clickHandle"
            class="custom-button"
            v-bind="item.props"
            v-for="(item,idx) in toolBarObj.leftList"
          >
            <div class="btn-content">
              <div class="icon-container" v-if="item.icon">
                <img :src="item.icon" alt />
              </div>
              <span>{{item.label}}</span>
            </div>
          </Button>
        </div>
        <slot name="tool-bar"></slot>
        <div class="right" v-if="toolBarObj.rightList.length>0">
          <Button
            :key="idx"
            @click="item.clickHandle"
            class="custom-button"
            v-bind="item.props"
            v-for="(item,idx) in toolBarObj.rightList"
          >
            <div class="btn-content">
              <div class="icon-container" v-if="item.icon">
                <img :src="item.icon" alt />
              </div>
              <span>{{item.label}}</span>
            </div>
          </Button>
        </div>
      </div>
      <div class="table-container">
        <Table :columns="tableObj.columns" :data="tableObj.data" :height="tableObj.height"></Table>
      </div>
      <div class="page-container">
        <Page v-bind="pageObj"></Page>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseLayout",
  props: {
    searchObj: {
      type: Object,
      default: () => ({
        gutter: 10,
        model: {
          name: "张三",
          gender: 1,
          time: new Date()
        },
        globalLabelWidth: 100,
        list: [
          {
            label: "输入",
            // labelWidth: 0,
            span: 6,
            key: "name",
            type: "input",
            props: { placeholder: "请输入" }
          },
          {
            label: "选择",
            span: 6,
            key: "gender",
            type: "select",
            showKey: "label",
            ajaxKey: "value",
            props: {
              placeholder: "请选择",
              list: [
                {
                  value: 0,
                  label: "男"
                },
                {
                  value: 1,
                  label: "女"
                }
              ]
            }
          },
          {
            label: "时间",
            span: 6,
            key: "time",
            type: "datepicker",
            props: { placeholder: "时间" }
          },
          {
            span: 6,
            type: "button",
            list: [
              { label: "查询", props: { type: "primary" } },
              { label: "重置", props: { type: "success" } }
            ]
          }
        ]
      })
    },
    toolBarObj: {
      type: Object,
      default: () => ({
        leftList: [
          {
            label: "左列表",
            icon: require("./img.png"),
            props: {
              type: "primary"
            },
            clickHandle: () => {
              alert("左左左")
            }
          }
        ],
        rightList: [
          {
            label: "右",
            props: { type: "primary" },
            clickHandle: () => {
              alert("右右右")
            }
          }
        ]
      })
    },
    tableObj: {
      type: Object,
      default: () => ({
        height: 200,
        columns: [
          {
            title: "常规",
            align: "center",
            key: "name"
          },
          {
            title: "按钮",
            align: "center",
            render: (h, params) => {
              return h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      alert(123)
                    }
                  }
                },
                "按钮"
              )
            }
          },
          {
            title: "输入",
            key: "input",
            align: "center",
            render: (h, params) => {
              return h("Input", {
                props: {
                  placeholder: "请输入..."
                }
              })
            }
          },
          {
            title: "选择",
            key: "select",
            align: "center",
            render: (h, params) => {
              let arr = [{ label: "男", id: 1 }, { label: "女", id: 0 }]
              let options = arr.map(item => {
                return h("Option", { props: { value: item.id } }, item.label)
              })
              return h(
                "Select",
                {
                  props: {
                    clearable: true
                  }
                },
                options
              )
            }
          }
        ],
        data: [
          {
            name: "John Brown",
            input: "123123",
            select: "0"
          }
        ]
      })
    },
    pageObj: {
      type: Object,
      default: () => ({
        showTotal: true,
        showSizer: true,
        total: 100
      })
    }
  },
  data() {
    return {}
  },
  mounted() {
    // let a = document.querySelector(".combination-container").clientHeight
    // let b = document.querySelector(".tool-bar-container").clientHeight
    // let c = document.querySelector(".page-container").clientHeight
    // this.tbHeight = a - b - c + 40
  },
  computed: {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="less">
@import url(./BaseLayout.less);
</style>
