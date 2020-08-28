<template>
  <div>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="裸眼档案" name="luo"></el-tab-pane>
        <el-tab-pane label="戴镜视力" name="wear"></el-tab-pane>
        <el-tab-pane label="基础信息" name="base"></el-tab-pane>
      </el-tabs>
      <!-- 裸眼列表 -->
    <el-table  :header-cell-style="{background:'#eef1f6',color:'#606266'}" :data="this.content"
      border v-if="this.activeName == 'luo'&& (!this.showHistory)"  stripe style="width: 100%">
        <el-table-column label="学校" prop="schoolName"></el-table-column>
        <el-table-column label="班级" prop="className"></el-table-column>
        <el-table-column label="学生姓名" >
          <template slot-scope = 'scope'>
            <div class="student_name"  @click = "showStudentInfo('luo',scope.row.studentId)">{{scope.row.studentName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
        <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
        <el-table-column label="最近一次检测时间" prop="lastTime"></el-table-column>
    </el-table>
    <el-pagination
        background
         v-if="this.activeName == 'luo'&& (!this.showHistory)"
        :current-page="this.number"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size ="this.size"
        :total="this.totalElements">
      </el-pagination>
   <!-- 戴镜列表 -->
    <el-table :data="this.content" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
      border v-show="this.activeName == 'wear'&& !this.showWearHistory"  stripe style="width: 100%">
          <el-table-column label="学校" prop="schoolName"></el-table-column>
          <el-table-column label="班级" prop="className"></el-table-column>
         <el-table-column label="学生姓名" >
           <template slot-scope ='scope'>
             <div class="student_name"  @click ="showStudentInfo( 'wear',scope.row.studentId)">{{scope.row.studentName}}</div>
           </template>
         </el-table-column>
          <el-table-column label="右眼戴镜视力" prop="visionRight"></el-table-column>
          <el-table-column label="左眼戴镜视力" prop="visionLeft"></el-table-column>
          <el-table-column label="最近一次检测时间" prop="lastTime"></el-table-column>
    </el-table>
    <el-pagination
       background
       v-show="this.activeName == 'wear'&& !this.showWearHistory"
       :current-page="this.number"
       @current-change="handleCurrentChange"
       layout="prev, pager, next"
       :page-size ="this.size"
       :total="this.totalElements">
     </el-pagination>
   <!-- 基础信息 -->
     <el-table :data="this.content" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
       border v-show="this.activeName == 'base' "  stripe style="width: 100%">
          <el-table-column label="学校" prop="schoolName"></el-table-column>
          <el-table-column label="班级" prop="classesName"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
           <el-table-column label="身高" prop="height"></el-table-column>
           <el-table-column label="坐高" prop="sittingHeight"></el-table-column>
           <el-table-column label="体重" prop="weight"></el-table-column>
     </el-table>
     <el-pagination
        background
        v-show="this.activeName == 'base'"
        :current-page="this.number"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size ="this.size"
        :total="this.totalElements">
      </el-pagination>
   <!-- 裸眼历史记录 -->
    <el-table :data="this.stucontent" v-show="this.showHistory">
      <el-table-column label="班级" prop="className"></el-table-column>
      <el-table-column label="学生姓名" prop="studentName"></el-table-column>
      <el-table-column label="检测时间" prop="lastTime"></el-table-column>
      <el-table-column label="右眼裸眼视力" prop="visionRight"></el-table-column>
      <el-table-column label="左眼裸眼视力" prop="visionLeft"></el-table-column>
     <el-table-column label="操作">
       <template slot-scope="scope">
           <el-button type="warning" size="middle" icon="el-icon-delete" @click="hanldeRemoveRecod('luo',scope.row)"  ></el-button>
       </template>
     </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="this.showHistory"
      :current-page="this.stunumber"
      @current-change="handleHistoryCurrentChange"
      layout="prev, pager, next"
      :page-size ="this.stusize"
      :total="this.stutotalElements">
    </el-pagination>
    <!-- 戴镜历史记录 -->
    <el-table :data="this.wearstucontent" v-show="this.showWearHistory">
      <el-table-column label="班级" prop="className"></el-table-column>
      <el-table-column label="学生姓名" prop="studentName"></el-table-column>
      <el-table-column label="检测时间" prop="lastTime"></el-table-column>
      <el-table-column label="右眼戴镜视力" prop="visionRight"></el-table-column>
      <el-table-column label="左眼戴镜视力" prop="visionLeft"></el-table-column>
     <el-table-column label="操作">
         <template slot-scope="scope">
             <el-button type="warning" size="middle" icon="el-icon-delete" @click="hanldeRemoveRecod('wear',scope.row)"  ></el-button>
         </template>
     </el-table-column>
    </el-table>
    <el-pagination
      background
      v-show="this.showWearHistory"
      :current-page="this.wearstunumber"
      @current-change="handleWearHistoryCurrentChange"
      layout="prev, pager, next"
      :page-size ="this.stusize"
      :total="this.wearstutotalElements">
    </el-pagination>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'card',
    created() {
      this.getInfo('', '');
    },
     data() {
      return {
        type: '',
        id: '',
        name: '',
        url: '/lightspace/school/screeningList',
        activeName: 'luo',
        content: [],
        pageSize: 10,
        size: 5,
        total:0,
        totalElements: 0,
        number: 1,
        page: 1,
        studentId: '',
        stucontent: [],
        wearstucontent: [],
        stupageSize: 10,
        stusize: 5,
        stutotal:0,
        stutotalElements: 0,
        basepageSize: 10,
        basesize: 5,
        basetotal:0,
        basetotalElements: 0,
        basenumber: 1,
        basepage: 1,
        stunumber: 1,
        stupage: 1,
        showHistory: false,
        showWearHistory: false,
        wearstucontent: [],
        wearstupageSize: 10,
        wearstusize: 5,
        wearstutotal:0,
        wearstutotalElements: 0,
        wearstunumber: 1,
        wearstupage: 1,
        delType: '',
        showSearch: true, // 展示搜索框
      }
    },
    methods: {
      //切换裸眼档案
    handleClick(tab, event) {
        this.activeName = tab.name;
        this.showHistory = false;
        this.showWearHistory = false;

        this.stupage = 1;
        this.wearstupage = 1;
        if(tab.name == 'luo') {
          this.url = '/lightspace/school/screeningList'
        }else if(tab.name == 'wear') {
          this.url =  '/lightspace/school/screeningWearList'
        }else if(tab.name == 'base') {
          this.url = '/lightspace/school/getStudent'
        }
        this.page = 1;
        this.getDataList();
        this.$emit('showSearch', true)
    },
     //分页
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //历史裸眼分页
    handleHistoryCurrentChange(val) {
      this.stupage = val;
      this.getSudentHistory();
    },
    //历史戴镜分页
    handleWearHistoryCurrentChange(val) {
      this.wearstupage = val;
      this.getWearSudentHistory();
    },
    //进入判断类型
    getInfo(classId, name) {
      if(classId && !name) {  // 如果只有班级
        this.type = 'class';
        this.id = classId;
      }else if(classId && name) { // 如果班级和姓名都存在
        this.type ="student";
        this.name = name;
        this.id = '';
      }else if (!this.classId && name) {
        this.type ="student";
        this.name = name;
        this.id = ''
      } else {   //如果都不存在
        this.type = '',
        this.id = ''
      }
      this.page = 1;
      this.getDataList()
    },
    // 获取列表
    getDataList() {
      let param = new FormData();
        param.append('type', this.type);
        param.append('id', this.id);
        param.append('page', this.page);
        param.append('name', this.name);
        axios({
          method: 'post',
          data: param,
          url: this.url
        }).then(this.handleGetDataListSucc.bind(this)).catch((err) => {console.log(err)})
    },
    handleGetDataListSucc(res) {
     if(res.data.status == 200) {
       res ? res= res.data.data: '';
       this.content = res.content;
       this.totalElements = res.totalElements;
       this.size = res.size;
       this.number = res.number + 1;
       if(this.content.length) {
         this.content.forEach((item) => {
           item.lastTime = item.date + '\xa0\xa0' + item.time
         })
       }
     }else {
       this.$message.error(res.data.msg)
       this.content = [];
     }
    },
    //点击进入学生历史
    showStudentInfo(type, studentId) {
       this.showSearch = false;
      this.$emit('showSearch', this.showSearch)
      if(type == 'luo') {
        this.showHistory = true;
        this.studentId  = studentId;
        this.getSudentHistory('');
      }else if(type == 'wear') {
        this.showWearHistory = true;
        this.studentId  = studentId;
        this.getWearSudentHistory();
      }
   },
    getWearSudentHistory() {
     let param = new FormData();
     param.append('page', this.wearstupage);
     param.append('studentId', this.studentId);
     axios({
       method: 'post',
       data: param,
       url: '/lightspace/school/screeningWearByStudentId'
     }).then(this.handleGetWearHisSucc.bind(this)).catch((err) => {console.log(err)})
   },
    handleGetWearHisSucc(res) {
       if(res.data.status == 200) {
         res ? res= res.data.data: '';
         this.wearstucontent = res.content;
         this.wearstutotalElements = res.totalElements;
         this.wearstusize = res.size;
         this.wearstunumber = res.number + 1;
         if(this.wearstucontent.length) {
           this.wearstucontent.forEach((item) => {
             item.lastTime = item.date + '\xa0\xa0' + item.time
           })
         }
     }else if(res.data.status == 10211) {
       this.wearstucontent = [];
       this.$message.error(res.data.msg)
     }
   },
    getSudentHistory() {
     let param = new FormData();
         param.append('page', this.stupage);
         param.append('studentId', this.studentId);
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/school/screeningByStudentId'
         }).then(this.handleGetStudentRecordListSucc.bind(this)).catch((err) => {console.log(err)})
   },
    handleGetStudentRecordListSucc(res) {
      //console.log(res)
      if(res.data.status == 200) {
        res ? res= res.data.data: '';
        this.stucontent = res.content;
        this.stutotalElements = res.totalElements;
        this.stusize = res.size;
        this.stunumber = res.number + 1;
        if(this.stucontent.length) {
          this.stucontent.forEach((item) => {
            item.lastTime = item.date + '\xa0\xa0' + item.time
          })
        }
      }else {
        this.$message.error(res.data.msg);
        this.stucontent = [];
      }
    },
    async  hanldeRemoveRecod(type,row) {
      let deleurl = "";
      this.delType = type;
      let id = row.id;
      if(type == 'luo') {
        deleurl = '/lightspace/school/deleteScreening'
      }else if(type == 'wear') {
        deleurl = '/lightspace/school/deleteScreeningWear'
      }
       const confirmResult = await this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
       }).catch(err => err)
       if(confirmResult !== 'confirm') {
           return this.$message.info('已经取消删除')
       }
           let param = new FormData();
           param.append('id', id);
           axios({
               method: 'post',
               url: deleurl,
               data: param
           }).then(this.handleDeleteRecordSucc.bind(this)).catch((err) => {console.log(err)})
    },
    handleDeleteRecordSucc(res) {
     console.log(res)
      if(res.data.status == 200) {
         this.$message.success('删除成功')
         if(this.delType == 'luo') {
           this.getSudentHistory()
         }else if(this.delType == 'wear') {
           this.getWearSudentHistory()
         }
       }else {
         this.$message.error(res.data.msg);
         this.$router.push('/login');
       }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .student_name
    color: blue
    cursor:pointer
</style>
