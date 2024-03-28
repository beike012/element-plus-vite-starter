<script setup lang="ts">
import { useRoute } from "vue-router";
import { testSelect } from "~/apis/modules/login";
// testSelect().then((res) => {
//   console.log(res);
// });
const route = useRoute()
</script>
<template>
  当前路由: {{ route.path }}
</template>
<style lang="scss" scoped></style>
