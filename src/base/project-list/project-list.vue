<template>
  <div>
    <div class="project-list">
        <ul>
          <li class="item">
            <router-link :to="'/detail/1'" tag="div" >
              <div class="item-top">
                <p>王**</p>
                <p>发布编号：1355555</p>
                <p>等待响应</p>
              </div>
              <div class="item-center">
                <p>曹阳周边</p>
                <p>500-600万</p>
                <p>138****8888</p>
                <p><i class="icon-people"></i></p>
              </div>
              <div class="item-bottom">
                <div class="btn" @click.stop="backList">恢复</div>
              </div>
            </router-link>
          </li>
          <li class="item">
            <router-link :to="'/detail/1'" tag="div" >
              <div class="item-top">
                <p>王**</p>
                <p>发布编号：1355555</p>
                <p>等待响应</p>
              </div>
              <div class="item-center">
                <p>曹阳周边</p>
                <p>500-600万</p>
                <p>138****8888</p>
                <p><i class="icon-people"></i></p>
              </div>
              <div class="item-bottom">
                <div class="btn" @click.stop="backList">恢复</div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
    },
    methods: {
      sendMsg () {
        this.$emit('alertMsg')
      },
      backList () {
        this.$emit('blackMsg')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .project-list
    background: #f4f1f4
    padding: 13px 0
    .item
      background: #fff
      margin: 0 5px 10px 5px
      border-radius: 5px
      .item-top
        display: flex
        justify-content: space-between
        height: 30px
        background: #f7732e
        color: #fff
        border-radius: 5px 5px 0 0
        padding: 0 10px
        p
          line-height: 30px
          font-size: 14px
      .item-center
        height: 40px
        line-height: 40px
        display: flex
        justify-content: space-between
        font-size: 14px
        padding: 0 10px
        border-bottom: 1px solid #ebebeb
      .item-bottom
        display: flex
        flex-direction: row-reverse
        padding: 5px 10px
        .btn
          font-size: 14px
          height: 20px 
          line-height: 20px
          border-radius: 4px
          background: #f7732e
          color: #fff
          text-align: right
          padding: 3px 12px
</style>
