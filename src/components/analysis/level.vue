<template>
  <div>
     <div class="title_total">视力分级统计</div>
     <el-row>
       <el-col :span="20" :offset="2">
         <div ref="badTotal" style="width:100%;height:400px; margin: 0 auto"></div>
       </el-col>
     </el-row>

  </div>
</template>
<script>
 import echarts from 'echarts'
 import axios from 'axios'
  export default {
    name: 'level',
    data() {
      return {
        option: {},
        yData: [],
        good: [],
        light: [],
        middle: [],
        serious: []
      }

    },
    mounted() {
      this.drawLine()
    },
    methods: {
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
      drawLine(good, light, middle, serious) {
        var myChart = echarts.init(this.$refs.badTotal);
          this.option ={
             color:['#55b99d','#de9f3f','#db4c28','#8f0b11'],
             tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ["好视力", "轻度不良", "中度不良", "重度不良"],
                    selectedMode:false
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value'
                },
                yAxis: {
                    type: 'category',
                    data: ["一年级", "二年级", "三年级", "四年级", "五年级", '六年级']
                },
                series: [
                    {
                        name: '好视力',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight',
                            formatter:'{c} %',
                        },
                        data: good
                    },
                    {
                        name: '轻度不良',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight',
                            formatter:'{c} %',
                        },
                        data: light
                    },
                    {
                        name: '中度不良',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight',
                            formatter:'{c} %',
                        },
                        data: middle
                    },
                    {
                        name: '重度不良',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'insideRight',
                            formatter:'{c} %'
                        },
                        data: serious
                    },

                 ]
          }
          myChart.setOption(this.option)
      },
      getBadTotal(year, semester) {
        this.openFullScreen()
        let param = new FormData();
        param.append('year', year);
        param.append('semester', semester);
        axios({
          method: 'post',
          data: param,
          url: '/lightspace/school/recordVisionGrade'
        }).then(this.handlegetBadTotalSucc.bind(this)).catch((err) => {
           console.log(err)
           this.closeFullScreen(this.openFullScreen())
         })
      },
      handlegetBadTotalSucc(res) {
       // console.log(res)
        this.closeFullScreen(this.openFullScreen())
        if(res.data.data) {
          this.good = res.data.data[0];
          this.light = res.data.data[1];
          this.middle = res.data.data[2];
          this.serious = res.data.data[3];
          this.drawLine(this.good, this.light, this.middle, this.serious)
        }else {
          this.good = [];
          this.light = [];
          this.middle = [];
          this.serious = [];
          this.drawLine(this.good, this.light, this.middle, this.serious);
        }
      }
    }
   }
</script>

<style lang="stylus" scoped>
  .title_total
    font-size: 20px;
    padding: 10px 10px 14px;
    font-weight: bold;
    border-bottom: 2px solid #707070;
    margin: 20px 0;
</style>
