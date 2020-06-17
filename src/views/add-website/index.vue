<template>
  <div class="page-add-website">
    添加网站信息
    <el-form ref="for-add-website" :rules="rulesAddWebsite" :model="addWebsite">

    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'AddWebsite',
    data: function() {
      return {
        addWebsite: {},
        rulesAddWebsite: {}
      }
    }
  }
</script>

<style scoped>

</style>
