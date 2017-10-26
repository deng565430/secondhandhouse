<template>
<div id="addProject">
  <div class="title">
    <my-title :title="'发布需求'"></my-title>
    <router-link tag="div" :to="{ path: '/projectlist' }" class="my-list">
      <p>我的 <i class="icon-people2"></i></p>
    </router-link>
    <div class="top-select">
      <ul class="item-list-show xiangying-top">
          <li v-for="(item, index) in houseList" :key="index" :class="houseListActive === index ? 'active' : ''" @click="houseListEvent(item, index)">{{item}}</li>
        </ul>
    </div>
  </div>
  <div>
    <scroll ref="scroll" class="list" :beforeScroll="true" @beforeScroll="beforeScroll">
      <div>
        <div class="select-list">
          <div class="sof-hint" v-if="!isDisable">
            <p>温馨提示： 带 <span> * </span> 号是必填项</p>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '*' : ''}}</span>单价</label>
              <input type="text" placeholder="请输入" v-model="price" name="" value="" class="text">
              <span>元</span>
            </div>
            <div class="item-50" v-if="houseListActive === 0">
              <label class="label-25"><span>*</span>阳台</label>
              <div class="radio">
                <label><input name="yangtai" type="radio" value="1" v-model="balcony" />&nbsp; 有 </label>&nbsp;
                <label><input name="yangtai" type="radio" value="0" v-model="balcony"/>&nbsp; 无 </label>
              </div>
            </div>
            <div class="item-50" v-else>
              <label class="label-40"><span></span>小区名</label>
              <input type="text"  placeholder="请输入" v-model="name" name="" value="" class="text">
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '*' : ''}}</span>朝向</label>
              <select name="" class="select"  v-model="face">
                    <option value="-1">请选择</option>
                    <option value="1">朝东</option>
                    <option value="2">朝南</option>
                    <option value="3">朝西</option>
                    <option value="4">朝北</option>
                    <option value="5">东北</option>
                    <option value="6">东南</option>
                    <option value="7">西南</option>
                  </select>
            </div>
            <div class="item-50">
              <label class="label-40"><span>*</span>物业类型</label>
              <select name="" class="select" v-model="type">
                <option value="-1">请选择</option>
                <option :value="item" v-for="item in tenementTypeList">{{item}}</option>
              </select>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <p><span>*</span>楼层:</p>
              <div class="radio">
                <label><input name="Fruit" type="radio" v-model="floor" value="10001" />&nbsp; 无要求 </label>
                <label><input name="Fruit" type="radio" v-model="floor" value="10002" />&nbsp; 低层 </label>
                <label><input name="Fruit" type="radio" v-model="floor" value="10003" />&nbsp; 中层 </label>
                <label><input name="Fruit" type="radio" v-model="floor" value="10004"/>&nbsp; 高层 </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-40"><span>{{houseListActive === 0 ? '*' : ''}}</span>具体楼层</label>
              <input type="text" placeholder="请输入" v-model="concreteFloor" name="" value="" class="text">
              <span>楼</span>
            </div>
            <div class="item-50">
              <label class="label-25"><span>*</span>面积</label>
              <input type="text" placeholder="请输入" v-model="area" name="" value="" class="text">
              <span>平方</span>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '' : '*'}}</span>总价</label>
              <input type="text" placeholder="请输入" v-model="totalPrice" name="" value="" class="text">
              <span>万元</span>
            </div>
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '*' : ''}}</span>房龄</label>
              <select name="" class="select" v-model="roomAge">
                  <option value="-1">请选择</option>
                  <option value="3年以下">3年以下</option>
                  <option value="3-5年">3-5年</option>
                  <option value="6-10年">6-10年</option>
                  <option value="11-20年">11-20年</option>
                  <option value="21-30年">21-30年</option>
                  <option value="31-50年">31-50年</option>
                  <option value="50年以上">50年以上</option>
              </select>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '*' : ''}}</span>装修</label>
              <select name="" class="select" v-model="decoration">
                <option value="-1" selected>请选择</option>
                <option value="4">豪装</option>
                <option value="3">精装</option>
                <option value="2">简装</option>
                <option value="1">毛坯</option>
              </select>
            </div>
            <div class="item-50">
              <label class="label-25"><span>{{houseListActive === 0 ? '*' : ''}}</span>电梯</label>
              <div class="radio">
                <label><input name="dianti" type="radio" value="1" v-model="elevator" />&nbsp; 有 </label>&nbsp;
                <label><input name="dianti" type="radio" value="0" v-model="elevator" />&nbsp; 无 </label>
              </div>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <label class="label-15"><span></span>物业费</label>
              <input type="text" placeholder="请输入" v-model="propertyCosts" name="" value="" class="text">
              <span class="label-height">元/平方</span>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <label class="label-33"><span>*</span>省:
                  <select name="" class="select" v-model="province" @change="selectProvince" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in provinceList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="province">
                </label>
              <label class="label-33"><span>*</span>市:
                  <select name="" class="select" v-model="city" @change="selectCity" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in cityList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="city">
                </label>
              <label class="label-33"><span>*</span>区:
                  <select name="" class="select" v-model="district" @change="selectDistrict" v-if="!isDisable">
                    <option value="全部" selected="selected">全部</option>
                    <option :value="item" v-for="item in districtList">{{item}}</option>
                  </select>
                  <input v-else type="text" name="" v-model="district">
                </label>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <label class="label-20"><span>*</span>户型</label>
              <select name="" class="select" v-model="room">
                <option value="-1">请选择</option>
                <option value="1">一</option>
                <option value="2">二</option>
                <option value="3">三</option>
                <option value="4">四</option>
                <option value="5">五</option>
                <option value="0">其他</option>
              </select>
              <span class="item-right">室</span>
              <select name="" class="select" v-model="hall">
                <option value="-1">请选择</option>
                <option value="1">一</option>
                <option value="2">二</option>
                <option value="3">三</option>
                <option value="4">四</option>
                <option value="5">五</option>
                <option value="0">其他</option>
              </select>
              <span class="item-right">厅</span>
            </div>
          </div>
          <div class="item-bg">
            <div class="item-50">
              <label class="label-40"><span></span>绿化率</label>
              <select name="" class="select"  v-model="greenRate">
                <option value="-1">请选择</option>
                <option value="无">无</option>
                <option value="10%以下">10%以下</option>
                <option value="10%-20%">10%-20%</option>
                <option value="20%-30%">20%-30%</option>
                <option value="30%-40%">30%-40%</option>
                <option value="40%-50%">40%-50%</option>
                <option value="50%以上">50%以上</option>
              </select>
            </div>
            <div class="item-50" v-if="houseListActive === 0">
              <label class="label-40"><span>{{houseListActive === 0 ? '*' : ''}}</span>小区名</label>
              <input type="text" placeholder="请输入" v-model="name" name="" value="" class="text">
            </div>
            <div class="item-50"  v-if="houseListActive !== 0">
              <label class="label-25"><span>*</span>户籍</label>
              <div class="radio">
                <label><input name="huji" type="radio" value="1" v-model="census" />&nbsp; 本地 </label>&nbsp;
                <label><input name="huji" type="radio" value="2" v-model="census" />&nbsp; 外地 </label>
              </div>
            </div>
          </div>
          <div class="item-bg" v-if="houseListActive !== 0">
            <div class="item-50">
              <label class="label-25"><span></span>社保</label>
              <select name="" class="select" v-model="social">
                <option value="-1">请选择</option>
                <option value="0">无</option>
                <option value="1">1年</option>
                <option value="2">2年</option>
                <option value="3">3年</option>
                <option value="4">4年</option>
                <option value="5">5年</option>
                <option value="5">5年以上</option>
              </select>
            </div>
            <div class="item-50">
              <label class="label-40"><span></span>首付比例</label>
              <select name="" class="select" v-model="downPayment">
                <option value="-1">请选择</option>
                <option value="0">无</option>
                <option value="1">10%以下</option>
                <option value="2">10%-20%</option>
                <option value="3">20%-30%</option>
                <option value="4">30%-40%</option>
                <option value="5">40%-50%</option>
                <option value="5">50%以上</option>
              </select>
            </div>
          </div>
          <div class="item-bg" v-if="houseListActive !== 0">
            <div class="item-100">
              <label class="label-20"><span>*</span>客源人数</label>
              <input type="text" name="" placeholder="请输入" v-model="clientCount" value="" class="text">
            </div>
          </div>
          <div class="item-bg">
            <div class="item-100">
              <div>
                <h6>备注</h6>
                <textarea name="" class="textarea" v-model="remark" placeholder="备注信息" rows="3"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="user-send" v-if="!isDisable">
          <button v-if="isSend" type="button" class="btn send" :class="disabled === true ? 'btn' : 'disabled'" @click.stop.prevent="send">提交</button>
        </div>
      </div>
    </scroll>
  </div>
  <div>
    <confirm ref="confirm" :text="confirmText" :refresh="refresh" @confirm="confirm"></confirm>
  </div>
