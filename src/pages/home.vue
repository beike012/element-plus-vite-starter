<script setup lang="ts">
import { testSelect } from "~/apis/modules/login";

testSelect().then((res) => {
  console.log(res);
});
</script>
<template>
  <!-- <BaseMap></BaseMap> -->
</template>
<style lang="scss" scoped></style>
