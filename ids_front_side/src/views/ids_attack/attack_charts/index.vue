<!--展示表格-->
<template>

  <div class="app-container">
          <!--上方搜索栏-->
      <div style=" display: flow-root ">
        <div style="width:30%; float:left; overflow:hidden;">
          <el-input v-model="filterText"  placeholder="输入攻击标识码查询" style="margin-bottom:30px;" />
        </div>
        <div style="float:left; overflow:hidden;">
          <el-button  type="primary" @click="searchByOnlyCode" >搜索</el-button>
        </div>
        <div style="float:left; overflow:hidden;">
          <el-button  type="danger" @click="clearFilter">清除</el-button>
        </div>
      </div>
      <el-row>
        <div style=" display: flow-root ">
            <div style="margin-bottom:30px; width:30%; float:left; overflow:hidden;">
              <el-switch
                  v-model="isHighAttackReport"
                  @change='changeSwitchStatus'
                  active-text="仅展示高频攻击报文"
                  inactive-text="全部报文"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
              </el-switch>
            </div>
            <div style="width:30%; float:left; overflow:hidden;">
            <!--下载按钮-->
              <div>
                <el-button @click="downloadExcel" class="el-button-color add-button-box" size="medium" type="warning">
                <i class="el-icon-download el-icon--right"></i>下载攻击详情为excel
                </el-button>
              </div> 
            </div>
        </div>
   
      </el-row>

      <!--上传按钮-->
      <div>     
      </div>
    <el-table
      id="exportTable"
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      highlight-current-row>
      <el-table-column
        label="序号"
        type="index"
        width="50"
        align="center">
     </el-table-column>
     <el-table-column  label="攻击标识码"  align="center">
        <template slot-scope="scope"><span>{{ scope.row.fields.only_code }}</span></template>
      </el-table-column>

      <el-table-column align="center" label="攻击来源ip">
        <template slot-scope="scope">{{ scope.row.fields.source_ip}}</template>
      </el-table-column>
            
      <el-table-column align="center" label="报文类型" >
        <template slot-scope="scope">
          <span>{{ scope.row.fields.protocol_type }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="攻击类型" >
        <template slot-scope="scope">
          <span>{{ scope.row.fields.attack_type }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="攻击日期" >
        <template slot-scope="scope"><i class="el-icon-time" />
          <span>{{ scope.row.fields.attack_date }}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" prop="created_at" label="攻击时间" >
        <template slot-scope="scope"><i class="el-icon-time" />
          <span>{{ scope.row.fields.attack_time }}</span>
        </template>
      </el-table-column>
    </el-table>
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


<!--js代码-->
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  filters: {

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
      total:0
    }
  },

  created() {
    this.fetchData()
  },
// 获取API发来的数据
  methods: {     
    fetchData() {
      this.listLoading = true
      this.$store.dispatch('attack/getAttackList',this.query).then((data) => {
        this.total = data.total      
        var attackList = JSON.parse(data.attack_list)
        console.log(attackList)
        this.list = attackList
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
      changeSwitchStatus(){
        this.query.isHighAttackReport = this.isHighAttackReport
        this.fetchData()
        
      },
      downloadExcel(){
        const XLSX = require('xlsx')
        console.log('XLSX',XLSX,FileSaver)
        // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行
        this.$nextTick(function () {
        // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
        const xlsxParam = { raw: true } 
        const wb = XLSX.utils.table_to_book(document.querySelector('#exportTable'), xlsxParam)
        // 导出excel文件名
        let fileName = '攻击报文详情' + new Date().getTime() + '.xlsx'
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
  }
}
</script>
