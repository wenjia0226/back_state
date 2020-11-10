<template>
  <div>
		<el-row>
			<el-col :span="20"> <current-school></current-school></el-col>
		</el-row>
    <el-row class="searchBox" :gutter="20" v-if="show">
      <el-col :span="2"><div class="name">姓名</div></el-col>
      <el-col :span="3">
        <el-input v-model="inputName" clearable @input ="handleInputName" placeholder="姓名"></el-input>
      </el-col>
      <el-col :span="2"> <div class="name">班级选择</div></el-col>
      <el-col :span="3">
        <el-select v-model="value" clearable placeholder="请选择"  @change="handleClassChange">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.className"
              :value="item.id">
            </el-option>
          </el-select>
      </el-col>
	  <el-col :span="2" class="name" v-if="showDate">
		  时间选择
	  </el-col>
	  <el-col :span="4" v-if="showDate">
		 <el-date-picker
		        v-model="begin"
		        type="date"
		        placeholder="开始日期"
		        :picker-options="pickerOptions0">
		 </el-date-picker>
	  </el-col>
	  <el-col :span="4" v-if="showDate">
		  <el-date-picker
		         v-model="end"
		         type="date"
		         placeholder="结束日期"
		         :picker-options="pickerOptions1">
		  </el-date-picker>
	  </el-col>
     <el-col :span="2">
       <el-button type="primary" @click="searchStudent">查询</el-button>
     </el-col>
     <el-col :span="2">
       <el-button type="primary" @click="handleReset">重置</el-button>
     </el-col>
		<el-col :span="2" :offset="4" v-if="this.tab == 'diopter'" >
		   <el-button type="success" @click="downLoad">下载屈光度报表</el-button>
		 </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
 import  currentSchool from './currentSchool'
  export default{
    created() {
      this.classId = window.sessionStorage.getItem('bindclassId');
      this.className = window.sessionStorage.getItem('bindclassName')
      this.getOptions()
    },
    data() {
      return {
        options: [],
        value: '',
        inputName: '',
        classId: '',
        className: '',
        show: true,
				tab: '',
				begin: '',
				end: '',
				showDate: true,
				pickerOptions0: {
				disabledDate: (time) => {
					return time.getTime() > Date.now() - 8.64e6;	
				}
		},
		pickerOptions1: {
			disabledDate: (time) => {
				return (time.getTime() < new Date(this.begin).getTime()+ 1*24*60*60*1000 || time.getTime() > Date.now() - 8.64e6 );
			}
		},
		}
    },
    components:{
      currentSchool
    },
	computed: {
		nowTab: function() {
			return this.$store.state.tab
		}
	},
	watch: {
		nowTab: function(val) {
				this.tab = val;
				if(this.tab == 'diopter' || this.tab == 'eyeHealth' || this.tab =='base') {
					this.showDate = false;
				}else {
					this.showDate = true;
				}
		}
	},
    methods: {
      handleReset() {
        this.inputName = '';
        this.classId  =  '';
        this.value = '';
				this.begin = '';
				this.end = '';
      },
      handleInputName(e) {
        this.inputName = e
      },
      handleClassChange(val) {
        this.classId = val;
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
			downLoad() {
				this.loading = this.$loading({
					 lock: true,
					 text: '生成中,请耐心等候...',
					 spinner: 'el-icon-loading',
					 background: 'rgba(0, 0, 0, 0.7)'
				 });
				let param = new FormData();
				param.append('classId', this.classId);
				axios({
					method: 'post',
					data: param,
					url: '/lightspace/school/diopterExcelOut'
				}).then(this.handleGetExcelSucc.bind(this)).catch((res) => {console.log(res)})
			},
			handleGetExcelSucc(res) {
				if(res.data.status == 200) {
					const downloadElement = document.createElement('a'); // 创建a标签
					downloadElement.href = 'https://www.guangliangkongjian.com/file/Members.xls';
					document.body.appendChild(downloadElement);
					downloadElement.click();
					document.body.removeChild(downloadElement);
					this.loading.close();
				}
			},
      handleGetOptionsSucc(res) {
		  // console.log(res)
        if(res.data.status == 200) {
          if(this.classId) {
            let all = res.data.data;
            let arr = all.filter((item, index) => {
              if(item.id == this.classId) {
                return item
              }
            })
            this.value = arr[0].className;
			
            this.searchStudent()
          }else {
            this.options = res.data.data;
          }
        }
      },
      searchStudent() {
		  var b = new Date(this.begin);
			if(this.begin) {
				var begin=b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();
			}else {
				var begin = ''
			}
		  if(this.end) {
				var e = new Date(this.end);
				var end =e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
				   
			}else {
				var end = ''
			}
		   this.$emit('recordList', this.classId, this.inputName, begin, end)
      },

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
      text-align: right
</style>
