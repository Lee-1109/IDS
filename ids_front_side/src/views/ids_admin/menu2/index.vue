<!--管理员信息管理
// <template>
//   <div style="padding:30px;">
//     <el-alert :closable="false" title="menu 2" />
//   </div>
// </template>
-->
<!--主页 展示攻击的图表信息-->

<template>
  <div>
      <div id="myChart_zft" style="width: 100%;height: 270px;" />
      <!--折线图-->
      <div id="myChart_zxt" style="width: 100%;height: 270px;"/>
    </div>
</template>

<!-- JS文件 -->
<script>
//mapGetter获取本地存储的数据
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  //计算属性 理论上可以使用methods属性来代替
  computed: {//在store/getter.js中获取
    ...mapGetters([
      'name',
      'admin_list'
    ])
  },
  
  mounted(){//钩子函数
      this.draw()
      this.loadAdmin()
      this.getAdminListToFront()
    },

  methods:{
      //画图函数
       draw(){
      var echarts = require('echarts')
      // 初始化echarts实例
      var myChart_zxt = echarts.init(document.getElementById('myChart_zxt'))
      var myChart_zft = echarts.init(document.getElementById('myChart_zft'))
      // 配置参数
      var option_zft = {
        title: {
          text: '分类别攻击情况汇总'
        },
        tooltip: {

        },
        legend: {
          data: ['攻击数量']
        },
        xAxis: {
          data: ['DOS', 'R2L', 'U2L', 'PROBE', 'NORMAL']
        },
        yAxis: {

        },
        series: [{
          name: '次数',
          type: 'bar',
          data: [9000,12798, 65, 13543, 12,9898]
        }]
      }//option_zft

      var option_zxt = {
          title: {
            text: '近24小时内攻击态势',
            subtext: '攻击数量'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {//X坐标轴
            type: 'category',
            boundaryGap: false,
            // prettier-ignore
            data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
          },

          yAxis: {//y坐标轴
            type: 'value',
            axisLabel: {
              formatter: '{value} W'
            },
            axisPointer: {
              snap: true
            }
          },
          visualMap: {
            show: false,
            dimension: 0,
            pieces: [
              {
                lte: 6,
                color: 'green'
              },
              {
                gt: 6,
                lte: 8,
                color: 'red'
              },
              {
                gt: 8,
                lte: 14,
                color: 'green'
              },
              {
                gt: 14,
                lte: 17,
                color: 'red'
              },
              {
                gt: 17,
                color: 'green'
              }
            ]
          },
          series: [
            {
              name: '攻击次数',
              type: 'line',
              smooth: true,
              // prettier-ignore
              data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
              markArea: {
                itemStyle: {
                  color: 'rgba(255, 173, 177, 0.4)'
                },
                data: [
                  [
                    {
                      name: '重点时段',
                      xAxis: '07:30'
                    },
                    {
                      xAxis: '10:00'
                    }
                  ],
                  [
                    {
                      name: '重点时段',
                      xAxis: '17:30'
                    },
                    {
                      xAxis: '21:15'
                    }
                  ]
                ]//data
              }
            }
          ]
      };//option_zxt

      //为前面的Echarts配置数据
      myChart_zft.setOption(option_zft)//直方图
      myChart_zxt.setOption(option_zxt)//折线图
    },
// this is a test instance
      //获取 axios 的管理员数据
      loadAdmin(){
          this.$store.dispatch('admin/getAdminList')
          .then((data) => {
            //this.$router.push({ path: this.redirect || '/' })
            var test = document.getElementById('test')
            var test1 = JSON.parse(data)//获取后端管理员列表数据对象
            console.log(test1[0].fields.admin_name)
            this.loading = false
          })
          .catch((err) => {
            console.log(err)
            this.loading = false
          })
      },
      getAdminListToFront(){
        return this.$store.admin_list
      }
    }//method
}//export default
</script>


<!--css文件-->
<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
