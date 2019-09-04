<template>
  <div class="home-page-container">
    <div class="home-bar-container">
      <div class="left">
        <img alt class="logo" src="../assets/images/logo.png" srcset />
        <span class="platform-name">环县残疾人联合会</span>
      </div>
      <div class="mid">
        <div class="tabs-container">
          <div
            :class="{cur:tabsObj.curTab===item.val}"
            :key="idx"
            @click="changeTab(item.val)"
            class="tab"
            v-for="(item,idx) in tabsObj.list"
          >
            <div class="icon-container">
              <div class="icon-limit">
                <img :src="item.icon" alt class="icon" srcset />
              </div>
            </div>
            <div class="label">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="name-container">
          <img alt class="img" src="../assets/images/avator2.png" />
          <span>职工 郭建慧</span>
        </div>
        <div class="avator-container">
          <Dropdown @on-click="clickMenu">
            <img alt src="../assets/images/avator.png" srcset />
            <DropdownMenu slot="list">
              <DropdownItem name="logout">登出</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="home-body-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  name: "HomePage",
  props: {},
  data() {
    return {
      tabsObj: {
        curTab: "",
        list: [
          {
            icon: require("../assets/images/u1.png"),
            name: "基本信息",
            val: "BaseInfo"
          },
          {
            icon: require("../assets/images/u2.png"),
            name: "建档立卡",
            val: "BuildDocument"
          },
          {
            icon: require("../assets/images/u3.png"),
            name: "惠农补助",
            val: "FarmerBenefit"
          },
          {
            icon: require("../assets/images/u4.png"),
            name: "残疾学生",
            val: "DisabledStudent"
          },
          {
            icon: require("../assets/images/u5.png"),
            name: "就业培训",
            val: "EmploymentTraining"
          },
          {
            icon: require("../assets/images/u6.png"),
            name: "康复需求",
            val: "Rehabilitation"
          }
        ]
      }
    }
  },
  mounted() {},
  computed: {},
  watch: {
    $route: {
      immediate: true,
      handler(newVal) {
        this.tabsObj.curTab = newVal.name
      }
    },
    "tabsObj.curTab": {
      handler(newVal) {
        this.$router.push({
          name: newVal
        })
      }
    }
  },
  methods: {
    ...mapMutations(["setUserInfo"]),
    changeTab(val) {
      this.tabsObj.curTab = val
    },
    clickMenu(name) {
      if (name === "logout") {
        $K.removeSession()
        this.setUserInfo({})
        this.$router.replace({ name: "Login" })
      }
    }
  },
  components: {}
}
</script>

<style scoped lang="less">
@70: 70px;
.home-page-container {
  height: 100%;
  width: 100%;
  background: lightgreen;
  .home-bar-container {
    height: @70;
    background: #008cee;
    color: #fff;
    display: flex;
    .left {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .logo {
        height: 50px;
        padding-right: 10px;
      }
      .platform-name {
        font-size: 26px;
        font-weight: bold;
      }
    }
    .mid {
      flex-grow: 1;
      display: flex;
      .tabs-container {
        display: flex;
        .tab {
          &:hover {
            background: #5cadff;
          }
          &.cur {
            background: #5cadff;
          }
          cursor: pointer;
          display: flex;
          flex-direction: column;
          width: 80px;
          height: 100%;
          .icon-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            overflow: hidden;
            .icon-limit {
              height: 80%;
              display: flex;
              justify-content: center;
              align-items: center;
              .icon {
                max-height: 100%;
              }
            }
          }
          .label {
            flex-shrink: 0;
            line-height: 30px;
            height: 30px;
            font-weight: bold;
            text-align: center;
          }
        }
      }
    }
    .right {
      padding-right: 30px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      .name-container {
        display: flex;
        align-items: center;
        padding-right: 20px;
        .img {
          padding-right: 10px;
        }
      }
    }
  }
  .home-body-container {
    background: orange;
    height: calc(100% - @70);
  }
}
</style>
