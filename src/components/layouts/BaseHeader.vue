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
// const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
const route = useRoute();
</script>

<template>
  <div class="base-header">
    <el-menu mode="horizontal" router :default-active="route.path">
      <el-menu-item h="full" @click="toggleDark()">
        <button
          class="border-none w-full bg-transparent cursor-pointer"
          style="height: var(--ep-menu-item-height)"
        >
          <i inline-flex i="dark:ep-moon ep-sunny" />
        </button>
      </el-menu-item>
      <el-menu-item h="full" v-for="item in headers" :index="item.route">
        <!-- <router-link :to="item.route" w="full">
        {{ item.label }}
      </router-link> -->
        {{ item.label }}
      </el-menu-item>
    </el-menu>
    <el-avatar :src="circleUrl" size="large" />
  </div>
</template>
<style lang="scss" scoped>
.base-header {
  position: relative;
  .ep-avatar {
    position: absolute;
    top: 2px;
    right: 16px;
  }
}
</style>