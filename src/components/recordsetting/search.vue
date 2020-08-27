<template>
  <div>
    <el-row class="searchBox" :gutter="20">
      <el-col :span="2"><div class="name">姓名</div></el-col>
      <el-col :span="4">
        <el-input v-model="inputName" @input ="handleInputName" placeholder="姓名"></el-input>
      </el-col>
      <el-col :span="2"> <div class="name">班级选择</div></el-col>
      <el-col :span="4">
        <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.className"
              :value="item.id">
            </el-option>
          </el-select>
      </el-col>
     <el-col :span="2">
       <el-button type="primary">查询</el-button>
     </el-col>
     <el-col :span="2">
       <el-button type="primary">重置</el-button>
     </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    created() {
      this.getOptions()
    },
    data() {
      return {
        options: [],
        value: '',
        inputName: ''
      }
    },
    methods: {
      handleInputName(e) {
        this.inputName = e
      },
      getOptions() {
        let param = new FormData();
        axios({
            method: 'post',
            url: '/lightspace/school/getAllClass'
        }).then(this.handleGetOptionsSucc.bind(this)).catch((err) => {
           console.log(err)
         })
      },
      handleGetOptionsSucc(res) {
        //console.log(res)
        if(res.data.status == 200) {
          this.options = res.data.data
        }
      }
    }
  }
</script>
<style  lang="stylus" scoped>
  .searchBox
    height: 40px
    line-height: 40px
    margin: 20px 0
    .name
      height: 40px
      line-height: 40px
      font-weight: bold
      font-size: 16px
</style>
