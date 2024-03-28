<template>
  <el-form :inline="true" :model="formInline" class="bk-form-inline">
    <el-form-item label="Approved by">
      <el-input v-model="formInline.user" placeholder="Approved by" clearable />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select
        v-model="formInline.region"
        placeholder="Activity zone"
        clearable
      >
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-date-picker
        v-model="formInline.date"
        type="date"
        placeholder="Pick a date"
        clearable
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" w="full" class="mb20" max-height="700">
    <el-table-column type="index" width="50" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column label="Operations" width="180">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script lang="ts" setup>
import { reactive } from "vue";
// 表单
const formInline = reactive({
  user: "",
  region: "",
  date: "",
});
const onSubmit = () => {
  console.log("submit!");
};
// 表格
type User = {
  date: string;
  name: string;
  address: string;
};
const arr = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const tableData = [
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
  ...arr,
];
const handleEdit = (index: number, row: User) => {
  console.log(index, row);
};
const handleDelete = (index: number, row: User) => {
  console.log(index, row);
};
</script>

<style>
.bk-form-inline .el-input {
  --el-input-width: 220px;
}

.bk-form-inline .el-select {
  --el-select-width: 220px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>
