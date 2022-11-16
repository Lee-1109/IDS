<!--个人信息修改页面-->
<template>
  <div class="app-container">   
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="昵称">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.region" placeholder="请选择你的性别">
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
      </el-form-item>
      <!--下拉选择框-->
      <el-form-item label="籍贯">
        <el-col :span="11">
          <el-select v-model="form.region" placeholder="请选择省份">
            <el-option label="江西" value="1" />
            <el-option label="北京" value="0" />
          </el-select>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-select v-model="form.region" placeholder="请选择城市">
            <el-option label="上饶" value="1" />
            <el-option label="东城" value="0" />
          </el-select>
        </el-col>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择个日期" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="选择个时间" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <!--开关按钮-->
      <el-form-item label="是否公开">
        <el-switch v-model="form.delivery" />
      </el-form-item>
<!--
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
    
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
-->
      <el-form-item label="个性签名">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

