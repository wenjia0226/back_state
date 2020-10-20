<template>
  <div>
    <div class="schoolBox">
     <div class="schoolNow">当前校区</div>
     <div class="schoolName"> {{schoolName}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'currentschool',
    created() {
      this.schoolName = window.sessionStorage.getItem('schoolName')
    }
   }

</script>

<style lang="stylus" scoped>
  .schoolBox
    display: flex
    align-items: center
    margin-bottom: 20px
    .schoolNow
       font-size: 20px
       font-weight: bold
       letter-spacing :3px
       color:#64c0ff
       margin: 0 10px
     .schoolName
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
</style>
