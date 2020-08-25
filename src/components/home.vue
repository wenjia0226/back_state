<template>
   <el-container class="home-container">
     <el-aside width="200px">
     	 <!-- 菜单区域 -->
     	<el-menu
     	background-color="#333744"
     	text-color="#fff"
     	active-text-color="#409eff"
     	 :default-active="activeIndex"
     	router
     	:unique-opened= true>
     	<!-- 一级菜单 -->
     	<el-submenu :index="'/' +item.id" v-for="item in menuList" :key="item.id">
     		<!-- 一级菜单模板 -->
     		<template slot="title">
     	   <!-- <i :class="el-icon-my-export"></i> -->
     		<span>{{item.authName}}</span>
     		</template>
     		<!-- 二级菜单 -->
     		<el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
         @click="saveNavState('/' + subItem.path)">
     			<template slot="title">
     				<span>{{subItem.authName}}</span>
     			</template>
     		</el-menu-item>
     	</el-submenu>
     	</el-menu>
     </el-aside>
      <!-- 右侧主体区 -->
      <el-main style="padding: 0">
        <router-view></router-view>
      </el-main>
   </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
       this.getMenuList();
    },
    data() {
      return {
        menuList: [],
        activeIndex: '/home'
      }
    },
    methods: {
      select(e) {
        console.log(e)
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
        console.log(res)
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

<style>
</style>