</div>
</template>

<script>
import { getProvincelist, getDistirctlist, getCitylist, getTypeList, secondHandRoom, secondHandSource } from 'api/addProject'
import MyTitle from 'base/title/title'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
export default {
  name: 'addProject',
  data () {
    return {
      confirmText: '请填写完整',
      isDisable: false,
      isSend: true,
      houseList: ['房源', '客源'],
      houseListActive: 0,
      disabled: true,
      refresh: false,
      province: '全部',
      provinceList: [],
      city: '全部',
      cityList: [],
      district: '全部',
      districtList: [],
      tenementTypeList: [],
      price: null,
      name: null,
      floor: null,
      concreteFloor: null,
      area: null,
      totalPrice: null,
      propertyCosts: null,
      room: -1,
      hall: -1,
      greenRate: -1,
      balcony: null,
      face: -1,
      type: -1,
      roomAge: -1,
      decoration: -1,
      elevator: null,
      remark: null,
      census: null,
      social: -1,
      downPayment: -1,
      clientCount: null
    }
  },
  created () {
    this._getProvincelist()
    this._getTypeList()
  },
  methods: {
    houseListEvent (item, index) {
      this.houseListActive = index
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 30)
    },
    send (e) {
      if (this.type === -1) {
        this.confirmText = '请选择物业类型'
        this.$refs.confirm.show()
        return
      }
      if (this.floor === null) {
        this.confirmText = '请选择楼层'
        this.$refs.confirm.show()
        return
      }
      if (this.area === null) {
        this.confirmText = '请输入面积'
        this.$refs.confirm.show()
        return
      }
      if (this.province === '全部') {
        this.confirmText = '请选择省份'
        this.$refs.confirm.show()
        return
      }
      if (this.city === '全部') {
        this.confirmText = '请选择城市'
        this.$refs.confirm.show()
        return
      }
      if (this.room === -1) {
        this.confirmText = '请选择户型'
        this.$refs.confirm.show()
        return
      }
      if (this.hall === -1) {
        this.confirmText = '请选择户型'
        this.$refs.confirm.show()
        return
      }
      if (this.houseListActive === 0) {
        if (this.price === null) {
          this.confirmText = '请输入单价'
          this.$refs.confirm.show()
          return
        }
        if (this.balcony === null) {
          this.confirmText = '请选择有无阳台'
          this.$refs.confirm.show()
          return
        }
        if (this.face === -1) {
          this.confirmText = '请选择朝向'
          this.$refs.confirm.show()
          return
        }
        if (this.concreteFloor === null) {
          this.confirmText = '请输入具体楼层'
          this.$refs.confirm.show()
          return
        }
        if (this.roomAge === -1) {
          this.confirmText = '请选择房龄'
          this.$refs.confirm.show()
          return
        }
        if (this.decoration === -1) {
          this.confirmText = '请选择装修类型'
          this.$refs.confirm.show()
          return
        }
        if (this.elevator === null) {
          this.confirmText = '请选择有无电梯'
          this.$refs.confirm.show()
          return
        }
        if (this.name === null) {
          this.confirmText = '请输入小区名'
          this.$refs.confirm.show()
          return
        }
        this.isSend = false
        const data = {
          name: this.name,
          price: this.price,
          totalPrice: this.totalPrice,
          prov: this.province,
          city: this.city,
          district: this.district,
          balcony: this.balcony,
          face: this.face,
          type: this.type,
          floor: this.floor,
          concreteFloor: this.concreteFloor,
          roomAge: this.roomAge,
          decoration: this.decoration,
          elevator: this.elevator,
          propertyCosts: this.propertyCosts,
          room: this.room,
          hall: this.hall,
          greenRate: this.greenRate === -1 ? null : this.greenRate,
          remark: this.remark,
          area: this.area
        }
        secondHandRoom(data).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.confirmText = '提交成功'
            this.$refs.confirm.show()
            setTimeout(() => {
              this.isSend = true
            }, 30)
          }
        })
      } else {
        if (this.totalPrice === null) {
          this.confirmText = '请输入总价'
          this.$refs.confirm.show()
          return
        }
        if (this.census === null) {
          this.confirmText = '请选择户籍'
          this.$refs.confirm.show()
          return
        }
        if (this.clientCount === null) {
          this.confirmText = '请输入客源人数'
          this.$refs.confirm.show()
          return
        }
        this.isSend = false
        const data = {
          name: this.name,
          price: this.price,
          totalPrice: this.totalPrice,
          prov: this.province,
          city: this.city,
          district: this.district,
          face: this.face === -1 ? null : this.face,
          type: this.type === -1 ? null : this.type,
          floor: this.floor,
          concreteFloor: this.concreteFloor,
          roomAge: this.roomAge === -1 ? null : this.roomAge,
          decoration: this.decoration === -1 ? null : this.decoration,
          elevator: this.elevator,
          propertyCosts: this.propertyCosts,
          room: this.room === -1 ? null : this.room,
          hall: this.hall === -1 ? null : this.hall,
          greenRate: this.greenRate === -1 ? null : this.greenRate,
          remark: this.remark,
          census: this.census,
          social: this.social === -1 ? null : this.social,
          downPayment: this.downPayment === -1 ? null : this.downPayment,
          clientCount: this.clientCount,
          area: this.area
        }
        secondHandSource(data).then(res => {
          console.log(res)
          if (res.data.code === 0) {
            this.confirmText = '提交成功'
            this.$refs.confirm.show()
            setTimeout(() => {
              this.isSend = true
            }, 30)
          }
        })
      }
    },
    confirm (data) {
      if (this.confirmText === '提交成功') {
        this.$router.push('/')
      }
    },
    confirmClear() {},
    confirmBtnText() {},
    selectProvince() {
      this.city = '全部'
      this.district = '全部'
      this.cityList = []
      getCitylist(this.province).then(res => {
        this.cityList = res.data.data
      })
    },
    selectCity () {
      this.district = '全部'
      if (this.city === '全部') {
        return
      }
      this.districtList = []
      getDistirctlist(this.province, this.city).then(res => {
        this.districtList = res.data.data
      })
    },
    selectDistrict () {},
    beforeScroll () {},
    _getProvincelist () {
      getProvincelist().then(res => {
        this.provinceList = res.data.data
      })
    },
    _getTypeList () {
      getTypeList().then(res => {
        this.tenementTypeList = res.data.data
      })
    },
    _trim(str) {
      return str.replace(/(^\s+)|(\s+$)/g, '')
    }
  },
  components: {
    MyTitle,
    Scroll,
    Confirm
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  #addProject
    font-size: $font-size-large
    position: fixed
    width: 100%
    bottom: 0
    height: 100%
    z-index: 10000
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
        p
          font-size: $font-size-medium-x
          i
            vertical-align: top
            font-size: $font-size-medium
      .top-select
        display: flex
        .item-list-show
          width: 100%
          display: flex
          height: 30px
          margin-bottom: 10px
          padding: 0 19%
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
    .sof-hint
      span
        color: red
    .list
      position: fixed
      top: 40px
      bottom: 55px
      width: 100%
      padding-top: 50px
      .select-list
        box-sizing: border-box
        margin: 10px
        .item-bg
          display: flex
          background: #fff
          margin-bottom: 5px
          box-sizing: border-box
          padding: 10px 3px
          .item-50
            display: flex
            width: 50%
            box-sizing: border-box
            vertical-align: middle
            line-height: 30px
            .label-25
              width: 25%
              span
                color: red
            .label-40
              width: 40%
              span
                color: red
            .text
              width: 40%
              border: 1px solid #ccc
              height: 30px
              margin: 0 5px
              border-radius: 4px
            .select
              width: 50%
              height: 30px
              border-radius: 4px
              border: 1px solid #ccc
              color: #666
          .item-100
            display: flex
            width: 100%
            >div
              width: 100%
              .textarea
                width: 95%
                margin-top: 10px
            p
              width: 15%
              line-height: 18px
              span
                color: red
            .text
              width: 40%
              border: 1px solid #ccc
              height: 30px
              margin: 0 5px
              border-radius: 4px
            .label-15
              width: 15%
              line-height: 30px
              span
                color: red
            .label-height
              line-height: 30px
            .label-20
              width: 20%
              line-height: 30px
              span
                color: red
            .label-33
              width: 33%
              span
                color: red
              .select
                width: 70%
                height: 30px
                border-radius: 4px
                border: 1px solid #ccc
                color: #666
            .item-right
              line-height: 30px
              width: 10%
              padding-left: 5px
            .select
              width: 30%
              height: 30px
              border-radius: 4px
              border: 1px solid #ccc
              color: #666
          h6
            font-size: $font-size-medium
      .user-send
        padding: 15px
        text-align: right
        margin: 10px
        .btn
          display: inline-block
          text-align: center
          line-height: 35px
          width: 100%
          border: none
          height: 35px
          border-radius: 4px
          color: #fff
          font-size: $font-size-medium-x
        .send
          background: #e5672c
        .default
          background: #fff
          border: 1px solid #ccc
          color: #e5672c
        .disabled
          background: #FF4949
          border: none
          border-color: #FF4949
          border-radius: 4px
          color: white
          font-size: $font-size-medium
      input[type=radio]
        display: inline-block
        vertical-align: middle
        width: 20px
        height: 20px
        appearance: none
        background-color: transparent
        border: 0
        outline: 0 !important
        line-height: 20px
        color: #d8d8d8
        &:after
          content: ""
          display:block
          width: 20px
          height: 20px
          border-radius: 50%
          text-align: center
          line-height: 14px
          font-size: 16px
          color: #fff
          border: 2px solid #ddd
          background-color: #fff
          box-sizing:border-box
        &:checked:after
          content: "L"
          transform:matrix(-0.766044,-0.642788,-0.642788,0.766044,0,0)
          border-color: #37AF6E
          background-color: #37AF6E
</style>