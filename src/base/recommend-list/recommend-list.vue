<template>
  <div>
    <div class="project-list">
        <ul>
          <li class="item" v-for="item in projectList">
            <router-link :to="'/detail/1'" tag="div" >
              <div class="item-top">
                <p>上海</p>
                <p>曹阳</p>
                <p>二室一厅</p>
                <p>500万</p>
              </div>
              <div class="item-center">
                <p>中原小李</p>
                <p>13000000000</p>
                <p>别墅</p>
                <p><i class="icon-people2"></i></p>
              </div>
              <div class="item-bottom">
                <p>已响应2人</p>
                <p>
                  <span class="btn" @click.stop="backList">拉黑 <i class="icon-blacklist"></i></span>
                  <span class="btn bgc" @click.stop="sendMsg">我有客源 <i class="icon-phone"></i></span>
                </p>
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
      projectList: {
        type: Array,
        default: []
      }
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
    .item
      background: #fff
      margin: 0 5px 10px 5px
      padding: 10px
      .item-top, .item-center
        display: flex
        justify-content: space-around
        p
          line-height: 3
          text-align: center
          font-size: $font-size-small
          no-wrap()
      .item-top
        p
          font-size: $font-size-medium
          font-weight: 600
      .item-center
        p:nth-child(2)
          width: 30%
      .item-bottom
        display: flex
        p:first-child
          width: 100px
          line-height: 3
          text-align: left
          no-wrap()
        p:last-child
          box-sizing: border-box
          padding-top: 10px
          width: 100%
          span
            float: right
            margin: 0 5px
          .btn
            display: inline-block
            padding: 5px 10px
            border-radius: 4px
            border: 1px solid black
            i
              color: #000
          .bgc
            background: #e5672c
            border: 1px solid #e5672c
            color: #fff
            i
              color: #fff
</style>
