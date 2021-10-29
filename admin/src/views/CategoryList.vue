<template>
  <div>
    <h1>分類列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240px"></el-table-column>
      <el-table-column prop="parent.name" label="上級分類"></el-table-column>
      <el-table-column prop="name" label="分類名稱"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">刪除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove (row) {
      this.$confirm(`是否確定刪除分類?  "${row.name}"`, '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`rest/categories/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      })
    }
  }
}
</script>

