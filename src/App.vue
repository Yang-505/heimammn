<template>
    <div id="app">
      <router-view></router-view>
    </div>
</template>

<script>
export default {
  name:'App',
  // name:"App",
};
</script>

<style lang="less">
/* 两种选择引入css文件 */

// @import url("./styles/base.less");
 @import url("~@/styles/base.less");
</style>
