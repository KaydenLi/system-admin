<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%;">
      <el-table-column prop="name" width="200px" label="用户"></el-table-column>
      <el-table-column prop="status" width="200px" label="状态"></el-table-column>
      <el-table-column prop="summary" label="信息摘要"></el-table-column>
      <el-table-column prop="operation" width="200px" label="操作"></el-table-column>
    </el-table>
<div style="text-align:center;margin-top:20px">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>  </div>
</template>

<script>
export default {};
</script>

<style>
</style>