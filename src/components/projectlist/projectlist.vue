<template>
<div id="projectlists">
  <div class="titles">
	 <MyTitle :title="title"></MyTitle>
	 <!-- <router-link tag="div" :to="{ path: '/search' }"  class="search">
	       <i class="icon-search"></i>
	      </router-link> -->
  </div>
  <div class="contants">
  	<div class="headertabs">
  	   <select class="selectcss" @change="changeselect" ref="selectes">
	    	<option v-for="(itme, index) in selects">{{itme}}</option>
	    </select>
  		<ul class="tabbtn">
          <li 
          v-for="(itme, index) in tabs" 
          :class="bkindex === index ? 'active': ''"
          @click="tabsqh(index)">{{itme}}</li>
        </ul>
  	</div>
  	<div class="contanttab">
  		<ul class="ctwrap">
  			<li 
  			v-for="(itme, index) in contentbat" 
            :class="bdactive === index ? 'active': ''"
            @click="contenttab(index)">{{itme.status}}<span style="color:#e5672c">{{itme.count}}</span></li>
  		</ul>
  		<div>
  			<ProjectList></ProjectList>
  		</div>
  	</div>
  </div>
</div>
</template>

<script>
import MyTitle from 'base/title/title'
import ProjectList from 'base/project-list/project-list.vue'
import {getprojectList, getfabuNum} from 'api/myList.js'
export default {

  name: 'projectlist',
  components: {
    MyTitle,
    ProjectList
  },
  data () {
    return {
      title: '我的列表',
      tabs: ['房源', '客源'],
      contentbat: ['全部', '待响应', '待联系', '已停止'],
      selects: ['发布', '响应'],
      bkindex: 0,
      bdactive: 0
    }
  },
  created () {
    this._getfabuNum()
    getprojectList().then((res) => {
      console.log(res)
    })
  },
  methods: {
    // 获取 发布的房源
    _getfabuNum () {
      getfabuNum().then((res) => {
        console.log(res.data.data)
        this.contentbat = res.data.data
      })
    },
    tabsqh (index) {
      this.bkindex = index
    },
    // 四个切换
    contenttab (index) {
      this.bdactive = index
    },
    changeselect () {
      console.log(this.$refs.selectes.value)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
#projectlists
  background: #f4f1f4
  .titles
    position:fixed
    top: 0
    left: 0
    width:100%
    z-index: 11111
    .search
      position: absolute
      top: 6px
      right: 10px
      font-size: 20px
      color: #fff
      padding: 10px
  .contants
     margin-top: 50px
     .headertabs
       position: relative
       height: 40px
       line-height: 40px
       background: linear-gradient(left, #ee6354, #f87529)
       display: flex
       justify-content: center
       .selectcss
         position: absolute
         left: 10px
         top: 3px
         padding: 0 3px 0 3px
         border: solid 1px #fff
         border-radius: 3px
         height: 26px
         line-height: 26px
         background: none
         color: #fff
       .tabbtn
         height: 30px
         display: flex
         text-align: center
         line-height: 30px
         color: #fff
         font-size: 16px
         border: 1px solid #fff
         border-radius: 5px
         li
           width: 50%
           padding: 0 30px
         li:nth-child(1)
           border-right: 1px solid #fff
         .active
            background: #fff
            color: #e5672c
     .contanttab
       height: 40px
       line-height: 40px
       background: #fff
       .ctwrap
         display: flex
         font-size: 16px
         text-align: center
         color: #666
         text-align:justify
         li
           width: 25%
           text-align: center
           border-right: 1px solid #d2d2d2
           border-bottom: 1px solid #d2d2d2
           color: #a2a2a2
         li:last-child
           border-right: 0 
         .active
           border-bottom: 2px solid #ff5500
           color: #000
</style>