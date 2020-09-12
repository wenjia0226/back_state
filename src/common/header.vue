<template>
  <div >
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-row class="header_wrap">
             <!-- <el-col :span="1"></el-col> -->
             <el-col :span="4">
               <i class="el-icon-folder-opened"></i><span style="margin: 0 10px">{{common}}</span></el-col>
             <el-col :span="6" :offset="4">
              <div style="font-size: 30px">
                 {{schoolName}}
              </div>
             </el-col>
             <el-col :span="4"  style="text-align: right; margin-right: 20px"> 当前用户：{{username}}</el-col>
             <el-col :span="2">
               <el-button type="primary" size="middle" @click="logout"> 退出</el-button>
             </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import currentSchool from './currentSchool.vue'
  import axios from 'axios'
  
  export default {
    name: 'titleheader',
    props: {
      common: String
    },

    components: {
      currentSchool
    },
    data() {
      return {
        username: '',
        schoolName: ''
      }
    },
    created() {
      this.username = window.sessionStorage.getItem('userName')
      this.schoolName = window.sessionStorage.getItem('schoolName')
    },
    methods: {
      logout() {
        let param = new FormData();
        axios({
            method: 'post',
            url: '/lightspace/school/loginOut'
        }).then(this.handleLoinOutSucc.bind(this)).catch((err) => {
           console.log(err)
         })
      },
      handleLoinOutSucc(res) {
        if(res.data.status == 200) {
          this.$router.push('/login')
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
    .header_wrap
      font-size: 16px;
      font-weight: bold;
      line-height: 40px;
      height: 40px

</style>
