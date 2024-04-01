<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
const pathMatch = route.fullPath;
</script>
<template>
  <h1>Not Found</h1>
  <p>The requested URL {{ pathMatch }} was not found on this server.</p>
</template>
<style lang="scss" scoped>
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  unicode-bidi: isolate;
  margin-left: 8px;
}
p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  unicode-bidi: isolate;
  margin-left: 8px;
}
</style>
