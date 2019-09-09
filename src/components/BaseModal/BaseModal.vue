<template>
  <!-- 弹窗 -->
  <!-- <transition name="fade"> -->
  <div class="base-modal-container" v-show="showModal" v-transfer-dom>
    <div :style="modalStyle" class="modal-container" v-if="showModal">
      <div class="modal-header">
        <slot name="header">
          <div :style="`text-align:${titlePosition}`" class="slot-modal-header-title">{{title}}</div>
        </slot>
        <img @click="closeModal" alt class="close-img" src="./close.png" v-if="showClose" />
      </div>
      <div class="modal-body">
        <slot>
          <div class="slot-modal-body-content">{{content}}</div>
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <div class="slot-modal-footer">
            <Button @click="cancel" class="btn btn-cancel" v-if="showCancel">{{cancelText}}</Button>
            <Button @click="confirm" class="btn" type="primary" v-if="showConfirm">{{confirmText}}</Button>
          </div>
        </slot>
      </div>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
import TransferDom from "./transform-dom.js"
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
      default: "关闭"
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
    }
  },
  computed: {
    modalStyle() {
      return {
        height: this.modalHeight + "px",
        width: this.modalWidth + "px"
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 关闭 modal
    closeModal() {
      this.showModal = false
    },
    // 取消
    cancel() {
      this.closeModal()
      this.$emit("cancel")
    },
    // 确认
    confirm() {
      this.$emit("confirm")
    }
  },
  components: {}
}
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
@import url(./BaseModal.less);
</style>
