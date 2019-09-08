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
                <template v-for="(subItem,index) in item.list">
                  <Button
                    :key="index"
                    @click="search"
                    style="margin-right:5px;"
                    type="primary"
                    v-if="subItem.type==='defaultSearch'"
                  >查询</Button>
                  <Button
                    :key="index"
                    @click="reset"
                    style="margin-right:5px;"
                    type="default"
                    v-else-if="subItem.type==='defaultReset'"
                  >重置</Button>
                  <Button
                    :key="index"
                    @click="subItem.click"
                    style="margin-right:5px;"
                    v-bind="subItem.props"
                    v-else
                  >{{subItem.label}}</Button>
                </template>
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
        <Table
          :columns="tableObj.columns"
          :data="tableObj.data"
          :height="tableObj.height"
          :highlight-row="tableObj.highlightRow"
          @on-current-change="selectRow"
        ></Table>
      </div>
      <div class="page-container">
        <Page
          :current="pageObj.model.current"
          :page-size="pageObj.model.pageSize"
          :show-sizer="pageObj.showSizer"
          :show-total="pageObj.showTotal"
          :total="pageObj.total"
          @on-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></Page>
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
        ajax: () => {},
        paramsFmt: p => p,
        gutter: 10,
        default: {
          name: "张一",
          gender: 1,
          time: new Date()
        },
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
              {
                type: "defaultSearch"
              },
              {
                type: "defaultReset"
              },
              {
                label: "查询",
                props: { type: "primary" },
                click: () => {
                  alert("查询")
                }
              },
              {
                label: "重置",
                props: { type: "success" },
                click: () => {
                  alert("重置")
                }
              }
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
        highlightRow: true,
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
        total: 100,
        default: {
          current: 1,
          pageSize: 10
        },
        model: { current: 1, pageSize: 10 }
      })
    }
  },
  data() {
    return {
      curReqParams: {}
    }
  },
  created() {
    this.search()
  },
  mounted() {
    // let a = document.querySelector(".combination-container").clientHeight
    // let b = document.querySelector(".tool-bar-container").clientHeight
    // let c = document.querySelector(".page-container").clientHeight
    // this.tbHeight = a - b - c + 40
  },
  computed: {
    params() {
      let r = {
        offset: this.pageObj.model.pageSize * (this.pageObj.model.current - 1),
        limit: this.pageObj.model.pageSize,
        query: this.searchObj.model
      }
      return r
    }
  },
  watch: {
    curReqParams: {
      deep: true,
      handler(newVal) {
        let p = this.searchObj.paramsFmt
          ? this.searchObj.paramsFmt(newVal)
          : newVal
        this.searchObj.ajax(p).then(({ data }) => {
          let { total, list } = data
          this.pageObj.total = total
          this.tableObj.data = list
        })
      }
    }
  },
  methods: {
    triggerSearch() {
      this.curReqParams = $K.deepClone(this.params)
    },
    search() {
      this.pageObj.model.current = 1
      this.triggerSearch()
    },
    refresh() {
      this.triggerSearch()
    },
    reset() {
      this.searchObj.model = $K.deepClone(this.searchObj.default)
      this.pageObj.model = $K.deepClone(this.pageObj.default)
      this.triggerSearch()
    },
    selectRow(cur, old) {
      this.$emit("selectRow", cur)
    },
    pageChange(pageNum) {
      this.pageObj.model.current = pageNum
      this.triggerSearch()
    },
    pageSizeChange(size) {
      this.pageObj.model.pageSize = size
      this.triggerSearch()
    }
  }
}
</script>

<style scoped lang="less">
@import url(./BaseLayout.less);
</style>
