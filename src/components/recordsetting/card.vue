<template>
  <div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="裸眼档案" name="luo"></el-tab-pane>
        <el-tab-pane label="戴镜视力" name="wear"></el-tab-pane>
        <el-tab-pane label="基础信息" name="base"></el-tab-pane>
        <el-tab-pane label="眼健康档案" name="eyeHealth"></el-tab-pane>
		<el-tab-pane label="屈光度档案" name="diopter"></el-tab-pane>
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
       <el-table-column label="右眼裸眼视力" >
					<template slot-scope="scope">
						<div :style="{color: scope.row.visionRightStr >= 1.0 ? 'black': 'red', fontWeight: scope.row.visionRightStr >= 1.0 ? 'normal': 'bold',}">{{scope.row.visionRight}}</div>
					</template>
				</el-table-column>
				<el-table-column label="左眼裸眼视力" >
					<template slot-scope="scope">
						<div :style="{color: scope.row.visionLeftStr >= 1.0 ? 'black': 'red', fontWeight: scope.row.visionLeftStr >= 1.0 ? 'normal': 'bold',}">{{scope.row.visionLeft}}</div>
					</template>
				</el-table-column>
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
					<el-table-column label="右眼裸眼视力" >
						<template slot-scope="scope">
							<div :style="{color: scope.row.visionRightStr >= 1.0 ? 'black': 'red', fontWeight: scope.row.visionRightStr >= 1.0 ? 'normal': 'bold',}">{{scope.row.visionRight}}</div>
						</template>
					</el-table-column>
					<el-table-column label="左眼裸眼视力" >
						<template slot-scope="scope">
							<div :style="{color: scope.row.visionLeftStr >= 1.0 ? 'black': 'red', fontWeight: scope.row.visionLeftStr >= 1.0 ? 'normal': 'bold',}">{{scope.row.visionLeft}}</div>
						</template>
					</el-table-column>
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
      <!--眼健康档案 -->
        <el-table :data="this.content" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
          border   v-show="this.activeName == 'eyeHealth' && !this.showEyeHealth "  stripe style="width: 100%">
             <el-table-column label="学校" prop="schoolName"></el-table-column>
             <el-table-column label="班级" prop="className"></el-table-column>
            <el-table-column label="学生姓名" >
              <template slot-scope ='scope'>
                <div class="student_name"  @click ="showStudentInfo( 'eyeHealth',scope.row.id)">{{scope.row.name}}</div>
              </template>
            </el-table-column>
             <el-table-column label="上传时间" prop="time"></el-table-column>
        </el-table>
        <el-pagination
           background
           v-show="this.activeName == 'eyeHealth' && !this.showEyeHealth"
           :current-page="this.number"
           @current-change="handleCurrentChange"
           layout="prev, pager, next"
           :page-size ="this.size"
           :total="this.totalElements">
         </el-pagination>
		<!-- 屈光度列表 -->
		  <el-table :data="this.content" :header-cell-style="{background:'#eef1f6',color:'#606266'}"
		    border v-show="this.activeName == 'diopter' && !this.showDiopter "  stripe style="width: 100%">
			<el-table-column label="学校" prop="schoolName"></el-table-column>
			<el-table-column label="班级" prop="className"></el-table-column>
			<el-table-column label="学生姓名" >
			  <template slot-scope ='scope'>
				<div class="student_name"  @click ="showStudentInfo( 'diopter',scope.row.studentId)">{{scope.row.studentName}}</div>
			  </template>
			</el-table-column>
			<el-table-column label="右眼球镜" >
				<template slot-scope="scope">
					<div :style="{color:  scope.row.dc1R && (scope.row.ds1R > 1.5 || scope.row.ds1R < -0.5 ) ? 'red': 'black',
					fontWeight: scope.row.dc1R && (scope.row.ds1R > 1.5 || scope.row.ds1R < -0.5 ) ? 'bold': 'normal'}">{{scope.row.ds1R}}</div>
				</template>
			</el-table-column>
			<el-table-column label="左眼球镜" >
				<template slot-scope="scope">
					<div :style="{color:  scope.row.dc1L && (scope.row.ds1L > 1.5 || scope.row.ds1L < -0.5 ) ? 'red': 'black',
					fontWeight: scope.row.dc1L && (scope.row.ds1L > 1.5 || scope.row.ds1L < -0.5 ) ? 'bold': 'normal'}">{{scope.row.ds1L}}</div>
				</template>
			</el-table-column>
			<el-table-column label="右眼柱镜" >
				<template slot-scope="scope">
					<div :style="{color: scope.row.dc1R < -1.5 ? 'red': 'black',fontWeight: scope.row.dc1R < -1.5 ? 'bold': 'normal'}">{{scope.row.dc1R}}</div>
				</template>
			</el-table-column>
			<el-table-column label="左眼柱镜">
				<template slot-scope="scope">
					<div :style="{color: scope.row.dc1L < -1.5 ? 'red': 'black',fontWeight: scope.row.dc1L < -1.5 ? 'bold': 'normal'}">{{scope.row.dc1L}}</div>
				</template>
			</el-table-column>
			<el-table-column label="右眼轴位" prop="axis1R"></el-table-column>
			<el-table-column label="左眼轴位" prop="axis1L"></el-table-column>
			<el-table-column label="右眼水平眼位" prop="ghR"></el-table-column>
			<el-table-column label="左眼水平眼位" prop="ghL"></el-table-column>
			<el-table-column label="右眼垂直眼位" prop="gvR"></el-table-column>
			<el-table-column label="左眼垂直眼位" prop="gvL"></el-table-column>
		  </el-table>
		  <el-pagination
		     background
		     v-show="this.activeName == 'diopter' && !this.showDiopter"
		     :current-page="this.number"
		     @current-change="handleCurrentChange"
		     layout="prev, pager, next"
		     :page-size ="this.size"
		     :total="this.totalElements">
		   </el-pagination>
		<!-- 屈光度历史记录 -->
		 <el-table :data="this.diopitercontent" v-show="this.showDiopter">
		   <el-table-column label="班级" prop="className"></el-table-column>
		   <el-table-column label="学生姓名" prop="studentName"></el-table-column>
		  <el-table-column label="右眼球镜" prop="ds1R"></el-table-column>
		  <el-table-column label="左眼球镜" prop="ds1L"></el-table-column>
		  <el-table-column label="右眼柱镜" prop="dc1R"></el-table-column>
		  <el-table-column label="左眼柱镜" prop="dc1L"></el-table-column>
		  <el-table-column label="右眼轴位" prop="axis1R"></el-table-column>
		  <el-table-column label="左眼轴位" prop="axis1L"></el-table-column>
		  <el-table-column label="右眼水平眼位" prop="ghR"></el-table-column>
		  <el-table-column label="左眼水平眼位" prop="ghL"></el-table-column>
		  <el-table-column label="右眼垂直眼位" prop="gvR"></el-table-column>
		  <el-table-column label="左眼垂直眼位" prop="gvL"></el-table-column>
		   <el-table-column label="上传时间" prop="genTime"></el-table-column>
		 <el-table-column label="操作">
		    <template slot-scope="scope">
		        <el-button type="warning" size="middle" icon="el-icon-delete" @click="hanldeRemoveRecod('diopiter',scope.row)"  ></el-button>
		    </template>
		  </el-table-column>
		 </el-table>
		 <el-pagination
		   background
		   v-show="this.showDiopter"
		   :current-page="this.diopiternumber"
		   @current-change="handleDiopiterHistoryCurrentChange"
		   layout="prev, pager, next"
		   :page-size ="this.diopitersize"
		   :total="this.diopitertotalElements">
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
    <!-- 眼健康档案 -->
   <el-row style="margin: 10px auto" v-show="this.leftLuoX.length">
	 <el-col :span="16":offset="4">
			<div ref="left" style="width: 100%;height: 400px;margin: 0 auto"></div>
		</el-col>
	</el-row>
    <el-row v-show="this.showEyeHealth">
      <el-col :span="24" style="font-size: 40px;padding: 20px;margin: 20rpx;text-align: center;">
        学生视觉检查报告单
      </el-col>
    </el-row>
    <el-row style="margin: 10px auto" v-show="this.showEyeHealth">
      <el-col :span="16" :offset="4">
        <table cellpadding="0" cellspacing="0" class="newReport" style="margin: 0 auto">
          <tr class="reportTitle" style="margin: 20px 0">
            <div style="margin: 10px 0"> 屈光度</div>
          </tr>
          <tr class="bgReport">
            <td align="center">眼别</td>
            <td>远裸视</td>
            <td>近裸视</td>
            <td>球镜</td>
            <td>柱镜</td>
            <td>轴位</td>
            <td>矫正视力</td>
            <td>瞳距</td>
            <td>主导眼</td>
          </tr>
          <tr class="bgReport">
            <td >右眼</td>
            <td v-if="studentWord.farRight">{{studentWord.farRight}}</td>
            <td v-if="!studentWord.farRight">--/--</td>
            <td v-if="studentWord.nearRight">{{studentWord.nearRight}}</td>
            <td v-if="!studentWord.nearRight">--/--</td>
            <td v-if="studentWord.sphRight">{{studentWord.sphRight}}</td>
            <td v-if="!studentWord.sphRight">--/--</td>
            <td v-if="studentWord.cytRight">{{studentWord.cytRight}}</td>
            <td v-if="!studentWord.cytRight">--/--</td>
            <td v-if="studentWord.axisRight">{{studentWord.axisRight}}</td>
            <td v-if="!studentWord.axisRight">--/--</td>
            <td v-if="studentWord.correctRight">{{studentWord.correctRight}}</td>
            <td v-if="!studentWord.correctRight">--/--</td>
            <td v-if="studentWord.ipdRight">{{studentWord.ipdRight}}</td>
            <td v-if="!studentWord.ipdRight">--/--</td>
            <td rowspan="2" v-if="studentWord.leadingRight">{{studentWord.leadingRight}}</td>
            <td rowspan="2" v-if="!studentWord.leadingRight">--/--</td>
          </tr>
          <tr class="bgReport">
            <td>左眼</td>
            <td v-if="studentWord.farLeft">{{studentWord.farLeft}}</td>
             <td v-if="!studentWord.farLeft">--/--</td>
            <td v-if="studentWord.nearLeft">{{studentWord.nearLeft}}</td>
            <td v-if="!studentWord.nearLeft">--/--</td>
            <td v-if="studentWord.sphLeft">{{studentWord.sphLeft}}</td>
            <td v-if="!studentWord.sphLeft">--/--</td>
            <td v-if="studentWord.cytLeft">{{studentWord.cytLeft}}</td>
            <td v-if="!studentWord.cytLeft">--/--</td>
            <td v-if="studentWord.axisLeft">{{studentWord.axisLeft}}</td>
            <td v-if="!studentWord.axisLeft">--/--</td>
            <td v-if="studentWord.correctLeft">{{studentWord.correctLeft}}</td>
            <td v-if="!studentWord.correctLeft">--/--</td>
            <td v-if="studentWord.ipdLeft">{{studentWord.ipdLeft}}</td>
            <td v-if="!studentWord.ipdLeft">--/--</td>
            <!-- <td>{{studentWord.leadingLeft}}</td> -->
          </tr>
          <tr class="reportTitle" >
            <div style="margin: 10px 0"> 视功能检查</div>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.motion">眼球运动:{{studentWord.motion}}</td>
            <td colspan="5" v-if="!studentWord.motion">眼球运动:--/--</td>
            <td colspan="4" v-if="studentWord.stereopsis">立体检查:{{studentWord.stereopsis}}</td>
            <td colspan="4" v-if="!studentWord.stereopsis">立体检查:--/-- </td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.cover">遮盖眼位:{{studentWord.cover}}</td>
             <td colspan="5" v-if="!studentWord.cover">遮盖眼位:--/-- </td>
            <td colspan="4" v-if="studentWord.worth">Worth-4点:{{studentWord.worth}}</td>
            <td colspan="4" v-if="!studentWord.worth">Worth-4点:--/-- </td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" v-if="studentWord.assembly">集合近点:{{studentWord.assembly}}</td>
            <td colspan="5" v-if="!studentWord.assembly">集合近点:--/-- </td>
            <td rowspan="3">调节灵敏度</td>
            <td colspan="3" v-if="studentWord.splRight">右眼:{{studentWord.splRight}}cpm</td>
            <td colspan="3" v-if="!studentWord.splRight">右眼:{{studentWord.splRight}}cpm</td>
          </tr>
          <tr class="noBorder">
            <td colspan="5" rowspan="2" v-if="studentWord.colourVision">色觉检查:{{studentWord.colourVision}}</td>
            <td colspan="5" rowspan="2" v-if="!studentWord.colourVision">色觉检查:--/--</td>
            <!-- <td >调节灵敏度</td> -->
             <td colspan="3" v-if="studentWord.splLeft">左眼:{{studentWord.splLeft}}cpm</td>
             <td colspan="3" v-if="!studentWord.splLeft">左眼:--/--</td>
          </tr>
          <tr class="noBorder">
           <!-- <td colspan="5">色觉检查</td> -->
           <!-- <td >调节灵敏度</td> -->
            <td colspan="3" v-if="studentWord.splBinoculus">双眼:{{studentWord.splBinoculus}}cpm</td>
            <td colspan="3" v-if="!studentWord.splBinoculus">双眼:  --/--</td>
          </tr>
          <tr class="reportTitle">
            <div style="margin: 10px 0">生物测量检查</div>
          </tr>
          <!-- 生物测量检查 -->
          <tr class="bgReport">
            <td>眼别</td>
            <td colspan="2">水平曲率值</td>
            <td colspan="2">垂直曲率值</td>
            <td >眼轴长度</td>
            <td colspan="2">前房深度</td>
            <td colspan="2">晶体厚度</td>
          </tr>
          <tr class="bgReport" >
            <td >右眼</td>
            <td colspan="2" v-if="studentWord.levelRight">{{studentWord.levelRight}}</td>
            <td colspan="2" v-if="!studentWord.levelRight">--/--</td>
            <td colspan="2" v-if="studentWord.verticalRight">{{studentWord.verticalRight}}</td>
            <td colspan="2" v-if="!studentWord.verticalRight">--/--</td>
            <td v-if="studentWord.axialLengthRight">{{studentWord.axialLengthRight}}</td>
            <td v-if="!studentWord.axialLengthRight">--/--</td>
            <td colspan="2" v-if="studentWord.acdRight">{{studentWord.acdRight}}</td>
            <td colspan="2" v-if="!studentWord.acdRight">--/--</td>
            <td colspan="2" v-if="studentWord.ltRight">{{studentWord.ltRight}}</td>
            <td colspan="2" v-if="!studentWord.ltRight">--/--</td>
          </tr>
          <tr class="bgReport">
            <td>左眼</td>
            <td colspan="2" v-if="studentWord.levelLeft">{{studentWord.levelLeft}}</td>
            <td colspan="2" v-if="!studentWord.levelLeft">--/--</td>
            <td colspan="2" v-if="studentWord.verticalLeft">{{studentWord.verticalLeft}}</td>
            <td colspan="2" v-if="!studentWord.verticalLeft">--/--</td>
            <td v-if="studentWord.axialLengthLeft">{{studentWord.axialLengthLeft}}</td>
            <td v-if="!studentWord.axialLengthLeft">--/--</td>
            <td colspan="2" v-if="studentWord.acdLeft">{{studentWord.acdLeft}}</td>
            <td colspan="2" v-if="!studentWord.acdLeft">--/--</td>
            <td colspan="2" v-if="studentWord.ltLeft">{{studentWord.ltLeft}}</td>
            <td colspan="2" v-if="!studentWord.ltLeft">--/--</td>
          </tr>
          <tr class="reportTitle">
            <div style="margin: 10px 0">眼部健康检查</div>
          </tr>
          <!-- 眼部健康检查 -->
           <tr  class="noBorder">
             <td colspan="9" v-if="studentWord.slitLamp">裂隙灯检查:{{studentWord.slitLamp}}</td>
             <td colspan="9" v-if="!studentWord.slitLamp">裂隙灯检查:--/--</td>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.retCam">眼底照相检查:{{studentWord.retCam}}</td>
             <td colspan="9" v-if="!studentWord.retCam">眼底照相检查:--/--</td>
           </tr>
           <!-- 身体情况 -->
           <tr class="reportTitle">
             <div style="margin: 10px 0">身体情况</div>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.height">身高(cm): {{studentWord.height}}</td>
             <td colspan="9"  v-if="!studentWord.height">身高(cm):--/--</td>
           </tr>
           <tr class="noBorder">
             <td colspan="9" v-if="studentWord.weight">体重(kg):{{studentWord.weight}}</td>
             <td colspan="9" v-if="!studentWord.weight">体重(kg):--/--</td>
           </tr>
          <!-- 处理建议 -->
          <tr class="reportTitle">
             <div style="margin: 10px 0">处理建议</div>
          </tr>
          <tr class="noBorder">
             <td colspan="9" style="height: 10px 20px" v-if="studentWord.suggest">{{studentWord.suggest}}</td>
              <td colspan="9" style="padding: 10px 20px" v-if="!studentWord.suggest">--/--</td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios'
  import echarts from 'echarts'
  export default {
    name: 'card',
	created() {
		let role = window.sessionStorage.getItem('role');
			//this.getInfo('','','','')
			this.handleClick({name: 'luo'},)
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
				begin: '',
				end: '',
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
				diopitercontent: [],
				diopitertotalElements:0,
				diopitersize: 5,
				diopiterpage: 1,
				diopiternumber: 0,
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
        showEyeHealth: false,
		    showDiopter: false,
        wearstucontent: [],
        wearstupageSize: 10,
        wearstusize: 5,
        wearstutotal:0,
        wearstutotalElements: 0,
        wearstunumber: 1,
        wearstupage: 1,
        delType: '',
        showSearch: true, // 展示搜索框
        eyeHealthContent: [],
        leftLuoX: [],
        leftLuoY: [],
        rightLuoX: [],
        rightLuoY: [],
        studentWord: [],
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
      //切换裸眼档案
    handleClick(tab, event) {
        this.activeName = tab.name;
        this.showHistory = false;
        this.showWearHistory = false;
        this.showEyeHealth = false;
				this.showDiopter = false;
        this.stupage = 1;
        this.wearstupage = 1;
				this.diopiterpage = 1;
				this.$store.commit('changeTab', tab.name)
        if(tab.name == 'luo') {
          this.url = '/lightspace/school/screeningList'
        }else if(tab.name == 'wear') {
          this.url =  '/lightspace/school/screeningWearList'
        }else if(tab.name == 'base') {
          this.url = '/lightspace/school/getStudent'
        }else if(tab.name == 'eyeHealth') {
          this.url="/lightspace/school/getAllWord"
        }else if(tab.name == 'diopter') {
          this.url="/lightspace/school/diopterList"
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
	//屈光度历史分页
	handleDiopiterHistoryCurrentChange(val) {
	  this.diopiterpage = val;
	  this.getDiopterHistory()
	},
    //历史戴镜分页
    handleWearHistoryCurrentChange(val) {
      this.wearstupage = val;
      this.getWearSudentHistory();
    },
    //进入判断类型
    getInfo(classId, name, begin, end) {
		if(begin && end) {
			this.begin = begin;
			this.end = end;
		}else {
			this.begin = '';
			this.end = '';
		}
      if(classId && !name) {  // 如果只有班级
        this.type = 'class';
        this.id = classId;
      }else if(classId && name) { // 如果班级和姓名都存在
        this.type ="student";
        this.name = name;
        // this.id = '';
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
		  this.openFullScreen();
		  var b = new Date(this.begin);
		  var begin =b.getFullYear() + '-' + (b.getMonth() + 1) + '-' + b.getDate();
		  var e = new Date(this.end);
		  var end =e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
		  let param = new FormData();
			param.append('begin', this.begin);
			param.append('end', this.end);
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
		 this.closeFullScreen(this.openFullScreen())
     if(res.data.status == 200) {
			 //console.log(res.data.data)
       res ? res= res.data.data: '';
			 this.content = res.content;
			  let arr = res.content;
				// if(this.activeName="diopter") {
				// 	let newArr =	arr.forEach((item, index) => {
				// 		if(item.dc1L.indexOf("<") == -1) {
				// 			let i = item.dc1L.indexOf("<") == -1;
				// 			item = item.substring(i);
				// 		}
				// 	})
				// 		console.log(newArr)
				// }
				if(this.activeName == 'diopter') {
					arr.forEach((item, index) => {
						if(item.dc1L.indexOf("<") > -1) {
							 item.dc1L = item.dc1L.substring(1)
						}
						if(item.dc1R.indexOf("<") > -1) {
							 item.dc1R = item.dc1R.substring(1)
						}
					})
					 this.content = arr;
				} 
       this.totalElements = res.totalElements;
       this.size = res.size;
       this.number = res.number + 1;
       if(this.content.length) {
         this.content.forEach((item) => {
           item.lastTime = item.date + '\xa0\xa0' + item.time
         })
       }
     }else {
       // this.$message.error(res.data.msg)
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
        this.getSudentHistory();
      }else if(type == 'wear') {
        this.showWearHistory = true;
        this.studentId  = studentId;
        this.getWearSudentHistory();
      }else if(type == 'eyeHealth') {
        this.showEyeHealth = true;
        this.studentId  = studentId;
        this.getEyeHealth()
      }else if(type == 'diopter') {
		this.showDiopter = true;
		this.studentId  = studentId;
		this.getDiopterHistory();
		  
	  }
   },
   getDiopterHistory() {
     this.openFullScreen()
		let param = new FormData();
         param.append('page', this.stupage);
         param.append('studentId', this.studentId);
         axios({
           method: 'post',
           data: param,
           url: '/lightspace/school/diopterByStudentId'
         }).then(this.handleGetDiopterSucc.bind(this)).catch((err) => {console.log(err)})
   },
    handleGetDiopterSucc(res) {
      this.closeFullScreen(this.openFullScreen())
      if(res.data.status == 200) {
        res ? res= res.data.data: '';
        this.diopitercontent = res.content;
        this.diopitertotalElements = res.totalElements;
        this.diopitersize = res.size;
        this.diopiternumber = res.number + 1;
      }else {
        this.$message.error(res.data.msg);
        this.diopitercontent = [];
      }
    },
   getEyeHealth(studentId) {
     let param = new FormData();
     param.append('id', this.studentId);
     axios({
       method: 'post',
       data: param,
       url: '/lightspace/school/getStudentWord'
     }).then(this.handleGetPersonEyeHealthSucc.bind(this)).catch((err) => {console.log(err)})
   },
   handleGetPersonEyeHealthSucc(res) {
      res? res = res.data.data: '';
       if(res.studnetWord !== null) {
         this.studentWord = res.studnetWord;
         if(this.studentWord.gender == 0) {
           this.studentWord.gender = '男'
         }else {
           this.studentWord.gender = '女'
         }
       }
       this.leftLuoX = res.visionLeft.xDataList;
       this.leftLuoY = res.visionLeft.yDataList;
       this.rightLuoX = res.visionRight.xDataList;
       this.rightLuoY = res.visionRight.yDataList;
       this.drawLine();
   },
   drawLine() {
     let myChart = echarts.init(this.$refs.left);
      this.option = {
       title: {
            text: '裸眼视力分析',
            subtext: '',
            left: 'center'
        },
       legend: {
             orient: 'vertical',
              data: ['左眼裸眼视力', '右眼裸眼视力'],
              left: 'left',
              y: 'top',
              top:'5%',
              right: '15%'
            },
      grid: {                   // 折线位置
              top:'8%',
              right: '10%',
            },
       xAxis: {
           type: 'category',
           symbol: 'none',
           boundaryGap: true,
           data: this.leftLuoX
       },
       yAxis: {
           type: 'value',
           min:0,
           max:2,
           splitNumber:10
       },
       series: [{
          name: '左眼裸眼视力',
           data: this.leftLuoY,
           type: 'line',
           smooth: true,
            color: 'blue'
       },
       {
           name: '右眼裸眼视力',
           data: this.rightLuoY,
           type: 'line',
            smooth: true,
           color: 'red'
       }]
     }
     myChart.setOption(this.option)
    },
   getWearSudentHistory() {
      this.openFullScreen()
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
       this.closeFullScreen(this.openFullScreen())
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
     this.openFullScreen()
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
      this.closeFullScreen(this.openFullScreen())
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
      }else if(type == 'diopiter') {
		    deleurl = '/lightspace/school/deleteDiopter'
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
      if(res.data.status == 200) {
         this.$message.success('删除成功')
         if(this.delType == 'luo') {
           this.getSudentHistory()
         }else if(this.delType == 'wear') {
           this.getWearSudentHistory()
         }else if(this.delType == 'diopiter') {
			this.getDiopterHistory()
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
 .report
    margin: 20px 0
    th, td
        padding: 30px;
        text-align:center;
        border:1px solid #ccc;
        text-align: center;
  .newReport {
     font-size: 16px;
     // background:#fffbed;
  }
   .reportTitle {
     color: #6794EB;
     font-size:20px;
     margin: 10px 0;
     font-weight: bold;
     background: #fff;

   }
  table {border-collapse:collapse;border:none;}
  table td {border:solid #6794EB 2px;padding: 10px 16px;fonts-size: 14px !important}
  .noBorder  td{
    border:solid #fff 3px;
    background: #fffbed;
    text-align: left;
  }
  .bgReport {
     background: #fffbed;
  }
  .bgReport td {
    text-align:center !important;
  }
  .suggest {
    height: 40px;
  }
</style>
