<template>
  <div>
     <title-header :common="common" ></title-header>
     <el-card>
       <current-school></current-school>
     </el-card>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import  currentSchool from '../../common/currentSchool'
  export default {
    components:{
      titleHeader,
      currentSchool
    },
    data() {
      return {
        common: '学生管理'
      }
    }
  }
</script>

<style>
</style>
