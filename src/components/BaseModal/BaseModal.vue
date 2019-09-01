<template>
  <!-- 弹窗 -->
  <!-- <transition name="fade"> -->
  <div v-transfer-dom class="base-modal-container" v-show="showModal">
    <div class="modal-container" v-if="showModal" :style="modalStyle">
      <div class="modal-header">
        <slot name="header">
          <div class="slot-modal-header-title" :style="`text-align:${titlePosition}`">{{title}}</div>
        </slot>
        <img v-if="showClose" @click="closeModal" class="close-img" src="./close.png" alt="">
      </div>
      <div class="modal-body">
        <slot>
          <div class="slot-modal-body-content">{{content}}</div>
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <div class="slot-modal-footer">
            <Button class="btn btn-cancel" v-if="showCancel" @click="cancel">{{cancelText}}</Button>
            <Button class="btn" type="primary" v-if="showConfirm" @click="confirm">{{confirmText}}</Button>
          </div>
        </slot>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import TransferDom from "./transform-dom.js";
export default {
  name: "BaseModal",
  directives: { TransferDom },
  props: {
    // 弹窗整体配置  ******************************************************************************************************
    modalHeight: {
      type: Number,
      default: 180
    },
    modalWidth: {
      type: Number,
      default: 360
    },
    // 弹窗内部配置,自上而下  ******************************************************************************************************
    title: {
      type: String,
      default: "标题"
    },
    titlePosition: {
      type: String,
      default: "center"
    },
    showClose: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default:
        "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容"
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    confirmText: {
      type: String,
      default: "确认"
    }
  },
  data() {
    return {
      showModal: false
    };
  },
  computed: {
    modalStyle() {
      return {
        height: this.modalHeight + "px",
        width: this.modalWidth + "px"
      };
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 关闭 modal
    closeModal() {
      this.showModal = false;
    },
    // 取消
    cancel() {
      this.closeModal();
      this.$emit("cancel");
    },
    // 确认
    confirm() {
      this.$emit("confirm");
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="less">
@import url(./style.less);
</style>
