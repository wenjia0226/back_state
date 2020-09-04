<template>
  <div >
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="always">
          <el-row class="header_wrap">
             <el-col :span="1"><i class="el-icon-edit"></i></el-col>
             <el-col :span="4"> {{common}}</el-col>
             <el-col :span="16" style="text-align: right; margin-right: 20px"> 当前用户：{{username}}</el-col>
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
  export default {
    name: 'titleheader',
    props: {
      common: String
    },
    data() {
      return {
        username: ''
      }
    },
    created() {
      this.username = window.sessionStorage.getItem('userName')
    },
    methods: {
      logout() {
        this.$router.push('/login')
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
