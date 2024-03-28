<script lang="ts" setup>
import { useRoute } from "vue-router";
import { toggleDark } from "~/composables";
const headers = [
  {
    label: "增",
    route: "/create",
  },
  {
    label: "删",
    route: "/delete",
  },
  {
    label: "改",
    route: "/update",
  },
  {
    label: "查",
    route: "/read",
  },
];

const circleUrl = "/user.jfif";
const route = useRoute();
</script>

<template>
  <div class="base-header">
    <el-menu mode="horizontal" router :default-active="route.path">
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--el-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
      <el-menu-item h="full" v-for="item in headers" :index="item.route">
        {{ item.label }}
      </el-menu-item>
    </el-menu>
    <el-dropdown class="bh-avatar">
      <el-avatar :src="circleUrl" size="large" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<style lang="scss" scoped>
.base-header {
  position: relative;
  .bh-avatar {
    position: absolute;
    top: 2px;
    right: 16px;
    cursor: pointer;
  }
}
</style>
