<template>
<div>
  <!--上方搜索框-->
  <div>

  </div>
  <!--上方搜索框-->
  <!--下方表格+分页器-->
  <div>
    <!--表格-->
      <div>
      <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      style="width: 100%"
      highlight-current-row>
      <el-table-column
        fixed
        label="序号"
        type="index"
        width="50"
        align="center">
     </el-table-column>
      <el-table-column
        fixed
        prop="fields.danger_type"
        label="危险等级"
        width="150"
        align="center"
        :filters="[{ text: '低风险', value: 1 },
         { text: '中风险', value: 2 },
         { text: '高危攻击源', value: 3 }
         ]"
         :filter-method="filterDanger"
         filter-placement="bottom-end">
        
        <template slot-scope="scope">
          <el-tag :type="scope.row.fields.danger_type === 1 ? 'success' : (scope.row.fields.danger_type === 2 ? 'info':'danger')" disable-transitions>
                    {{scope.row.fields.danger_type===1 ? "低风险":(scope.row.fields.danger_type===2 ? '中风险':'高危攻击源') }}
                  </el-tag>
        </template>

      </el-table-column>
      <el-table-column
        fixed
        prop="fields.source_ip"
        label="来源IP地址"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fields.attack_type"
        label="攻击类型"
        width="120"
        align="center">

        <template slot-scope="scope">
          <el-tag disable-transitions>
                    {{scope.row.fields.attack_type===1 ? "DOS":(scope.row.fields.attack_type===2 ? 'U2L':(scope.row.fields.attack_type===3 ? 'R2L':'PROBE')) }}
                  </el-tag>
        </template>

      </el-table-column>
      <el-table-column
        prop="fields.attack_num"
        label="攻击次数"
        width="120"
        align="center">
      </el-table-column>
      <el-table-column
        prop="fields.capture_port"
        label="捕获端口"
        width="300"
        align="center">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">禁止该IP地址</el-button>
          <el-button type="text" color="red" size="small">信任该源地址</el-button>
        </template>
      </el-table-column>
    </el-table>
      </div>
      <!--表格-->
      <!--分页器-->
      <div>
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="query.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="query.pageSize"
        :total="total"
        hide-on-single-page
        background
        layout="prev, pager, next"/>
      </div>
      <!--分页器-->

  </div>
  <!--下方表格+分页器-->

</div> 
</template>

<script>
  export default {
     created() {
    this.fetchData()
  },
    methods: {
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('attack/getDangerAttackList',this.query).then((data) => {
        this.total = data.total      
        var danger_list = JSON.parse(data.danger_list)
        console.log(danger_list)
        this.list = danger_list
        this.listLoading = false
        this.loading = false
          })
          .catch((err) => {
            //执行失败
            console.log(err)
            this.loading = false
          })
    },
//一页显示多少个数据
      handleSizeChange(val){
        this.query.pageSize = val //将当前页面的信息设置
        this.fetchData()//重新请求数据
      },
//换页操作
      handleCurrentChange(val){//处理当前页面变换请求
        this.query.currentPage = val
        this.fetchData() //重新请求数据
      },
//根据唯一识别码查询
      searchByOnlyCode(){
        this.query.filterText = this.filterText
        this.fetchData() //重新请求数据
      },
//清除搜索条件
      clearFilter(){
        this.query.filterText = ''
        this.fetchData() //重新请求数据
      },
      filterDanger(value, row,column){
        // const property = column['property'];
        // return row[property] === value;
      return row.fields.attack_type === value;
      },
    },

    data() {
      return {
      list: null,  //表格数据
      listLoading: true,  //默认显示加载
      isHighAttackReport:false,//开关绑定值
      filterText:'',
      query:{//查询信息
          currentPage:1,
          pageSize:8,
          filterText:'',
          isHighAttackReport:false
      },
      total:0,
      }
    }
  }
</script>