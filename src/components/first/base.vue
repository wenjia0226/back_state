<template>
  <div>
    <div class="title_total">视力数据概况</div>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="base_total">
          <div class="base_icon"><i class="el-icon-user"></i></div>
          <div class="base_con">
            <div ><span>552</span><span> |</span> <span>674</span></div>
            <div class="base_inner"><span>实核人数</span><span> |</span> <span>应检人数</span></div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="base_total"  style="background: #51b9ca">
            <div class="base_icon"><i class="el-icon-user"></i></div>
            <div class="base_con">
              <div ><span>281</span><span> |</span> <span>50.9%</span></div>
              <div class="base_inner"><span>不良总人数</span><span> |</span> <span>不良率</span></div>
            </div>
          </div>
      </el-col>
      <el-col :span="6">
        <div class="base_total" style="background: #3843a1">
            <div class="base_icon"><i class="el-icon-user"></i></div>
            <div class="base_con">
              <div ><span>281</span><span> |</span> <span>50.9%</span></div>
              <div class="base_inner"><span>新增不良总人数</span><span> |</span> <span>新发率</span></div>
            </div>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'firstbase'
  }
</script>

<style lang="stylus" scoped>
  .title_total
    font-size: 20px;
    padding: 10px 10px 14px;
    font-weight: bold;
    border-bottom: 2px solid #707070;
    margin: 20px 0;
  .base_total
    width: 100%;
    background: #da4a2f
    display: flex
    align-items: center
    padding: 20px
    box-sizing: border-box;
    color: #fff
    font-size: 20px;
    .base_icon
      width: 20%
    .base_con
      flex: 1
      text-align: right
      .base_inner
        margin: 20px 0 5px
</style>
