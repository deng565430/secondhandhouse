<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag" @click.stop>
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <div class="title">
            <h2>{{'附言'}}</h2>
          </div>
          <div class="hint">
            <p>提示：</p>
            <span>响应后对方将获得您的联系方式以便及时沟通!</span>
          </div>
          <div class="textarea">
            <textarea placeholder="">有这个地区的楼盘吗？请及时联系！</textarea>
          </div>
          <div class="operate">
            <div @click="cancel" class="operate-btn left">{{cancelBtnText}}</div>
            <div @click="confirm" class="operate-btn right">{{confirmBtnText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      confirmBtnText: {
        type: String,
        default: '确定'
      },
      cancelBtnText: {
        type: String,
        default: '取消'
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      cancel() {
        this.hide()
        this.$emit('cancel')
      },
      confirm() {
        this.hide()
        this.$emit('confirmMsg')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .confirm
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 998
    background-color: $color-background-d
    &.confirm-fade-enter-active
      animation: confirm-fadein 0.3s
      .confirm-content
        animation: confirm-zoom 0.3s
    .confirm-wrapper
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)
      z-index: 999
      .confirm-content
        width: 300px
        border-radius: 13px
        background: $color-highlight-background
        overflow: hidden
        .title
          padding: 15px 0
          border-bottom: 1px solid #ccc
          h2
            text-align: center
            font-size: $font-size-large
        .hint
          display:flex
          padding: 10px 20px
          p
            font-size: $font-size-medium
            line-height: 1.2
            color: red
            width: 65px
          span
            color: black
            line-height: 1.2
        .textarea
          padding:10px 20px
          box-sizing: border-box
          textarea
            width: 98%
            resize: none
            height: 50px
            border: 1px solid #ccc
        .operate
          display: flex
          align-items: center
          text-align: center
          font-size: $font-size-large
          .operate-btn
            flex: 1
            line-height: 22px
            padding: 10px 0
            color: #0894ec
            &.right
              background: #e5672c
              color: #fff
  @keyframes confirm-fadein
    0%
      opacity: 0
    100%
      opacity: 1

  @keyframes confirm-zoom
    0%
      transform: scale(0)
    50%
      transform: scale(1.1)
    100%
      transform: scale(1)
</style>