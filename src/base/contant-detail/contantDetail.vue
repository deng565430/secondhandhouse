<template>
  <div class="contant-detail">
      <ul>
        <li v-for="(item, index) in contants">
          <div class="topheader">
            <span>{{index + 1}}楼:</span>
            <span>{{item.time1}}</span>
            <span></span>
          </div>
          <div  class="content">
            <div class="left">
              <a>{{item.name}}</a>
              <a>{{item.phone}}</a>
              <span>{{item.msg}}</span>
            </div>
            <div class="right" v-if="item.time2">
              <div class="topheader">
                <span>回复：</span>
                <span>{{item.time2}}</span>
                <span></span>
              </div>
              <div class="contents">
                <a>{{item.name2}}</a>
                <span>{{item.huifu}}</span>
              </div>
            </div>
          </div>
          <div   class="footer" v-if="!item.time2">
            <span @click="contactit">联系他</span>
            <span @click="jujue">拒绝</span>
          </div>
        </li>
      </ul>
  </div>
</template>
<script>
  export default {
    props: {
      contants: {
        type: Array,
        default: []
      }
    },
    methods: {
      contactit () {
        this.$emit('contactit')
      },
      jujue () {
        this.$emit('jujue')
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
      a
        text-decoration: underline
        margin-right: 18px
      .right
        text-align: right
        .topheader
          text-align: right
          padding-right: 0
    .footer
      text-align: right
      height: 40px
      line-height: 40px
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
</style>
