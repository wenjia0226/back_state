<template>
  <div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="name"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
         <el-table-column align="left" width="40">
           <template slot-scope="scope"></template>
         </el-table-column>
          <el-table-column align="center" prop="name"label="年级" ></el-table-column>
          <el-table-column align="center" prop="good"label="好视力" ></el-table-column>
          <el-table-column align="center" prop="mild"label="轻度不良" ></el-table-column>
          <el-table-column align="center" prop="moderate"label="中度不良" ></el-table-column>
          <el-table-column align="center" prop="serious"label="重度不良" ></el-table-column>
          <el-table-column align="center" prop="myopia"label="近视人数" ></el-table-column>
          <el-table-column align="center" prop="all"label="总计人数"></el-table-column>
          <el-table-column align="center" prop="myopiaRate"label="近视率" ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="primary"  @click="handleReport(scope.row)">查看报表</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!--    <report  :dialogVisible="dialogVisible" :grade="grade" @closepop="handleClosePop"></report> -->
        <div class="title_total">不良人数</div>
        <el-row>
          <!-- 实力分级统计 -->
          <el-col :span="20">
            <div ref="badTotal" style="width:100%;height:400px; margin: 0 auto"></div>
          </el-col>
        </el-row>
       <!-- 年级 -->
        <el-dialog
          :visible.sync="dialogVisible"
          width="80%"
          :before-close="handleBeforeClose"
         >
          <div class="inner_title">{{name}}账号{{grade}}年级视力统计({{nowYear}}{{nowSemester}}学期)</div>
          <div class="second_title">单位{{name}}账号{{grade}}年级</div>
          <div class="innerbox">
            <div class="inner_item" style="padding: 0 10px 0 0">应测：{{gradeSum}}人</div>
            <div class="inner_item">实测：{{gradeTested}}人</div>
            <div class="inner_item">视力不良：{{gradeBad}}人</div>
          </div>
          <h6 class="badpercent">不良率: {{gradePercentage}}</h6>
          <div class="detail_title">详细数据</div>
          <div v-for="(item1, index1) in this.classList" :key="item1.id" v-if="!classData.length" >
            <div class="detail_title">{{grade}}年级{{item1.name}}</div>
            <el-table :data="item1.viewGradeReportVO" border style="width: 100%">
              <el-table-column prop="name" > </el-table-column>
              <el-table-column prop="all" label="检查人数" width="180"> </el-table-column>
              <el-table-column  prop="good" label="好视力" width="180"></el-table-column>
              <el-table-column prop="mild" label="轻度不良"></el-table-column>
              <el-table-column prop="moderate"label="中度不良"></el-table-column>
              <el-table-column prop="serious" label="重度不良"> </el-table-column>
              <el-table-column prop="percentage"label="不良率"></el-table-column>
            </el-table>
           </div>

            <el-table :data="classData" border style="width: 100%" v-if="classData.length">
               <el-table-column prop="name" > </el-table-column>
               <el-table-column prop="all" label="检查人数" width="180"> </el-table-column>
               <el-table-column  prop="good" label="好视力" width="180"></el-table-column>
               <el-table-column prop="mild" label="轻度不良"></el-table-column>
               <el-table-column prop="moderate"label="中度不良"></el-table-column>
               <el-table-column prop="serious" label="重度不良"> </el-table-column>
               <el-table-column prop="percentage"label="不良率"></el-table-column>
             </el-table>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleConfirm">确 定</el-button>
          </span>
        </el-dialog>

  </div>
