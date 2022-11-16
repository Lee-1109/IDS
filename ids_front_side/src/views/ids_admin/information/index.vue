<!--管理员信息管理-->
<template>
  <div>
    <div style="height: 70%; ">
      <!--上方搜索栏-->
      <div style=" display: flow-root ">
        <div style="width:30%; float:left; overflow:hidden;">
          <el-input v-model="filterText"  placeholder="账号精确查询" style="margin-bottom:30px;" />
        </div>
        <div style="float:left; overflow:hidden;">
          <el-button  type="primary" @click="searchByAdminId">搜索</el-button>
          <!---@click="searchByAdminId"-->
        </div>
        <div style="float:left; overflow:hidden;">
          <el-button  type="danger" @click="clearFilter">清除</el-button>
          <!---@click="clearFilter"-->
        </div>
      </div>
      <div>
        <div style=" display: flow-root ">
          <div style="width:10%; float:left; overflow:hidden;">
            <el-button type="danger"  size="small"   @click="addAdmin" >添加单个用户</el-button>
          </div>
          <!--上传组件-->
          <el-row>
            <div>
              <div style="float:left; overflow:hidden;">
                <div style="float:left; overflow:hidden;">
                    <div slot="tip" class="el-upload__tip">只能上传xlsx/xls文件</div>
                </div>
                <div style="float:left; overflow:hidden;">
                  <el-upload
                  class="upload-demo"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChange"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUpLoad"
                  :auto-upload="false"
                  :multiple="false"
                  accept=".xlsx"
                  :file-list="fileList">
                    <el-button size="small" type="primary">从Excel批量导入</el-button>
                  </el-upload>
                </div>
                <div style="float:left; overflow:hidden;">
                    <el-row>
                      <el-button type="info" size="small" @click="closeDialog">取 消</el-button>
                      <el-button type="warning" size="small" @click="submitUpload">上 传</el-button>
                    </el-row>
                </div>

              </div> 
            </div>
          </el-row>

        </div><!--父容器-->
    <!-- 添加用户dialog对话框  点击时才显示出对话框-->
          <el-dialog align="left" title="添加用户" :visible.sync="addAdminVisible" width="50%" >
            <!--主体部分 -->
            <el-form :model="addUserForm" status-icon :rules="addUserFormRul" ref="addUserFormRel" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input  v-model="addUserForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="addUserForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="权限" prop="is_super_admin">
                <el-select v-model="companyType" :placeholder="请选择用户类型" @change="selectTypeFresh">
                <el-option 
                  v-model.number="addUserForm.is_super_admin" 
                  v-for="item in adminType" :key="item.id" 
                  :label="item.type" 
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button @click="addAdminVisible = false">取 消</el-button>
              <el-button type="primary" @click="addUserList">确 定</el-button>
            </span>
          </el-dialog>
      </div>
      <!--下方表格-->
      <div style="width: 80%">
          <el-table ref="filterTable" :data="tableData" style="width: 100%">
              <el-table-column
                label="序号"
                type="index"
                width="50"
                align="center">
              </el-table-column>

              <el-table-column
              prop="fields.admin_name"
              label="管理员账号"
              width="100"/>

              <el-table-column
              prop="fields.is_login"
              label="登录状态"
              width="100"
              :filters="[{ text: '在线', value: true }, { text: '离线', value: false }]"
              :filter-method="filterLogin"
              filter-placement="bottom-end">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.fields.is_login === true ? 'danger' : 'info'" disable-transitions>
                    {{scope.row.fields.is_login ? "当前在线":'离线' }}
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column
              prop="fields.is_super_admin"
              label="权限筛选"
              width="100"
              :filters="[{ text: '超级管理员', value: true }, { text: '网络安全员', value: false }]"
              :filter-method="filterTag"
              filter-placement="bottom-end">
                <template slot-scope="scope">
                    <el-tag 
                    :type="scope.row.fields.is_super_admin === true ? 'primary' : 'success'" 
                    disable-transitions>
                    {{scope.row.fields.is_super_admin ? "超级管理员":'网络安全员' }}
                    </el-tag>
                </template>
              </el-table-column >
                  <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                          <el-button 
                          slot="reference" 
                          size="mini"  
                          @click="handleModifyClick(scope.row)">
                          修改密码
                          </el-button>        
                    </template>
                  </el-table-column> 

                  <el-table-column
                    fixed="right"
                    label="删除"
                    width="100">
                    <template slot-scope="scope">
                          <el-button 
                          slot="reference" 
                          size="mini"  
                          @click="handleDeleteClick(scope.row)">删除
                          </el-button>        
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //批量上传文件列表
        fileList: [
        //   {
        //  name: 'food.jpeg',
        //  url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        //  }, 
        ],
        adminType:[
          {
            type:'超级管理员',
            value:true

          },{
            type:'网络安全员',
            value:false

          }
        ],
        addAdminVisible:false,//添加管理员框是否可见
        addUserForm:{//添加的用户数据列表
          username:' ',
          password:' ',
          is_super_admin:false
        },
        alterAdminData:{},
        tableData: [],
        filterText:'',
        query:{
          currentPage:1,
          pageSize:8,
          filterText:''
        },
        total:0
        ,
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
//添加用户规则
				addUserFormRul: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 8,
							max: 16,
							message: '长度为8-16个字符',
							trigger: 'blur'
						}
					],										
        },
      }//return
    },
    created(){
      this.loadAdmin() //创建时自动调用methods里的方法
    },
    methods: {
//获取管理员列表
      loadAdmin(){
        this.$store.dispatch('admin/getAdminList',this.query)
        .then((data) => {
           var dataList = JSON.parse(data.admin_list) //解析传递的json数组
            this.total = data.total//向前端传递数据
            this.tableData = dataList 
            // this.loading = false  
        })
        .catch((err) => {
            console.log(err)
            // this.loading = false
        })
      },
      formatter(row, column) {
        var adminType = row.fields.is_super_admin
        if(adminType == true) return "超级管理员"
        else return "网络安全员"
        //return row.fields.is_super_admin;
      },
      filterTag(value, row) {
        return row.fields.is_super_admin === value;
      },
      filterLogin(value, row){
          return row.fields.is_login === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
//删除管理员
      handleDeleteClick(user) {
        console.log(user)
        var admin_type = user.fields.is_super_admin ==1?'超级管理员':'网络安全员'
        this.$confirm('此操作将永久删除:'+admin_type+'【'+user.fields.admin_name+'】, 请谨慎操作。是否删除?', '提示', {
          confirmButtonText: '仍要删除',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.alterAdminData={'id':user.pk}
          console.log(user.pk)
          this.$store.dispatch('admin/deleteAdmin',this.alterAdminData).then(() => {
            console.log('用户删除成功')
          })
          .catch((err) => {
             console.log('用户删除失败')
            console.log(err)  
          })
//弹框提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          });}).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
//修改密码
      handleModifyClick(user) {
        this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
          inputErrorMessage: '请确认为8-16位之间的数字字母组合'
        }).then(({value}) => {//输入密码后点击确认
              this.$confirm('你好'+'确认将密码修改为：'+value, '提示', {
              confirmButtonText: '确认',
              cancelButtonText: '取消',
              type: 'warning'}).then(() => {//点击确认后执行这里
              this.alterAdminData={'password':value,'id':user.pk}//组装发送的参数请求
                  //异步更新密码
              this.$store.dispatch('admin/updatePassword',this.alterAdminData).then(() => {
                console.log('密码更新成功')
              })
              .catch((err) => {
                console.log(err)  
              })
              
              this.$message({
                type: 'success',
                message: '密码修改成功!'});
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消输入'
          });       
        });
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
//添加管理员
      addAdmin(){
        console.log('点击添加单个用户')
        this.addAdminVisible = true
      },
//下拉框选择时
      selectTypeFresh(val){
        // val 代表 value 值
        if (val) {
          // 操作选中角色发生变化
          this.$set(this.editObject, this.editObject.role, val)
        } else {
          this.$set(this.editObject, this.editObject.role, '')
        }
      },
//点击确定发送添加新用户接口
			addUserList(){
				this.$refs.addUserFormRel.validate(valid=>{
					//校验规则全部正确向后台发送请求
					if(!valid) return;
          //验证通过 异步请求添加用户数据
          this.$store.dispatch('admin/addAdmin', this.addUserForm).then((data) => {
            //执行成功
						this.addAdminVisible = !this.addAdminVisible //将弹出的对话框关闭
            this.$Message.success("添加用户成功")
          })
          .catch((err) => {
            //执行失败
            console.log(err)
          })
				})	
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
      },
//文件上传相关功能
      //点击移除
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      //预览
      handlePreview(file) {

        console.log(file);
      },
      //数量超过
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },      
      //列表移除前
      beforeRemove(file, fileList) {
        return this.$confirm(`确定取消导入 ${ file.name }？`);
      },
      //上传文件时检查
      beforeUpLoad(file){
        //文件类型
        const isType = file.type === 'application/vnd.ms-excel'
        const isTypeComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        const fileType = isType || isTypeComputer
        if(!fileType) {
            this.$message.error('上传文件只能是xls/xlsx格式！')
        }
        // 文件大小限制为10M
        const fileLimit = file.size / 1024 / 1024 < 10;
        if(!fileLimit) {
            this.$message.error('上传文件大小不超过1M！');
        }
        return fileType && fileLimit
      },
//执行上传文件
      upLoadFile(file,fileList){


      },
    }//method()
  }//data()
</script>