<template>
<div id="projectdetails">
  <div class="mengceng" v-if="mengcengFlag">
    <img :src="mengcengImg" alt="" @click="hideMengceng">
  </div>
	<div class="xqTitle">
  		<MyTitle :title="title"></MyTitle>
	</div>
	<Scroll ref="scroll" class="list" :data="contantsNews">
	<div class="xqcontent">
		<div class="publishPeople">
			<div class="title">
				<p>发布时间：{{projectDetailsList.create_time}}</p>
				<p>已匹配<span>{{count == 'null' ? 0 : count}}</span>人</p>
			</div>
			<div class="content">
				<div>发布人: <span class="name">{{projectDetailsList.username}}</span></div>
				<div @click="telPhone(projectDetailsList.phone)">手机号:<span class="phone">{{projectDetailsList.phone}} <img class="phone-img" :src="projectDetailsList.phone ? (projectDetailsList.phone.indexOf('*') > -1 ? '' : phoneImg) : ''" alt=""></span></div>
				<div v-if="ismy === '0'" class="hezuo"><span>{{match === '0' ? '未合作过 ' : '已合作过 '}} <i :class="match === '0' ? 'icon-people' : 'icon-people2'" v-if="ismy === '0'"></i></span></div>
			</div>
			<div style="display: none;" class="footer" v-if="ismy === '0'"  @click="backList">
				<span class="defriend">拉黑<i class="icon-blacklist"></i></span>
			</div>
		</div>
		<div class="xuqiuxq">
			<div class="title">
				<p>编号: <span class="colors">{{projectDetailsList.roomid || projectDetailsList.sourceid}}</span></p>
			</div>
      <div class="xq">
			   <div class="itme">
				   	<div><span>物业类型:  </span><span class="colors"> {{projectDetailsList.type}}</span></div>
					  <div><span>楼层: </span><span class="colors">{{projectDetailsList.floor}}</span></div>
					  <div><span>具体楼层: </span><span class="colors">{{projectDetailsList.concreteFloor}}</span></div>
			   </div>
            <div class="itme">
              <div><span>面积: </span><span class="colors">{{projectDetailsList.area}}</span></div>
              <div><span>总价: </span><span class="colors">{{projectDetailsList.totalPrice ? projectDetailsList.totalPrice + '万' : ''}}</span></div>
              <div><span>房龄: </span><span class="colors">{{projectDetailsList.roomAge}}</span></div>
            </div>
         <div class="itme">
            <div style="width: 100%"><span>房屋地址: </span><span class="colors">{{projectDetailsList.address}}</span></div>
          </div>
          <div class="itme">
              <div><span>小区名:  </span><span class="colors"> &nbsp;{{projectDetailsList.name}}</span></div>
              <div v-if="mark === 2"><span>户籍: </span><span class="colors">{{projectDetailsList.census}}</span></div>
            </div>
        <transition name="fade">
          <div v-show='iszhankai'>
           <div class="itme">
             <div><span>单价: </span><span class="colors">{{projectDetailsList.price ? projectDetailsList.price + '/m' : ''}}</span></div>
             <div><span>阳台: </span><span class="colors">{{projectDetailsList.balcony}}</span></div>
             <div><span>朝向: </span><span class="colors">{{projectDetailsList.face}}</span></div>
           </div>
						<div class="itme">
							<div><span>装修: </span><span class="colors">{{projectDetailsList.decoration}}</span></div>
							<div><span>电梯: </span><span class="colors">{{projectDetailsList.elevator}}</span></div>
							<div><span>物业费: </span><span class="colors">{{projectDetailsList.propertyCosts}}</span></div>
						</div>
						<div class="itme">
							<div><span>户型: </span><span class="colors">{{projectDetailsList.huxing}}</span></div>
							<div><span>绿化率: </span><span class="colors">{{projectDetailsList.greenRate}}</span></div>
						</div>
            <div class="itme" v-if="mark === '2'">
              <div><span>首付预算: </span><span class="colors">{{projectDetailsList.downPaymentl}}</span></div>
              <div><span>社保: </span><span class="colors">{{projectDetailsList.social}}</span></div>
              <div><span>客源人数: </span><span class="colors">{{projectDetailsList.clientCount}}</span></div>
            </div>
						<div class="itmes">
							<div>备注: <span class="colors">{{projectDetailsList.remark}}</span></div>
						</div>
					</div>
				</transition>
				<div class="zhankai" @click="zhankai">
					<a>{{zhantext}}</a><i :class="zhanclass"></i>
				</div>
			</div>
		</div>
		<div class="lxdetails">
			<div class="title">
        <p>联系详情<span v-html="contantsNewsNum === '-1' ? '' : contantsNewsNum + '条消息未处理'"></span></p>
			</div>
			<div>
				<Cdetail
				:contants="contantsNews"
				@contactHim="contactHim"
				@turnDown="turnDown"
        :isMy="ismy">
				</Cdetail>
				<!-- <Xqdetail></Xqdetail> -->
			</div>
		</div>
  	<div class="contantfooter">
  		<p v-if="ismy === '1'" >
        <span v-if="projectDetailsList.isstop === 0" @click="stopProject"v-show="stopbtns">停止此项目</span>
        <span v-else style="background:#ccc">此项目已停止</span>
      </p>

  	</div>
  </div>
  </Scroll>
  <div  v-if="ismy === '0'" class="add-contantfooter">
    <p><span v-if="contantsNews.length < 1" @click="keyuan"v-show="keyuanisshow">我有{{mark === '1' ? '客源' : '房源'}}<i class="icon-phone"></i></span></p>
  </div>
	<div>
		<confirm-msg :hintMsg="hintMsg" ref="confirmMsg" :msgFlag="msgFlag" :text="confirmMsgText" @confirmMsg="isConfirmMsg" :sendMsg="confirmMsgSendMsg"></confirm-msg>
    <confirm ref="confirm" :text="confirmText" :refresh="refresh" @confirm="confirm"></confirm>
	</div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Cdetail from 'base/contant-detail/contantDetail'
