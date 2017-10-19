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
  <div class="pop-box">
    <div>
      <select-box v-if="showCitysList" @showCitysListEvent="showCitysListEvent"></select-box>
    </div>
    <pop-box v-if="showTypeList" :typeList="typeList" @showPopBox="showPopBox">
      <div>
        <div class="pop-list">
          <ul class="pop-list-child" v-if="typeList.length">
            <li v-for="(item, index) in typeList" :class="[index === selectTypeIndexRoom ? 'select-type-index' : '']" @click.stop.prevent="selectTypeRoom(item, index)">
                  {{item.type}}
            </li>
          </ul>
          <ul class="pop-list-child" v-if="itemSelectTypeActive === 1">
            <li v-for="(item, index) in typeListHall" :class="[index === selectTypeIndexHall ? 'select-type-index' : '']" @click.stop.prevent="selectTypeHall(item, index)">
                  {{item.type}}
            </li>
          </ul>
        </div>
        <div class="pop-city-btn">
          <a @touchstart.prevent="selectTypeConfirm">确定选择</a>
        </div>
      </div>
    </pop-box>
  </div>
  </div>
  <scroll
      class="list"
      :data="projectList"
      ref="scroll"
      :listenScroll="true"
      :pullup="true"
      @scrollToEnd="searchMore">
    <div>
      <recommend-list :projectList="projectList" @alertMsg="alertMsg"></recommend-list>
      <loading v-show="hasMore" title=""></loading>
        <div v-show="!hasMore" class="no-result-wrapper">
          <p>{{noResultWrapper}}</p>
        </div>
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
import Loading from 'base/loading/loading'
import RecommendList from 'base/recommend-list/recommend-list'
import ConfirmMsg from 'base/confirm-msg/confirm-msg'
import Confirm from 'base/confirm/confirm'
import SelectBox from 'base/select-box/select-box'
import PopBox from 'base/pop-box/pop-box'
import { secondhHand } from 'api/recommendList'
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
      hasMore: true,
      noResultWrapper: '',
      projectList: [],
      itemSelectTypeActive: -1,
      confirmMsgText: '',
      confirmText: '',
      refresh: false,
      showCitysList: false,
      showTypeList: false,
      selectTypeIndexRoom: -1,
      selectTypeIndexHall: -1,
      typeList: [],
      typeListRoom: [{
        type: '一室',
        data: 1
      }, {
        type: '二室',
        data: 2
      }, {
        type: '三室',
        data: 3
      }, {
        type: '四室',
        data: 4
      }, {
        type: '五室',
        data: 5
      }, {
        type: '其他',
        data: 0
      }],
      typeListHall: [{
        type: '一厅',
        data: 1
      }, {
        type: '二厅',
        data: 2
      }, {
        type: '三厅',
        data: 3
      }, {
        type: '四厅',
        data: 4
      }, {
        type: '五厅',
        data: 5
      }, {
        type: '其他',
        data: 0
      }],
      totalPrice: [{
        type: '无',
        minPrice: null,
        maxPrice: null
      }, {
        type: '100万以下',
        minPrice: null,
        maxPrice: '100'
      }, {
        type: '100-300万',
        minPrice: '100',
        maxPrice: '300'
      }, {
        type: '300-500万',
        minPrice: '300',
        maxPrice: '500'
      }, {
        type: '500-800万',
        minPrice: '500',
        maxPrice: '800'
      }, {
        type: '800-1200万',
        minPrice: '800',
        maxPrice: '1200'
      }, {
        type: '1200-2000万',
        minPrice: '1200',
        maxPrice: '2000'
      }, {
        type: '2000-5000万',
        minPrice: '2000',
        maxPrice: '5000'
      }, {
        type: '5000万以上',
        minPrice: '5000',
        maxPrice: null
      }],
      room: null,
      hall: null,
      sendData: {
        /* 省 */
        prov: null,
        /* 市 */
        city: null,
        /* 区 */
        district: null,
        /* 室 */
        room: null,
        /* 厅 */
        hall: null,
        /* 总价 */
        minPrice: null,
        maxPrice: null,
        /* 开始 */
        start: 0,
        /* 长度 */
        length: 10,
        mark: 1
      },
      saveDataType: null,
      saveDataHall: null
    }
  },
  created () {
    this._secondhHand(this.sendData)
  },
  methods: {
    houseListEvent (item, index) {
      this.houseListActive = index
      this.showTypeList = false
      this.showCitysList = false
      this.itemSelectType = [{
        type: '区域'
      }, {
        type: '户型'
      }, {
        type: '总价'
      }]
      this.sendData = {
        mark: this.houseListActive + 1,
        /* 省 */
        prov: null,
        /* 市 */
        city: null,
        /* 区 */
        district: null,
        /* 室 */
        room: null,
        /* 厅 */
        hall: null,
        /* 总价 */
        minPrice: null,
        maxPrice: null,
        /* 开始 */
        start: 0,
        /* 长度 */
        length: 10
      }
      this._secondhHand(this.sendData)
      this.hasMore = true
      this.noResultWrapper = '加载更多'
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 30)
    },
    // 区域条件筛选
    selectTypeList (item, index) {
      console.log(index)
      this.itemSelectTypeActive = index
      if (index === 0) {
        this.showCitysList = true
        this.showTypeList = false
      } else if (index === 1) {
        this.typeList = this.typeListRoom
        this.showTypeList = true
        this.showCitysList = false
      } else {
        this.typeList = this.totalPrice
        this.showTypeList = true
        this.showCitysList = false
      }
    },
    showPopBox () {},
    // 选择几室几厅
    selectTypeRoom (item, index) {
      this.selectTypeIndexRoom = index
      this.room = item.type
      this.saveDataType = item
    },
    selectTypeHall (item, index) {
      this.selectTypeIndexHall = index
      this.hall = item.type
      this.saveDataHall = item
    },
    // 确定选择
    selectTypeConfirm () {
      if (this.typeList[0].minPrice !== undefined || this.typeList[0].maxPrice !== undefined) {
        console.log(this.selectTypeIndexRoom)
        if (this.selectTypeIndexRoom === -1) {
          this.itemSelectType[this.itemSelectTypeActive].type = '总价'
        } else {
          this.sendData.minPrice = this.typeList[this.selectTypeIndexRoom].minPrice
          this.sendData.maxPrice = this.typeList[this.selectTypeIndexRoom].maxPrice
          this.itemSelectType[this.itemSelectTypeActive].type = this.room
        }
      } else {
        if (this.selectTypeIndexRoom === -1 && this.selectTypeIndexHall === -1) {
          this.itemSelectType[this.itemSelectTypeActive].type = '户型'
        } else {
          // 判断所选择的是否包含 '其他'
          let data = ((((this.room != null ? this.room : '') === '其他' ? '' : this.room) == null ? '' : ((this.room != null ? this.room : '') === '其他' ? '' : this.room)) + (((this.hall != null ? this.hall : '') === '其他' ? '' : this.hall) == null ? '' : ((this.hall != null ? this.hall : '') === '其他' ? '' : this.hall))) === '' ? '其他' : ((((this.room != null ? this.room : '') === '其他' ? '' : this.room) == null ? '' : ((this.room != null ? this.room : '') === '其他' ? '' : this.room)) + (((this.hall != null ? this.hall : '') === '其他' ? '' : this.hall) == null ? '' : ((this.hall != null ? this.hall : '') === '其他' ? '' : this.hall)))
          console.log(data)
          this.sendData.room = this.saveDataType ? this.saveDataType.data : null
          this.sendData.hall = this.saveDataHall ? this.saveDataHall.data : null
          this.itemSelectType[this.itemSelectTypeActive].type = data
        }
      }
      console.log(this.sendData)
      this._secondhHand(this.sendData)
      this.selectTypeIndexRoom = -1
      this.selectTypeIndexHall = -1
      this.room = null
      this.hall = null
      this.saveDataType = null
      this.saveDataHall = null
      this.showTypeList = false
    },
    // 选择的省市区
    showCitysListEvent (data) {
      // 保存省市区
      this.sendData.prov = data.provinceActive
      this.sendData.city = data.cityActive
      this.sendData.district = data.districtlistActive
      if (data.districtlistActive !== '' && data.districtlistActive !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.districtlistActive
      } else if (data.cityActive !== '' && data.cityActive !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.cityActive
      } else if (data.provinceActive !== '' && data.provinceActive !== '全部') {
        this.itemSelectType[this.itemSelectTypeActive].type = data.provinceActive
      } else {
        this.itemSelectType[this.itemSelectTypeActive].type = '区域'
      }
      this.showCitysList = false
    },
    // 发送客源消息
    alertMsg () {
      this.confirmText = '11'
      this.$refs.confirmMsg.show()
    },
    isConfirmMsg () {},
    confirm () {
      alert('确定')
    },
    // 下拉加载
    searchMore () {
      this.hasMore = true
      this.sendData.start ++
      secondhHand(this.sendData).then(res => {
        if (res.data.draw === 0) {
          this.hasMore = false
          if (res.data.data.length < 1) {
            this.noResultWrapper = '没有更多了！'
          } else {
            this.noResultWrapper = '加载更多'
          }
          this.projectList = this.projectList.concat(res.data.data)
        }
      })
    },
    _secondhHand (data) {
      secondhHand(data).then(res => {
        if (res.data.draw === 0) {
          this.hasMore = false
          if (this.data.data.length < 1) {
            this.noResultWrapper = ''
          }
          this.projectList = res.data.data
          console.log(this.projectList)
        }
        setTimeout(() => {
          this.hasMore = true
        }, 20)
      })
    }
  },
  components: {
    MyTitle,
    ConfirmMsg,
    Scroll,
    RecommendList,
    Confirm,
    SelectBox,
    PopBox,
    Loading
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
    .pop-box
      display: flex
      .pop-list
        display: flex
        width: 100%
        background: #fff
        .pop-list-child
          background: white
          width: 50%
          padding-left: 10px
          li
            width: 100%
            text-align: left
            line-height: 30px
            color: #7b7b7b
            box-sizing: border-box
            font-size: $font-size-small
          .select-type-index
            background: #f9742a
            color: white
      .pop-city-btn
        padding-top: 5px
        height: 50px
        background: $color-highlight-background
        a
          display: inline-block
          background #13CE66
          color: white
          padding: 10px 20px
          border-radius: 6px
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
    .no-result-wrapper
      text-align: center
      z-index: 800
      p
        line-height: 30px
</style>