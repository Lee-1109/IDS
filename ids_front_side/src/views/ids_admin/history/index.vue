<template>
<div>
    <!--上方搜索栏-->
  <div style=" display: flow-root ">
    <div style="width:30%; float:left; overflow:hidden;">
      <el-input v-model="filterText"  placeholder="账号精确查询" style="margin-bottom:30px;" />
    </div>
    <div style="float:left; overflow:hidden;">
      <el-button  type="primary" @click="searchByAdminId" >搜索</el-button>
      <!---@click="searchByAdminId"-->
    </div>
    <div style="float:left; overflow:hidden;">
      <el-button  type="danger" @click="clearFilter">清除</el-button>
      <!---@click="clearFilter"-->
    </div>
  </div>
  <div> 
  <!--下载按钮-->
      <div>
        <el-button @click="downloadExcel" class="el-button-color add-button-box" size="medium" type="warning">
        <i class="el-icon-download el-icon--right"></i>另存为Excel
        </el-button>
      </div>
  </div>
    <!--下方表格-->
  <div style="width:70%; height: 70%; ">
    <el-table
    id="exportTable"
    :data="tableData"
    style="width: 100%"
    stripe
    >
    <!--: row-class-name="tableRowClassName"-->
    <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
    </el-table-column>

    <el-table-column
      prop="fields.admin_name"
      label="账号"
      align="center"
      width="180">
    </el-table-column>
    <el-table-column
      prop="fields.login_time"
      align="center"
      label="登录时间">
    </el-table-column>
    <el-table-column
      prop="fields.logout_time"
      align="center"
      label="登出时间">
    </el-table-column>
    </el-table>
  </div>
  <!--"position:fixed; bottom:0 "-->
  <div >
    <!--分页组件-->
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
<!--js-->
<script>
import FileSaver from 'file-saver'

  export default {
    data() {//数据列表
      return {
        tableData: [],//表格数据
        filterText:'',
        query:{
          currentPage:1,
          pageSize:8,
          filterText:''
        },
        total:0
      }
    },
    created(){
      this.loadLoginRecord()
    },
    methods:{
      //获取登录记录信息
      loadLoginRecord(){
          this.$store.dispatch('admin/getAdminLoginRecordList',this.query)
        .then((data) => {
            var dataList = JSON.parse(data.login_record_list) //解析传递的json数组
            this.total = data.total//向前端传递数据
            this.tableData = dataList 
            this.loading = false   
        })
        .catch((err) => {
            console.log(err)
            this.loading = false
        })
      },
      handleSizeChange(val){
        this.query.pageSize = val //将当前页面的信息设置
        this.loadLoginRecord()//重新请求数据
      },
      handleCurrentChange(val){//处理当前页面变换请求
        this.query.currentPage = val
        this.loadLoginRecord() //重新请求数据
      }, 
//设置每行的颜色
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 == 0) {
          return 'warning-row';
        } else if (rowIndex%2 == 1) {
          return 'success-row';
        }
        return 'primary-row';
      },  
//通过用户账号搜索
      searchByAdminId(){
        this.query.filterText = this.filterText
        this.loadLoginRecord()
      },
//清除账号搜索
      clearFilter(){
        this.query.filterText = ''
        this.loadLoginRecord()
      },
// 表格数据写入excel，并导出为Excel文件
      downloadExcel(){
        const XLSX = require('xlsx')
        console.log('XLSX',XLSX,FileSaver)
        // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行
        this.$nextTick(function () {
        // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
        const xlsxParam = { raw: true } 
        const wb = XLSX.utils.table_to_book(document.querySelector('#exportTable'), xlsxParam)
        // 导出excel文件名
        let fileName = '管理员登录日志' + new Date().getTime() + '.xlsx'
        const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          // 下载保存文件
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), fileName)
        } catch (e) {
          if (typeof console !== 'undefined') {
          console.log(e, wbout)
          }
        }
        return wbout
        })
      },
    }//methods
  }
</script>

<style>
  .el-table .warning-row {
    background: rgb(255, 255, 255);
  }

  .el-table .success-row {
    background: #e7f5c1;
  }

  .el-table .primary-row {
    background: #e9f0cd;
  }
</style>