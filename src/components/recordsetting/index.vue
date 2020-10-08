<template>
  <div>
    <title-header :common="common" ></title-header>
    <el-card>
      <search @recordList="handleChange" ref ="search" v-if="show"></search>
      <card ref="cardmenu" @showSearch="handleShow" ></card>
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
         common: '档案管理',
         show: true
      }
    },
		created() {
			this.schoolId = window.sessionStorage.getItem('schoolId')
			if(this.schoolId == -1) {
				this.show = false
			}
		},
    methods: {
      handleChange(classId, name) {
        this.$refs.cardmenu.getInfo(classId, name)
      },
      handleShow(val) {
        this.show = val;
      }
    }
  }
</script>

<style>
</style>
