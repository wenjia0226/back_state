<template>
  <div>
    <title-header :common="common" ></title-header>
    <el-card>
      <current-school></current-school>
      <search></search>
      <card></card>
    </el-card>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import  currentSchool from './currentSchool'
  import search from './search'
  import card from './card'
  export default {
    components:{
      titleHeader,
      currentSchool,
      search,
      card
      },
    data() {
      return {
         common: '档案管理'
      }
    }
  }
</script>

<style>
</style>
