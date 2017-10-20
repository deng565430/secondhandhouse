<template>
<div id="projectdetails">
	<div class="xqTitle">
  		<MyTitle :title="title"></MyTitle>
  		<router-link tag="div" :to="{ path: '/projectlist' }" class="my-list">
	      	<p>我的列表</p>
	    </router-link>
	</div>

	<Scroll ref="scroll" class="list">
	<div class="xqcontent">
		<div class="publishPeople">
			<div class="title">
				<p>发布人</p>
				<p>已响应<span>2</span>人</p>
			</div>
			<div class="content">
				<div>用户: <span class="name">中原小李</span></div>
				<div>手机号:<span class="phone">138****8888</span></div>
				<div class="hezuo"><span>未合作</span></div>
			</div>
			<div class="footer">
				<span class="defriend">拉黑<i class="icon-blacklist"></i></span>
			</div>
		</div>
		<div class="xuqiuxq">
			<div class="title">
				<p>发布编号: <span class="colors">075213333</span></p>
			</div>
			<div class="xq">
			   <div class="itme">
					<div>单价: <span class="colors">30000/m</span></div>
					<div>阳台: <span class="colors">有</span></div>
					<div>朝向: <span class="colors">朝南</span></div>
			   </div>
			   <div class="itme">
				   	<div>物业类型: <span class="colors">住宅</span></div>
					<div>楼层: <span class="colors">中层</span></div>
					<div>具体楼层: <span class="colors">无</span></div>
			   </div>
				<div class="itme">
					<div>面积: <span class="colors">120</span></div>
					<div>总价: <span class="colors">500</span></div>
					<div>房龄: <span class="colors">1-3年</span></div>
				</div>
				<transition name="fade">
					<div v-show='iszhankai'>
						<div class="itme">
							<div>装修: <span class="colors">毛坯</span></div>
							<div>电梯: <span class="colors">无</span></div>
							<div>物业费: <span class="colors">20</span></div>
						</div>
						<div class="itme">
							<div>户型: <span class="colors">三室两厅</span></div>
							<div>绿化率: <span class="colors">20%-40%</span></div>
						</div>
						<div class="itme">
							<div>小区名: <span class="colors">无</span></div>
							<div>房屋地址: <span class="colors">上海市/松江区</span></div>
						</div>
						<div class="itmes">
							<div>备注: <span class="colors">我是一条很长很长很长很长很长很长很长很长的备注</span></div>
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
				<p>联系详情</p>
			</div>
			<div>
				<Cdetail
				:contants="contants"
				@contactit="contactit"
				@jujue="jujue">
				</Cdetail>
				<!-- <Xqdetail></Xqdetail> -->
			</div>
		</div>
	</div>
	</Scroll>
	<div class="contantfooter">
		<span @click="stopitme" v-show="stopbtns">停止此项目</span>
		<span @click="keyuan" v-show="keyuanisshow">我有客源<i class="icon-phone"></i></span>
	</div>
	<div>
		<!-- 响应方：我有客源 -->
		<Confirm 
		ref="confirm"
		@confirmMsg="confirmMsg"
		></Confirm>
		<!-- 发布方：联系他 -->
		<Confirm 
		ref="confirm2"
		:sendMsg="sendMsg"
		@confirmMsg="confirmMsg2"
		></Confirm>
		<!-- 停止此项目 -->
		<Confirms 
		ref="stopconfirm"
		:text="stoptext"
        @confirm="stopbtn"></Confirms>
        <!-- 拒绝他 -->
		<Confirms 
		ref="stopconfirm2"
		:text="stoptext2"
        @confirm="surejujue"></Confirms>
	</div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Cdetail from 'base/contant-detail/contantDetail'
import Xqdetail from 'base/contant-detail/xiangyingdetail'
import Confirm from 'base/confirm-msg/confirm-msg'
import Confirms from 'base/confirm/confirm'
import {getlists} from 'api/contant.js'
export default {

  name: 'details',
  components: {
    MyTitle,
    Scroll,
    Cdetail,
    Xqdetail,
    Confirm,
    Confirms
  },
  data () {
    return {
      title: '项目详情',
      iszhankai: false,
      zhantext: '展开',
      zhanclass: 'icon-arrow',
      sendMsg: '有的!',
      keyuanisshow: true,
      contants: [],
      stoptext: '确认停止此项目？',
      stoptext2: '确认拒绝TA？',
      stopbtns: true
    }
  },
  created () {
    getlists().then((res) => {
      console.log(res.data)
      this.contants = res.data.data
    })
  },
  methods: {
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
    },
    // 我有客源
    keyuan () {
      this.$refs.confirm.show()
    },
    // 联系他
    contactit () {
      this.$refs.confirm2.show()
    },
    // 我有客源，确认弹出层
    confirmMsg () {
      this.keyuanisshow = false
    },
    // 联系他，确认弹出层
    confirmMsg2 () {
    },
    // 停止项目
    stopitme () {
      this.$refs.stopconfirm.show()
    },
    // 确认停止此项目
    stopbtn () {
      console.log(33)
      this.stopbtns = false
    },
    // 拒绝ta
    jujue () {
      this.$refs.stopconfirm2.show()
    },
    // 确认拒绝他
    surejujue () {
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#projectdetails
  background: #f4f1f4
  .xqTitle
    position:fixed
    top: 0
    left: 0
    width:100%
    z-index: 11111
    .my-list
      position: absolute
      top: 8px
      right: 10px
      font-size: 14px
      color: #fff
      padding: 10px
  .list
    position: fixed
    top: 0
    bottom: 60px
    width: 100%
    background: #f4f1f4
    .xqcontent
      margin-top:50px
      padding: 10px
      margin-bottom: 200px
      padding-bottom: 200px
      .publishPeople
        height:110px
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
  .contantfooter
    position:fixed
    bottom: 0
    left: 0
    width: 100%
    height: 60px
    line-height: 60px
    text-align: right
    font-size: 14px
    background:#fff
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
</style>
