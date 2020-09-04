<template>
   <el-container class="home-container">
      <el-aside :width="isCollapse ? '64px': '200px'" >
         <el-menu
         :default-active="this.$route.path"
         class="el-menu-vertical-demo"
         background-color="#333744"
         text-color="#fff"
         active-text-color="#409eff"
         router
         :unique-opened="true"
         :collapse="isCollapse"
         :collapse-transition="false"
               >
                 <div class="toggle-button" @click="toggleCollapse"> |||</div>
                 <el-menu-item index="/first">
                   <i class="el-icon-star-on"></i>
                   <span slot="title">首页</span>
                 </el-menu-item>
                 <el-submenu index="/studentsetting">
                   <template slot="title">
                     <i class="el-icon-s-custom"></i>
                     <span>学生管理</span>
                   </template>
                   <el-menu-item-group>
                     <el-menu-item index="/studentsetting">
                       <i class="el-icon-star-on"></i>
                       <span slot="title">学生管理</span>
                     </el-menu-item>
                     <el-menu-item index="/classsetting">
                       <i class="el-icon-star-on"></i>
                       <span slot="title">班级管理</span>
                    </el-menu-item>
                   </el-menu-item-group>
                 </el-submenu>
                 <el-menu-item index="/recordsetting">
                   <i class="el-icon-document"></i>
                   <span slot="title">档案管理</span>
                 </el-menu-item>
                 <el-menu-item index="/analysis">
                   <i class="el-icon-medal"></i>
                   <span slot="title">数据分析</span>
                 </el-menu-item>
                 <el-submenu index="/online">
                   <template slot="title">
                     <i class="el-icon-s-custom"></i>
                     <span>智能排座</span>
                   </template>
                   <el-menu-item-group>
                     <el-menu-item index="/online">
                        <i class="el-icon-star-on"></i>
                        <span slot="title">在线排座</span>
                     </el-menu-item>
                     <el-menu-item index="/seatQuery">
                       <i class="el-icon-star-on"></i>
                       <span slot="title">座位查询</span>
                     </el-menu-item>
                   
                   </el-menu-item-group>
                 </el-submenu>
               </el-menu>
      </el-aside>
      <!-- 右侧主体区 -->
      <el-main>
        <router-view></router-view>
      </el-main>
   </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        isCollapse: false,
        menuList: [],
        activeIndex: '/home'
      }
    },
    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
      },
      getMenuList() {
        //获取所都菜单
            let listparam = new FormData();
            axios({
                method: 'post',
                url: '/lightspace/school/menuList',
                data: listparam
            }).then(this.handleGetMenuListSucc.bind(this))
            .catch((err) => { console.log(err)})
      },
      handleGetMenuListSucc (res){
         // console.log(res)
        if(res.data.status == 200) {
           this.menuList = res.data.data;
           let menuList = res.data.data;
        }else {
          this.$message.error(res.data.msg);
          this.$router.push('/login');
        }
      },
      //保存链接的激活状态
      saveNavState(activeIndex) {
          this.activeIndex = activeIndex;
          console.log(this.activeIndex)
      }
    }
  }
</script>

<style lang="stylus">
  .el-menu
    border-right:none
    height: 100%
    .toggle-button
      line-height: 30px
      height: 30px
      color: #fff
      text-align:center

</style>
