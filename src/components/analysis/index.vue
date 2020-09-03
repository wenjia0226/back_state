<template>
  <div>
     <title-header :common="common" ></title-header>
     <el-card>
       <el-row >
         <el-col :span="6" > <current-school></current-school></el-col>
         <el-col :span="6" :offset="1">
           <year ></year>
         </el-col>
         <el-col :span="6" :offset="1">
           <semester ></semester>
         </el-col>
       </el-row>
       <analasis ref="analysis"></analasis>
        <level ref="level"></level>
     </el-card>
  </div>
</template>

<script>
  import titleHeader from '../../common/header'
  import  currentSchool from '../../common/currentSchool'
  import year from '../../common/year'
  import  semester from'../../common/semester'
  import  analasis from './analysis'
  import level from './level'
  export default {
    mounted() {
      this.createdGetInfo();
      this.getLevelInfo();
    },
    components:{
      titleHeader,
      currentSchool,
      analasis,
      year,
      semester,
      level
    },
    data() {
      return {
        common: '数据概览',
        // year: '2019 - 2020',
        // semester: 0,
        curSemester: 1,
        curYear: '2020 - 2021',
      }
    },
   methods: {
      createdGetInfo() {
        this.$refs.analysis.getDataList(this.curYear, this.curSemester )
      },
      getLevelInfo() {
        this.$refs.level.getBadTotal(this.curYear,  this.curSemester )
      }
    },
     computed: {
       newYear() {
         return this.$store.state.year
       },
       newSemester() {
         return this.$store.state.semester
       }
     },
     watch: {
       newYear(val) {
         this.curYear = val;
         this.createdGetInfo();
         this.getLevelInfo();
       },
       newSemester(val) {
         this.curSemester = val;
         this.createdGetInfo();
         this.getLevelInfo();
       }
     }
  }
</script>

<style>
</style>
