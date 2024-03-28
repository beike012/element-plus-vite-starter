<template>
  <el-config-provider namespace="ep" :locale="zhCn">
    <BaseHeader />
    <div class="flex main-container">
      <BaseSide />
      <div w="full" py="4" px="4">
        <router-view />
      </div>
    </div>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style>
#app {
  /* text-align: center; */
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>
