<template>
  <div style="width: 100%">
        <!--上方搜索栏-->
    <div style=" display: flow-root;">
      <div style="width:30%; float:left; overflow:hidden;">
        <el-input v-model="filterText"  placeholder="账号精确查询"  style="margin-bottom:30px;" />
      </div>
      <div style="float:left; overflow:hidden;">
        <el-button @click="searchByAdminId" type="primary">搜索</el-button>
      </div>
      <div style="float:left; overflow:hidden;">
        <el-button @click="clearFilter" type="danger">清除</el-button>
      </div>
    </div>
    <!--下方表格-->
    <div>
      <el-table
      :data="tableData"
      style="width: 80%"
      align="center">

      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
      </el-table-column>

      <el-table-column
        label="账号创建日期"
        width="180"
        align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.fields.create_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="账号"
        width="180"
        align="center">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.fields.admin_name }}</el-tag>
            </div>
          </el-popover>
        </template>

      </el-table-column>

      <el-table-column
        label="当前权限"
        width="180"
        align="center">

        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag v-if="scope.row.fields.is_super_admin" size="medium" type='danger'>超级管理员</el-tag>
              <el-tag v-else size="medium" type='success'>网络安全员</el-tag>
            </div>
          </el-popover>
        </template>
        
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button 
          :disabled="scope.row.fields.is_super_admin" 
          size="mini" 
          @click="handleUpdateAuthority(scope.row.pk)"
          >提升权限
          </el-button>

          <el-button 
          :disabled="!scope.row.fields.is_super_admin" 
          size="mini" 
          type="danger" 
          @click="handleUpdateAuthority(scope.row.pk)">
          降低权限
          </el-button>
          <!--传入的row.pk是管理员的id主键-->
        </template>
      </el-table-column>
      </el-table>
    </div>
    <!--分页组件-->
    <div >
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        alterAdminData:{},//被修改权限的管理员的详细数据
        query:{
          currentPage:1,
          pageSize:8,
          filterText:''
        },
        total:0,
        filterText:'',
      }
    },//data
    mounted(){//钩子函数
      this.loadAdmin()
    },
    methods: {
      handleUpdateAuthority(id){
          this.$confirm('确定将用户权限变动？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {//点击确认时执行该语句
//=============================================
          this.alterAdminData = {'id':id,'alterBy':'18045221'}
          this.$store.dispatch('admin/upAuthority',this.alterAdminData).then(() => {
            //这里的操作是将数据写在本地的

            // this.$router.push({ path:  '/authority/auth_manage' })//重定向
            this.$router.go(0)//重定向
            console.log("提权成功")
        })
        .catch((err) => {
            console.log(err+'提权失败')
            this.loading = false
        })
//===========================================
          this.$message({
            type: 'success',
            message: '权限更改成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已为您取消操作'
          });          
        });
      }//handleUpdateAuthority
      ,
      //获取管理员列表
      loadAdmin(){
        this.$store.dispatch('admin/getAdminList',this.query)
        .then((data) => {
            var dataList = JSON.parse(data.admin_list) //解析传递的json数组
            this.total = data.total//向前端传递数据
            this.tableData = dataList 
            this.loading = false
        })
        .catch((err) => {
            console.log(err)
            this.loading = false
        })
      },
//一页显示多少个数据
      handleSizeChange(val){
        this.query.pageSize = val //将当前页面的信息设置
        this.loadAdmin()//重新请求数据
      },
//换页操作
      handleCurrentChange(val){//处理当前页面变换请求
        this.query.currentPage = val
        this.loadAdmin() //重新请求数据
      }, 
//通过用户账号搜索
      searchByAdminId(){
        this.query.filterText = this.filterText
        this.loadAdmin()
      },
//清除账号搜索
      clearFilter(){
        this.query.filterText = ''
        this.loadAdmin()
      }
    }//method
  }
</script>