import Xqdetail from 'base/contant-detail/xiangyingdetail'
import ConfirmMsg from 'base/confirm-msg/confirm-msg'
import Confirm from 'base/confirm/confirm'
import { getDetails, addBlackList, getDetailsNews, replyClientResponse, updateClientSourceStatus, refuseClientResponse, addClientResponse } from 'api/details.js'
import { getFirstVisited } from 'api/getFirstVisited'
import { timeFormat } from 'common/js/util.js'
import TYPE from 'common/js/buryingpointType'
import { addLog } from 'api/buryingpoint'
export default {

  name: 'details',
  components: {
    MyTitle,
    Scroll,
    Cdetail,
    Xqdetail,
    ConfirmMsg,
    Confirm
  },
  data () {
    return {
      mengcengImg: require('common/image/mengceng005.jpg'),
      mengcengFlag: false,
      projectDetailsList: {},
      phoneImg: require('common/image/telephone.png'),
      title: this.$route.query.mark === '2' ? '客源详情' : '房源详情',
      hintMsg: '回复消息之后双方都可以看到联系方式！',
      isStopThisProject: true,
      iszhankai: false,
      zhantext: '展开',
      zhanclass: 'icon-arrow',
      sendMsg: '有的!',
      confirmText: '',
      confirmMsgText: '',
      confirmMsgSendMsg: '',
      // 判断回复还是发送消息开关
      msgFlag: 1,
      contantsNews: [],
      contantsNewsNum: '-1',
      refresh: false,
      keyuanisshow: true,
      stopbtns: true,
      id: this.$route.query.id,
      match: this.$route.query.match,
      contact: this.$route.query.contact,
      ismy: this.$route.query.ismy,
      mark: this.$route.query.mark,
      count: this.$route.query.count,
      userId: '',
      replyId: '',
      turnDownId: ''
    }
  },
  created () {
    // 判断是否是首次访问
    getFirstVisited('secondhousedetail').then(res => {
      if (res.data.data === 0) {
        this.mengcengFlag = true
      }
    })
    setTimeout(function () {
      addLog(TYPE.ERSHOUFANGXIANGQING, '', '', '', window.USERMSG)
    }, 1500)
    this._getDetails()
  },
  methods: {
    // 点击隐藏蒙层
    hideMengceng () {
      this.mengcengFlag = false
    },
    zhankai () {
      if (!this.iszhankai) {
        this.iszhankai = true
        this.zhantext = '折叠'
        this.zhanclass = 'icon-pull-up'
      } else {
        this.iszhankai = false
        this.zhantext = '展开'
        this.zhanclass = 'icon-arrow'
      }
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 30)
    },
    // 拨打电话
    telPhone (num) {
      if (num.indexOf('*') < 0) {
        window.location.href = `tel:${num}`
      }
    },
    // 拉黑名单
    backList () {
      this.confirmText = '确定加入黑名单?'
      this.$refs.confirm.show()
    },
    // 我有客源
    keyuan () {
      this.msgFlag = 2
      this.$refs.confirmMsg.show()
    },
    // 停止
    stopProject () {
      this.confirmText = '是否停止此项目?'
      this.$refs.confirm.show()
    },
    // 联系他
    contactHim (data) {
      this.msgFlag = 1
      this.replyId = data
      this.$refs.confirmMsg.show()
    },
    // 联系详情拒绝消息
    turnDown (id) {
      this.turnDownId = id
      this.confirmText = '确定拒绝联系此人?'
      this.$refs.confirm.show()
    },
    confirm () {
      if (this.confirmText === '确定加入黑名单?') {
        const data = {
          userid: this.userId
        }
        addBlackList(data).then(res => {
          if (res.data.code === 0) {
            this.$router.back()
          }
        })
      } else if (this.confirmText === '是否停止此项目?') {
        const data = {
          id: this.id,
          status: 0,
          operate: this.mark
        }
        updateClientSourceStatus(data).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.projectDetailsList.isstop = 1
          }
        })
      } else if (this.confirmText === '确定拒绝联系此人?') {
        const data = {
          refuse: 1,
          mark: this.mark,
          id: this.turnDownId
        }
        refuseClientResponse(data).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this._getDetailsNews()
          }
        })
      } else if (this.confirmText === '回复成功！') {
        this._getDetailsNews()
      }
    },
    // 确定发送消息
    isConfirmMsg (msg) {
      console.log(msg)
      if (msg.flag === 2) {
        const data = {
          mark: this.mark,
          id: this.id,
          msg: msg.msg
        }
        this._addClientResponse(data)
      } else {
        const data = {
          mark: this.mark,
          id: this.replyId,
          reply: msg.msg
        }
        console.log(data)
        this._replyClientResponse(data)
      }
    },
    _getDetails () {
      const data = {
        id: this.id,
        match: this.match,
        mark: this.mark,
        ismy: this.ismy
      }
      getDetails(data).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.projectDetailsList = res.data.data ? res.data.data : {}
          this.projectDetailsList.create_time = this.projectDetailsList.create_time ? timeFormat('yyyy-MM-dd hh:mm', new Date(this.projectDetailsList.create_time)) : ''
          this.userId = res.data.data ? (res.data.data.userid ? res.data.data.userid : '') : ''
          this._getDetailsNews()
        }
      })
    },
    _getDetailsNews () {
      const data = {
        id: this.id,
        mark: this.mark,
        ismy: this.ismy,
        match: this.match,
        start: 0,
        length: 10
      }
      const self = this
      getDetailsNews(data).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          res.data.data && res.data.data.filter(function (item) {
            item.replyName = self.projectDetailsList.username
            item.replyPhone = self.projectDetailsList.phone
          })
          self.contantsNews = res.data.data ? res.data.data : []
          self.contantsNewsNum = res.data.msg ? res.data.msg : -1
          console.log(self.contantsNews)
        }
      })
    },
    _replyClientResponse (data) {
      replyClientResponse(data).then(res => {
        if (res.data.code === 0) {
          this._getDetailsNews()
        }
      })
    },
    _addClientResponse (data) {
      addClientResponse(data).then(res => {
        if (res.data.code === 0) {
          this._getDetailsNews()
        }
      })
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

#projectdetails
  background: #f4f1f4
  .mengceng
    position: fixed
    top: 0
    left: 0
    right: 0
    buttom: 0
    z-index: 999999
    width: 100%
    height: 100%
    img
      width: 100%
      height: 100%
  .xqTitle
    position:fixed
    top: 0
    left: 0
    width:100%
    z-index: 2
    .my-list
      position: absolute
      top: 8px
      right: 10px
      font-size: 14px
      color: #fff
      padding: 10px
      font-size: $font-size-medium
      p
        font-size: $font-size-medium-x
        i
          vertical-align: top
          font-size: $font-size-medium
  .list
    position: fixed
    top: 0
    bottom: 50px
    width: 100%
    background: #f4f1f4
    .xqcontent
      margin-top:50px
      padding: 10px
      .publishPeople
        font-size: 14px
        color: #fff
        .title
         display: flex
         background: #f7732e
         height: 25px
         line-height: 25px
         border-radius: 5px 5px 0 0
         padding: 0 15px
         justify-content: space-between
        .content
         display: flex
         background: #fff
         color: #333333
         height: 38px
         line-height: 38px
         justify-content: space-between
         padding: 0 15px
         border-bottom: 1px solid #ebebeb
         .name, .phone
           color: #f7732e
         .hezuo
           color: #666
           i
             color: #e5672c
         .phone-img
          width: 12px
          vertical-align: middle
        .footer
         height: 46px
         line-height: 46px
         border-radius: 0 0 5px 5px
         background: #fff
         text-align: right
         padding-right: 10px
         .defriend
           display: inline-block
           width: 57px
           height: 21px
           border: 1px solid #000
           border-radius: 3px
           color: #000
           line-height: 21px
           text-align:center
           i
            margin-left: 3px
      .xuqiuxq
        margin-top: 10px
        background: #fff
        font-size: 14px
        border-radius: 5px
        .title
          color: #fff
          background: #f7732e
          height: 25px
          line-height: 25px
          border-radius: 5px 5px 0 0
          padding: 0 15px
        .xq
         border-radius: 0 0 5px 5px
         .fade-enter-active
           transition: all 1s ease
		    .fade-enter, .fade-leave-active
           opacity: 0
         .itme
           height: 34px
           line-height: 34px
           border-bottom:1px solid #ebebeb
           display: flex
           justify-content: space-between
           padding: 0 15px
           font-size: $font-size-small
           overflow: hidden
           >div
             width: 33.33%
             overhidden: hidden
             display: flex
           .colors
             color: #f7732e
          .itmes
             padding: 7px 15px
             div
               line-height: 22px
             .colors
               color: #f7732e
          .zhankai
            text-align: center
            height: 38px
            line-height: 38px
            color: #666
            a
              display:inline-block
              text-decoration: underline
              margin-right: 3px
            i
              font-size:10px
      .lxdetails
         margin-top: 10px
         background: #fff
         font-size: 14px
         border-radius: 5px
         .title
          color: #fff
          background: #f7732e
          height: 25px
          line-height: 25px
          border-radius: 5px 5px 0 0
          padding: 0 15px
          span
            float: right
  .contantfooter
    width: 100%
    line-height: 40px
    text-align: right
    font-size: 14px
    box-sizing: border-box
    padding: 0 10px
    span
      display:inline-block
      height:22px
      line-height: 22px
      background: #f7732e
      margin-left: 10px
      color: #fff
      border-radius: 3px
      padding: 5px 15px
      i
        margin-left: 5px
        font-size: $font-size-medium
.add-contantfooter
  position: fixed
  bottom: 0
  width: 100%
  line-height: 40px
  text-align: right
  font-size: 14px
  box-sizing: border-box
  padding: 0 10px
  span
    display:inline-block
    height:22px
    line-height: 22px
    background: #f7732e
    margin-left: 10px
    color: #fff
    border-radius: 3px
    padding: 5px 15px
    i
      margin-left: 5px
      font-size: $font-size-medium
</style>
