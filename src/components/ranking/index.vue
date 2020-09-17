<template>
  <div>
    <title-header :common="common" ></title-header>
    <el-card>
      <search @recordList="handleChange" ref ="search"></search>
      <card ref="cardmenu" ></card>
    </el-card>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import search from './search'
  import card from './card'
  export default {
    components:{
      titleHeader,
      search,
      card
      },
    data() {
      return {
         common: '排行榜'
      }
    },
    methods: {
      handleChange(classId) {
        this.$refs.cardmenu.getInfo(classId)
      }
    }
  }
</script>

<style>
</style>
