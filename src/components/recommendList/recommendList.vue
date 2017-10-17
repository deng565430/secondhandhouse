<template>
<div id="recommendList">
  <div class="title">
    <my-title :title="'二手房市场'"></my-title>
    <router-link tag="div" :to="{ path: '/projectlist' }" class="my-list">
      <p>我的列表</p>
    </router-link>
    <div>
      <div class="top-select">
        <router-link tag="div" :to="{ path: '/addproject' }" class="write">
          <i class="icon-write"></i>
        </router-link>
        <ul class="item-list-show xiangying-top">
          <li v-for="(item, index) in houseList" :key="index" :class="houseListActive === index ? 'active' : ''" @click="houseListEvent(item, index)">{{item}}</li>
        </ul>
        <router-link tag="div" :to="{ path: '/search' }"  class="search">
          <i class="icon-search"></i>
        </router-link>
      </div>
    </div>
    <div class="item-bottom">
      <ul>
        <li v-for="(item, index) in itemSelectType" :class="itemSelectTypeActive === index ? 'active' : ''" @click="selectTypeList(item, index)"><span>{{item.type}}</span> <i :class="[itemSelectTypeActive === index ? 'icon-back-down': 'icon-back-up']"></i></li>
      </ul>
    </div>
  </div>
  <scroll ref="scroll" class="list">
    <div>
      <recommend-list :projectList="projectList" @alertMsg="alertMsg"  @blackMsg="blackMsg"></recommend-list>
    </div>
  </scroll>
  <div>
    <confirm-msg ref="confirmMsg" :text="confirmMsgText" @confirmMsg="isConfirmMsg"></confirm-msg>
    <confirm ref="confirm" :text="confirmText" :refresh="refresh" @confirm="confirm"></confirm>
  </div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import RecommendList from 'base/recommend-list/recommend-list'
import ConfirmMsg from 'base/confirm-msg/confirm-msg'
import Confirm from 'base/confirm/confirm'
export default {
  data () {
    return {
      houseList: ['房源', '客源'],
      houseListActive: 0,
      itemSelectType: [{
        type: '区域'
      }, {
        type: '户型'
      }, {
        type: '总价'
      }],
      projectList: [],
      itemSelectTypeActive: -1,
      confirmMsgText: '',
      confirmText: '',
      refresh: false
    }
  },
  methods: {
    houseListEvent (item, index) {
      this.houseListActive = index
    },
    selectTypeList () {},
    // 发送客源消息
    alertMsg () {
      this.$refs.confirmMsg.show()
    },
    isConfirmMsg () {},
    // 拉入黑名单
    blackMsg () {
      this.confirmText = '确定拉入黑名单？'
      this.$refs.confirm.show()
    },
    confirm () {
      alert('确定')
    }
  },
  components: {
    MyTitle,
    ConfirmMsg,
    Scroll,
    RecommendList,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #recommendList
    font-size: $font-size-large
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 99
    background: #eee
    font-size: $font-size-medium
    .title
      position: fixed
      width: 100%
      text-align: center
      font-size: $font-size-large
      color: white
      z-index: 66
      top: 0
      background: linear-gradient(left, #ee6354, #f87529)
      .my-list
        position: absolute
        right: 10px
        top: 10px
        font-size: $font-size-medium
        padding: 10px
      .top-select
        display: flex
        .write, .search
          width: 100px
          line-height: 35px
          font-size: $font-size-large
          text-align:right
          padding-right: 10px
          box-sizing: border-box
          padding-left: 10px
        .write
          font-size: $font-size-large-x
          text-align:left
        .item-list-show
          width: 100%
          display: flex
          height: 30px
          margin-bottom: 10px
          li
            color: black
            font-size: $font-size-medium
            border: 1px solid #fff
            line-height: 30px
            width:50%
            height: 30px
            color: #fff
          li:nth-child(1)
            border-radius: 5px 0 0 5px
            border-right: none
          li:nth-child(2)
            border-radius: 0 5px 5px 0
            border-left: none
          .active
            background: #fff
            color: #e5672c
    .list
      position: fixed
      top: 0
      bottom: 150px
      width: 100%
      padding-top: 135px
    .item-bottom
      ul
        display: flex
        background: #fff
        color: black
        justify-content: space-around
        border-bottom: 1px solid #eee
        li
          color: #333
          width: 33.33%
          font-size: $font-size-medium
          transition: all .3s
          line-height: 40px
          text-align: center
          i
            font-size: $font-size-medium
        .active
          color: #e5672c
</style>