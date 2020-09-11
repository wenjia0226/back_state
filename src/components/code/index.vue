<template>
  <div>
    <title-header :common="common"></title-header>
    <el-card>
      <search-code></search-code>
    </el-card>
  </div>
</template>
<script>
   import titleHeader from '../../common/header'
   import searchCode from './searchCode.vue'
   import axios from 'axios'
   export default {
     data() {
       return {
         common: '二维码下载'
       }
     },
     components:{
       titleHeader,
       searchCode
    }
}
</script>

<style>
</style>
