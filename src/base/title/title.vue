<template>
  <div>
    <div class="title">
      <i class="icon-back" @click.stop="back"></i>
      <h1>{{title}}</h1>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .title
      text-align: center
      height: 50px
      line-height: 50px
      background: linear-gradient(left, #ee6354, #f87529)
      display: flex
      i
        width: 50px
        line-height: 50px
        font-size: 20px
        font-weight: 900
        color: white
      h1
        width: 75%
        color: white
        font-size: 20px
</style>