</template>
<script>
 import echarts from 'echarts'
 import axios from 'axios'
  export default {
    name: 'analysis',
    data() {
      return {
        tableData: [],
        options: [],
        hasChildren: true,
        option: {},
        yData: [],
        dialogVisible: false,
        grade: '',
        year: '',
        semester: '',
        user: '',
        gradeSum: 0,
        gradeTested: 0,
        gradeBad: 0,
        gradePercentage: '',
        classList: {},
        classId: '',
        classData: [],
        studentList: []

      }
    },
    mounted() {
      this.year =  this.$store.state.year;
      this.user = this.$store.state.name;
      this.semester = this.$store.state.semester;
    },
    computed: {
      nowYear: function() {
        return this.$store.state.year
      },
      name: function() {
        return this.$store.state.name
      },
      nowSemester: function() {
        return this.$store.state.semester
      }
    },
    watch: {
      nowYear(val) {
        this.year = val
      },
      nowSemester(val) {
        this.semester = val
      }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      handleBeforeClose() {
        this.dialogVisible = false;
      },
      handleConfirm() {
         this.dialogVisible = false;
      },
      handleReport(row) {
        if(row.classId) {
          this.classId = row.classId;
        }else {
          this.grade = row.name;
        }
        this.dialogVisible = true;
        this.getDetailList();
      },
      getDetailList(){
        let url ="";
        let param = new FormData();
        if(this.classId) {
          url ="/lightspace/school/ViewClassReport"
           param.append('classId', this.classId);
        }else {
          url = '/lightspace/school/ViewGradeReport'
          param.append('grade', this.grade);
        }
        param.append('year', this.year);
        param.append('semester', this.semester);
        axios({
          method: 'post',
          data: param,
          url: url
        }).then(this.handlegetTotalSucc.bind(this)).catch((err) => {
           console.log(err)
         })
      },
      handlegetTotalSucc(res) {
        if(res.data.status == 200) {
            res? res=res.data.data: '';
            this.gradeSum = res.gradeSum;
            this.gradeTested = res.gradeTested;
            this.gradeBad = res.gradeBad;
            this.gradePercentage = res.gradePercentage;

            if(this.classId) {
              this.classData = res.viewGradeReport
            }else {
              this.classList = res.classList
            }

          }
      },
       // liebiao
      getDataList(year, semester) {
        let param = new URLSearchParams();
          param.append('year', year);
          param.append('semester', semester);
          axios({
              method: 'post',
              url: '/lightspace/school/recordSurvey',
              data: param,
          }).then(this.handleGetDataListSucc.bind(this)).catch((err) => {
             console.log(err)
           })
      },
      handleGetDataListSucc(res) {
        console.log(res)
         this.tableData = res.data.data.recordSurvey;
         this.yData = res.data.data.gradeMyopiaList;
         this.drawLine(this.yData)
      },
      // 不良人数图
      drawLine(yData) {
        var myChart = echarts.init(this.$refs.badTotal);
          this.option ={
                    color: '#4665b0',
                    tooltip:{
                        trigger:'axis',
                        axisPointer: {
                          type: 'shadow'
                        }
                    },
                   legend: {
                            data:['本校'],
                            selectedMode:false
                    },
                    // x轴
                    xAxis: {
                        data: ["一年级", "二年级", "三年级", "四年级", "五年级", '六年级']
                    },
                    yAxis:[
                       {
                          type: 'value',
                          min: 0,

                          interval: 20,
                          show: true,
                          axisLabel: {
                             formatter: '{value}'
                         }
                          ,
                      }
                     ],
                    // 数据
                    series: [{
                      name: '本校',
                      type: 'bar',
                      data: yData,
                      barWidth : 30,//柱图宽度

                      // markLine:{
                      //  data: [{yAxis: 38}],
                      //   itemStyle: {
                      //     normal: {
                      //       borderWidth: 1,
                      //       lineStyle: {
                      //         type: 'dash',
                      //         color: 'red',
                      //         width: 2
                      //       },
                      //       label: {
                      //         formatter: '全国小学近视率38%',
                      //         textStyle: {
                      //           fontSize: 12,
                      //           fontWeight: 'bolder'
                      //         }
                      //       }
                      //     }
                      //   }
                      // },
                      itemStyle: {
                        normal: {
                          label: {
                            type: 'value',
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            formatter: '{c}',
                            textStyle: { //数值样式
                              fontSize: 14,
                              color: '#4665b0'
                            }
                          }
                        },

                      },
                    }
                  ]
          }
          myChart.setOption(this.option)
      },

    }
  }
</script>

<style lang="stylus" scoped>
  .bgbottom
     bottom: 1px solid #eee !important
    .el-tag
      margin: 7px
    .secondItem
      heihgt: 30px
      line-height: 1.875rem
  .title_total
    font-size: 20px;
    padding: 10px 10px 14px;
    font-weight: bold;
    border-bottom: 2px solid #707070;
    margin: 20px 0;
.inner_title
   font-size: 20px;
   font-weight: bold;
   text-align: center;
   color: #000
  .second_title
    font-size: 16px
  .innerbox
    display:flex
    margin: 20px 0
    font-weight: bold
    .inner_item
       padding: 0 10px
       box-sizing:border-box
  .badpercent
     font-size: 14px
     margin: 10px 0
  .detail_title
    font-size: 20px
    font-weight: bold
    margin: 20px 0
  .el-table .warning-row {
      background: oldlace;
    }

    .el-table .success-row {
      background: #f0f9eb;
    }
</style>
