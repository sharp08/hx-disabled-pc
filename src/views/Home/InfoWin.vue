<template>
  <div class="info-win">
    <!-- <div class="top">
      <div class="left">
        <img alt class="icon" src="../../assets/images/u11.png" srcset />
        <span>残疾人姓名：个人信息</span>
      </div>
      <div class="right">
        <span>身份证：622822198309211232</span>
      </div>
    </div>-->
    <div class="body">
      <Form :label-width="100" :model="model" :rules="rules" ref="form">
        <Row>
          <Col span="12">
            <FormItem label="姓名" prop="name">
              <Input placeholder="请输入" v-model="model.name"></Input>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="身份证" prop="idCard">
              <Input placeholder="请输入" v-model="model.idCard"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="性别" prop="sex">
              <RadioGroup v-model="model.sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="生日">
              <DatePicker :editable="false" placeholder="请选择" transfer v-model="model.birthday"></DatePicker>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="家庭住址">
          <Input placeholder="请输入" v-model="model.address"></Input>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="残疾等级">
              <Select clearable transfer v-model="model.disabledLevel">
                <Option
                  :key="idx"
                  :value="item.name"
                  v-for="(item,idx) in dictObj['DIC_1001']"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="残疾类型">
              <Select clearable transfer v-model="model.disabledType">
                <Option
                  :key="idx"
                  :value="item.name"
                  v-for="(item,idx) in dictObj['DIC_1000']"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="残疾详情">
          <Input placeholder="请输入" v-model="model.disabledDetail"></Input>
        </FormItem>
        <FormItem label="残疾证号">
          <Input placeholder="请输入" v-model="model.dpCard"></Input>
        </FormItem>
        <FormItem label="婚姻状况">
          <Select clearable transfer v-model="model.marriageType">
            <Option
              :key="idx"
              :value="item.name"
              v-for="(item,idx) in dictObj['DIC_1009']"
            >{{item.name}}</Option>
          </Select>
        </FormItem>
        <Row>
          <Col span="12">
            <FormItem label="发证时间">
              <DatePicker :editable="false" placeholder="请选择" transfer v-model="model.dpCardTime"></DatePicker>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="文化程度">
              <Select clearable transfer v-model="model.educationLevel">
                <Option
                  :key="idx"
                  :value="item.name"
                  v-for="(item,idx) in dictObj['DIC_1006']"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="户口类型">
              <Select clearable transfer v-model="model.residenceType">
                <Option
                  :key="idx"
                  :value="item.name"
                  v-for="(item,idx) in dictObj['DIC_1002']"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="联系电话">
              <Input placeholder="请输入" v-model="model.telephone"></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
            <FormItem label="乡镇">
              <Select clearable transfer v-model="model.town">
                <Option
                  :key="idx"
                  :value="item.name"
                  v-for="(item,idx) in dictObj['DIC_1008']"
                >{{item.name}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="县">
              <Input placeholder="请输入" readonly v-model="model.country"></Input>
            </FormItem>
          </Col>
        </Row>
        <FormItem label="村委会">
          <Input placeholder="请输入" v-model="model.village"></Input>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex"
export default {
  name: "InfoWin",
  props: {
    type: {
      type: String //  新增 & 编辑
    }
  },
  data() {
    return {
      model: {
        name: "",
        idCard: "",
        sex: "",
        address: "",
        birthday: "",
        disabledLevel: "",
        disabledDetail: "",
        disabledType: "",
        dpCard: "",
        dpCardTime: "",
        educationLevel: "",
        marriageType: "",
        residenceType: "",
        telephone: "",
        town: "",
        country: "环县",
        village: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: "必填",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {},
  computed: {
    ...mapState({
      baseInfo: state => state.baseInfo
    }),
    ...mapGetters(["dictObj"]),
    modelFmt() {
      let r = this.model
      r.birthday = $K.fmtDate(this.model.birthday, "yyyy-MM-dd")
      r.dpCardTime = $K.fmtDate(this.model.dpCardTime, "yyyy-MM-dd")
      return r
    }
  },
  watch: {
    baseInfo: {
      immediate: true,
      handler(newVal) {
        if (this.type === "add") return
        this.model = newVal
      }
    }
  },
  methods: {
    valid() {
      let r
      this.$refs["form"].validate(valid => (r = valid))
      return r
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
.info-win {
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
    // margin-top: 20px;
  }
}
</style>
