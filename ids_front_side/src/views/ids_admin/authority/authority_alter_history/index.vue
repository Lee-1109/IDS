<template>
  <div style="width:100%">
    <!--下载按钮-->
      <div>
        <el-button @click="downloadExcel" class="el-button-color add-button-box" size="medium" type="warning">
        <i class="el-icon-download el-icon--right"></i>导出为Excel
        </el-button>
      </div>
    <el-table
      id="exportTable"
      :data="tableData"
      style="width: 100%"
      height="600"
      align="center">
      <el-table-column
        label="序号"
        type="index"
        width="100"
        align="center">
      </el-table-column>

      <el-table-column
        prop="fields.alter_time"
        label="权限变更时间"
        width="200"
        align="center">
      </el-table-column>

      <el-table-column label="详细信息" width="600" align="center">
        <el-table-column
          prop="fields.admin_name"
          label="姓名"
          width="120"
          align="center">
        </el-table-column>

        <el-table-column label="操作条目" align="center">
          <!--操作类型-->
            <el-table-column
            prop="fields.is_login"
            label="操作类型"
            width="120"
            align="center"
            :filters="[{ text: '升权操作', value: true }, { text: '降权操作', value: false }]"
            :filter-method="filterOperateType"
            filter-placement="bottom-end">
              <template slot-scope="scope">
                <el-tag v-if="(scope.row.fields.auth_before_alter < scope.row.fields.auth_after_alter)"
                :type="(scope.row.fields.auth_before_alter < scope.row.fields.auth_after_alter) == true ? 'danger' : 'info'" 
                disable-transitions>
                  <i class="el-icon-caret-top" style="color: red;"></i> 升权操作
                </el-tag>
                <el-tag v-else
                :type="(scope.row.fields.auth_before_alter < scope.row.fields.auth_after_alter) == true ? 'danger' : 'info'" 
                disable-transitions>
                  <i class="el-icon-caret-bottom" style="color: green;"></i>降权操作
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column
              label="原始权限"
              width="120"
              align="center">
                <!--一种判断转值方式-->
              <template slot-scope="scope">
                <span v-if="scope.row.fields.auth_before_alter == 0">网络安全员</span>
                <span v-else>超级管理员</span>
              </template>
            </el-table-column>

            <el-table-column
              label="更改后权限"
              width="120" 
              align="center">
              <!--一种判断转值方式-->
              <template slot-scope="scope">
                <span v-if="scope.row.fields.auth_after_alter == 0">网络安全员</span>
                <span v-else>超级管理员</span>
              </template>
            </el-table-column>

          <el-table-column
            prop="fields.alter_by"
            label="操作人"
            width="100">
          </el-table-column>

        </el-table-column><!--操作条目-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import FileSaver from 'file-saver'
  export default {
    data() {
      return {
        tableData: [],
        alterModel:[]
      }
    },
    mounted(){//钩子函数
      this.loadAlterHistory()
    },
    methods: {
      //获取管理员列表
      loadAlterHistory(){
        this.$store.dispatch('attack/listAlterHistory')
        .then((data) => {
            var dataList = JSON.parse(data) //解析传递的json数组
            console.log(dataList)
            this.tableData = dataList
            this.loading = false
        })
        .catch((err) => {
            console.log(err)
            this.loading = false
        })
      },
      //下载excel表格
      downloadExcel(){
        const XLSX = require('xlsx')
        console.log('XLSX',XLSX,FileSaver)
        // 使用 this.$nextTick 是在dom元素都渲染完成之后再执行
        this.$nextTick(function () {
        // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
        const xlsxParam = { raw: true } 
        const wb = XLSX.utils.table_to_book(document.querySelector('#exportTable'), xlsxParam)
        // 导出excel文件名
        let fileName = '权限变更日志' + new Date().getTime() + '.xlsx'
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
      filterOperateType(value, row){
        return row.fields.is_login === value;
      }

    }//method
  }
</script>