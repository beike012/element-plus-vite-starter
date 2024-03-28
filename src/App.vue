<template>
  <el-config-provider namespace="el" :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>
<style>
#app {
  /* text-align: center; */
  color: var(--el-text-color-primary);
}
</style>
