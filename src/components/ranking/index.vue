<template>
  <div>
    <title-header :common="common" ></title-header>
    <el-card v-show="!this.show">
      <search @recordList="handleChange" ref ="search"></search>
      <card ref="cardmenu" ></card>
    </el-card>
		<el-card v-show="this.show">
			<el-row >
					<el-col :span="24"><div class="schoolNow">请先选择学校</div></el-col>
			</el-row>
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
	created() {
		this.schoolId = window.sessionStorage.getItem('schoolId')
		if(this.schoolId == -1) {
			this.show = true
		}
	},
    data() {
      return {
         common: '排行榜',
		 show: false,
		 schoolId: '',
      }  
    },
    methods: {
      handleChange(classId) {
        this.$refs.cardmenu.getInfo(classId)
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
