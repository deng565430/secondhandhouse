<template>
  <div>
    <div class="project-list" v-if="projectList.length">
        <ul>
          <li class="item" v-for="item in projectList">
            <router-link :to="`/detail/${item.roomId}`" tag="div" >
              <div class="item-top">
                <p>{{item.city}}</p>
                <p>{{item.district}}</p>
                <p>{{item.huxing}}</p>
                <p>{{item.totalPrice ? item.totalPrice + '万' : ''}}</p>
              </div>
              <div class="item-center">
                <p>{{item.username}}</p>
                <p>{{item.phone}}</p>
                <p>{{item.type}}</p>
                <p @click.stop="look" v-if="item.ismy === 0"><i :class="item.contact === 0 ? 'icon-people' : 'icon-people2'"></i></p>
              </div>
              <div class="item-bottom">
                <p v-if="item.count">已匹配 <span> {{item.count}} </span>人</p>
                <p v-else style="color: #dc4900">等待匹配...</p>
                <p v-if="item.ismy === 0">
                  <span v-if="item.contact === 0" class="btn bgc" @click.stop="sendMsg">我有客源 <i class="icon-phone"></i></span>
                  <span v-else-if="item.match === 0" style="color:red">等待对方回复</span>
                  <span v-else-if="item.match === 1" style="color:green">查看回复</span>
                </p>
                <p v-else>
                  <span style="color: red">我的项目</span>
                </p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-else style="text-align: center">
        暂无项目
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
      look () {
        alert('我已联系过')
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
          i
            color: #e5672c
      .item-top
        p
          font-size: $font-size-medium
      .item-center
        p:nth-child(2)
          width: 30%
      .item-bottom
        display: flex
        p:first-child
          width: 100px
          line-height: 3
          font-size: $font-size-small
          text-align: left
          padding-left: 18px
          no-wrap()
          span
            color: #e5672c
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
