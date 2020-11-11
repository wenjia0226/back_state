<template>
  <div>
    <el-card>
      <div class="title_name"> {{schoolName}}<span style="color: red">未筛查学生名单</span></div>
      <!-- <el-table  :data="tableData" border style="width: 80%;margin-left: 10%;">
        <el-table-column  label="" type="index"></el-table-column>
        <el-table-column prop="schoolName" label="学校"></el-table-column>
        <el-table-column prop="classesName" label="班级"></el-table-column>
        <el-table-column  prop="name" label="姓名"></el-table-column>
      </el-table> -->
			 <el-table
			    :data="tableData"
			    style="width: 100%">
			    <el-table-column type="expand">
			      <template slot-scope="props">
							<el-table :data="props.row.classData">
								 <el-table-column type="expand">
								   <template slot-scope="props">
										 <el-table :data="props.row.studentData" border>
											 <el-table-column label="所属区" prop="regionName"></el-table-column>
											 <el-table-column label="学校名称" prop="schoolName"></el-table-column>
											 <el-table-column label="班级名称" prop="classesName"></el-table-column>
											 <el-table-column label="学生姓名" prop="name"></el-table-column>
										 </el-table>
									 </template>
									</el-table-column>
										<el-table-column label="班级名称" prop="name"></el-table-column>
										<el-table-column label="班级未检测人数" prop="undetectedNumber"></el-table-column>
							</el-table>
						</template>
					</el-table-column>
					<el-table-column label="年级" prop="name"></el-table-column>
					<el-table-column label="年级未检测人数" prop="undetectedNumber"></el-table-column>
				</el-table>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    created() {
			this.schoolName = window.sessionStorage.getItem('schoolName')
			this.begin = window.sessionStorage.getItem('begin');
			this.end = window.sessionStorage.getItem('end');
			this.$nextTick(() => {
				 this.getAll()
			})	
    },
    data() {
      return {
        tableData: [],
        schoolName: '',
				begin: '',
				end: ''
      }
    },
    methods: {
      //加载转圈
      openFullScreen() {
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0,0,0,0.7)'
        })
        return loading;
      },
      closeFullScreen(loading) {
        loading.close()
      },
      getAll() {
        this.openFullScreen()
        let param = new FormData();
				param.append('begin', this.begin);
				param.append('end', this.end);
       axios({
             method: 'post',
             data: param,
             url: '/lightspace/school/undetectedList'
           }).then(this.handleGetTopAllSucc.bind(this)).catch((err) => {console.log(err)})
      },
      handleGetTopAllSucc(res) {
        this.closeFullScreen(this.openFullScreen())
        if(res.data.data) {
          this.tableData = res.data.data
        }

      }
    }
  }
</script>

<style lang="stylus" scoped>
  .title_name
     font-size: 18px
     padding: 6px 0 16px
     font-weight: bold
     text-align: center
     margin: 50px
/deep/ .el-icon-arrow-right:before {
     content: "\e723";
     font-size: 14px;
 }
</style>
