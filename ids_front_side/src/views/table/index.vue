<!--展示表格-->
<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="账号">
        <template slot-scope="scope">{{ scope.row.title }}</template>
      </el-table-column>

      <el-table-column label="密码" width="110" align="center">
        <template slot-scope="scope"><span>{{ scope.row.author }}</span></template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="登陆状态" width="200">
        <template slot-scope="scope"><i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      
      <el-table-column align="center" prop="created_at" label="权限" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="操作" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>


<!--js代码-->
<script>
import { getAttackList } from '@/api/attack'

export default {
  filters: {
    // statusFilter(status) {
    //   const statusMap = {
    //     published: 'success',
    //     draft: 'gray',
    //     deleted: 'danger'
    //   }
    //   return statusMap[status]
    // }
  },

  data() {
    return {
      list: null,
      listLoading: true
    }
  },

  created() {
    this.fetchData()
  },
// 获取API发来的数据
  methods: {
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('attack/getAttackList').then((data) => {
            //执行成功
            console.log('store返回的attack_list数据'+data)
            var attackList = JSON.parse(data)
            console.log(attackList)
            this.listLoading = false
            this.loading = false
          })
          .catch((err) => {
            //执行失败
            console.log(err)
            this.loading = false
          })
    }
  }
}
</script>
