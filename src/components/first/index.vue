<template>
  <div>
    <title-header :common="common"></title-header>
    <first-base></first-base>
    <div>234</div>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import firstBase   from './base'
  export default {
    components:{
      titleHeader,
      firstBase
    },
    data() {
      return {
         common: '首页'
      }
    }
  }
</script>

<style>
</style>
