<template>
  <div class="document-win">
    <div class="top">
      <div class="left">
        <img alt class="icon" src="../../assets/images/u11.png" srcset />
        <span>残疾人姓名：{{curRowObj.name}}</span>
      </div>
      <div class="right">
        <span>身份证：{{curRowObj.idCard}}</span>
      </div>
    </div>
    <div class="body">
      <Form :label-width="100" :model="model">
        <FormItem label="户号">
          <Input placeholder="请输入" v-model="model.householderId"></Input>
        </FormItem>
        <FormItem label="户主身份证">
          <Input placeholder="请输入" v-model="model.householderIdCard"></Input>
        </FormItem>
        <FormItem label="户主姓名">
          <Input placeholder="请输入" v-model="model.householderName"></Input>
        </FormItem>
        <FormItem label="脱贫属性">
          <Select clearable transfer v-model="model.outPoorAttr">
            <Option
              :key="idx"
              :value="item.name"
              v-for="(item,idx) in dictObj['DIC_1003']"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="贫困户属性">
          <Select clearable transfer v-model="model.poorAttr">
            <Option
              :key="idx"
              :value="item.name"
              v-for="(item,idx) in dictObj['DIC_1004']"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="致贫原因">
          <Select clearable transfer v-model="model.poorReason">
            <Option
              :key="idx"
              :value="item.name"
              v-for="(item,idx) in dictObj['DIC_1005']"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
  name: "DocumentWin",
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
      model: {
        householderId: "",
        householderIdCard: "",
        householderName: "",
        outPoorAttr: "",
        poorAttr: "",
        poorReason: ""
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      documentInfo: state => state.documentInfo
    }),
    ...mapGetters(["dictObj"]),
    modelFmt() {
      let r = this.model
      r.idCard = this.curRowObj.idCard
      return r
    }
  },
  watch: {
    documentInfo: {
      immediate: true,
      handler(newVal) {
        if (this.type === "add") return
        this.model = newVal
      }
    }
  },
  methods: {},
  components: {}
}
</script>

<style scoped lang="less">
.document-win {
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
  }
  .body {
    margin-top: 20px;
  }
}
</style>
