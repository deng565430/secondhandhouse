<template>
  <div class="contant-detail">
      <ul v-if="contants.length > 0">
        <li v-for="(item, index) in contants">
          <div class="topheader">
            <a>{{index + 1}}楼</a>
            <span>{{item.createTime}}</span>
          </div>
          <div  class="content">
            <div class="left">
              <a>{{isMy === '0' ? '我: ' : item.username}}</a>
              <a @click="telPhone(item.phone)">{{isMy === '0' ? '' : item.phone}}</a>
              <span>{{item.msg}}</span>
            </div>
            <div class="right" v-if="item.reply != null">
              <div class="topheader">
                <span>{{item.replyTime}}</span>
                <span></span>
              </div>
              <div class="contents">
                <a>{{isMy === '1' ? '我: ' : item.replyName}}</a>
                <a @click="telPhone(item.replyPhone)">{{isMy === '1' ? '' : item.replyPhone}}</a>
                <span>{{item.reply}}</span>
              </div>
            </div>
          </div>
          <div class="footer" v-if="isMy === '1'">
            <div v-if="item.reply == null" >
              <span v-if="item.refuse !== 1" @click="contactHim(item.id)">联系Ta</span>
              <span v-if="item.refuse !== 1" @click="turnDown(item.id)">拒绝</span>
              <span v-else class="refuse">已拒绝</span>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="no-msg">暂时还没有消息哦！</p>
  </div>
</template>
<script>
  export default {
    props: {
      contants: {
        type: Array,
        default: []
      },
      isMy: {
        type: String,
        default: []
      }
    },
    methods: {
      contactHim (id) {
        this.$emit('contactHim', id)
      },
      turnDown (id) {
        this.$emit('turnDown', id)
      },
      telPhone (num) {
        if (num.indexOf('*') < 0) {
          window.location.href = `tel:${num}`
        }
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.contant-detail
  li
    border-bottom: 1px solid #ebebeb
    padding-bottom: 8px
    margin-top: 5px
    .topheader
      height: 20px
      line-height: 20px
      padding: 0 15px
      color: #666
      font-size: 12px
    .content
      padding: 0 15px
      line-height: 22px
      font-size: 14px
      overflow: hidden
      a
        text-decoration: underline
        padding-right: 5px
      .right
        text-align: right
        .topheader
          text-align: right
          padding-right: 0
    .footer
      text-align: right
      span
        display:inline-block
        height:18px
        line-height:18px
        padding:  5px 15px
        background: #f7732e
        color: #fff
        font-size: 12px
        border-radius: 3px
        margin-right:10px
      .refuse
        background: #898989
  .no-msg
    text-align: center
    line-height: 30px
    background: #f4f1f4
</style>
