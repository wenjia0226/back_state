<template>
  <div>
     <title-header :common="common" ></title-header>
     <el-card>
       <current-school v-show="!this.show"></current-school>
       <class-detail  v-show="!this.show"></class-detail>
	   <el-row v-show="this.show">
		<el-col :span="24"><div class="schoolNow">请先选择学校</div></el-col>
	   </el-row>
     </el-card>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import  currentSchool from '../../common/currentSchool'
  import  classDetail from './classDetail'
  export default {
    components:{
      titleHeader,
      currentSchool,
      classDetail
    },
    data() {
      return {
        common: '班级管理',
		show: false,
		schoolId: ''
      }
    },
	created() {
		this.schoolId = window.sessionStorage.getItem('schoolId')
		if(this.schoolId == -1) {
			this.show = true
		}
	}
  }
</script>
<style lang="stylus" scoped>
.schoolNow
   font-size: 20px
   font-weight: bold
   letter-spacing :3px
   color:#64c0ff
   margin: 0 10px
</style>
