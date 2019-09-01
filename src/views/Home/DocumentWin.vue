<template>
  <div class="document-win">
    <div class="top">
      <div class="left">
        <img alt class="icon" src="../../assets/images/u11.png" srcset />
        <span>残疾人姓名：张三</span>
      </div>
      <div class="right">
        <span>身份证：622822198309211232</span>
      </div>
    </div>
    <div class="body">
      <Form :label-width="100">
        <FormItem label="户号">
          <Input placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="身份证">
          <Input placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="户主姓名">
          <Input placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="脱贫属性">
          <Select>
            <Option value="0">未脱贫</Option>
            <Option value="1">已脱贫</Option>
          </Select>
        </FormItem>
        <FormItem label="贫困户属性">
          <Select>
            <Option value="0">未脱贫</Option>
            <Option value="1">已脱贫</Option>
          </Select>
        </FormItem>
        <FormItem label="致贫原因">
          <Select>
            <Option value="0">未脱贫</Option>
            <Option value="1">已脱贫</Option>
          </Select>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  name: "DocumentWin",
  props: {},
  data() {
    return {}
  },
  mounted() {},
  computed: {},
  watch: {},
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
