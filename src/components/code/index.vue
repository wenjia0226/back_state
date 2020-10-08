<template>
  <div>
    <title-header :common="common"></title-header>
    <el-card>
      <search-code v-show="!this.show"></search-code>
			<el-row v-show="this.show">
					<el-col :span="24"><div class="schoolNow">请先选择学校</div></el-col>
			</el-row>
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
         common: '二维码下载',
				 show: false,
				 schoolId: ''
       }
     },
     components:{
       titleHeader,
       searchCode
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
