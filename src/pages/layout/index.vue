<template>
  <BaseHeader />
  <div class="flex main-container">
    <BaseSide />
    <div w="full" py="4" px="4">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style>
.main-container {
  height: calc(100vh - var(--el-menu-item-height) - 4px);
}
</style>
