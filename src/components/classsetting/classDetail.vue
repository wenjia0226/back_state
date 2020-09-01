<template>
  <div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column
           align="center"
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
           align="center"
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
           align="center"
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
  </div>
</template>

<script>
  export default {
    name: 'classdetail',
    data() {
      return {
        tableData: [ {
                 id: 3,
                 date: '2016-05-01',
                 name: '王小虎',
                 address: '上海市普陀区金沙江路 1519 弄',
                 children: [{
                     id: 31,
                     date: '2016-05-01',
                     name: '王小虎',
                     address: '上海市普陀区金沙江路 1519 弄'
                   }, {
                     id: 32,
                     date: '2016-05-01',
                     name: '王小虎',
                     address: '上海市普陀区金沙江路 1519 弄'
                 }]
               }]
      }
    },
    methods: {
       showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      }
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

</style>
