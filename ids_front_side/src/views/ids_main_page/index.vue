<!--主页 展示攻击的图表信息-->

<template>
  <div>
    <!--给父容器设置这个属性可以避免重叠-->
    <div style=" display: flow-root ">
        <div style="width:50%; float:left; overflow:hidden;">
          <!--饼图-->
          <div id="myChart_bt" style="width: 100%;height: 300px;" /> 
        </div>

        <div  style="width:50%; float:left; overflow:hidden;">
          <!--直方图-->
          <div id="myChart_zft" style="width: 100%; height: 300px; " />
        </div>
        
    </div>

    <div>
          <!--折线图-->
          <div id="myChart_zxt" style="width: 100%; height: 400px;"/>   
    </div>  
  </div>
</template>

<!-- JS文件 -->
<script>
import { color } from 'echarts'
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
  data(){
    return {
        attack_num:[]
      }
  },
  mounted(){//钩子函数
      this.draw()
    },
    methods:{
      //画图函数
       draw(){
          var echarts = require('echarts')
          // 初始化echarts实例
          var myChart_zxt = echarts.init(document.getElementById('myChart_zxt'))
          var myChart_zft = echarts.init(document.getElementById('myChart_zft'))
          var myChart_bt = echarts.init(document.getElementById('myChart_bt'))
          var x_time = this.getNowTime()
//直方图配置数据
        var option_zft={
              title: {
                text: '网络流量情况汇总'
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  data: ['NORMAL', 'U2R', 'R2L', 'DOS', 'PROBE'],
                  axisTick: {
                    alignWithLabel: true
                  }
                }
              ],
              yAxis: [
                {
                  type: 'value'
                }
              ],
              series: [
                {
                  name: '攻击次数',
                  type: 'bar',
                  barWidth: '60%',
                  data: []   
                }
              ]
        }
//折线图配置数据
        var option_zxt = {
            title: {
              text: '近24小时攻击态势',
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
              // 时间段数
              data:x_time
            },
            yAxis: {//y坐标轴
              type: 'value',
              axisLabel: {
                formatter: '{value} 次'
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
            //趋势数据
            series: [
              {
                name: '攻击次数',
                type: 'line',
                smooth: true,
                // prettier-ignore
                data: [1000, 1235, 1214, 1231, 1351, 414, 2061, 500, 1210, 3190, 2210, 1467, 4013, 2157, 1042, 750, 2461, 3001, 2110, 431,3211,1043,2158,0,0],
                markArea: {
                  itemStyle: {
                    color: 'rgba(255, 173, 177, 0.4)'
                  },
                  data: [
                    [
                      {
                        name: '重点时段',
                        xAxis: '07:00'
                      },
                      {
                        xAxis: '10:00'
                      }
                    ],
                    [
                      {
                        name: '重点时段',
                        xAxis: '16:00'
                      },
                      {
                        xAxis: '19:00'
                      }
                    ]
                  ]//data
                }
              }
            ]
        }//option_zxt
//饼图配置数据
        var option_bt = {
            title: {
              text: '入侵类别一览图',
              subtext: '四大类攻击情况',
              left: 'center'
            },
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'vertical',
              left: 'left'
            },
            series: [
              {
                name: '攻击次数',
                type: 'pie',
                radius: '50%',
                data: [],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
        }
      //为前面的Echarts配置数据
          myChart_zft.setOption(option_zft)//直方图
          myChart_zxt.setOption(option_zxt)//折线图
          myChart_bt.setOption(option_bt)//饼图
//异步获取图表服务器端数据数据
      this.$store.dispatch('attack/loadAttackData')
            .then((data_attack) => {
              var chartsData = [data_attack['NORMAL'],data_attack['U2R'],data_attack['R2L'],data_attack['DOS'],data_attack['PROBE']]
              //设置直方图数据
              myChart_zft.setOption({//异步设置数据
                  series: [
                  {
                    data: chartsData   //设置数据 
                  }
              ]
              })
              //设置饼图数据
              myChart_bt.setOption({
                  series: [
                    {
                      data: [
                        { value: data_attack['U2R'], name: 'U2R' },
                        { value: data_attack['R2L'], name: 'R2L' },
                        { value: data_attack['DOS'], name: 'DOS' },
                        { value: data_attack['PROBE'], name: 'PROBE' }
                      ]
                    }
                  ]
              })
              this.loading = false
            })
            .catch((err) => {
                console.log(err)
                this.loading = false
            })
      },
      getNowTime(){
        var date = []
        var oneHour = 1000*60*60
        var queueLength = 24
        var initTime = new Date(); // 获得当前时间
        // 此处是将时间戳改为正常Date格式时间
        var now = new Date(initTime.getTime() - queueLength*oneHour);
        function addData() {
            now = now.toLocaleDateString() + ' \n ' + now.getHours() + now.toLocaleTimeString().substr(-6, 6);
            date.push(now); // 填充横坐标数组 时间
            now = new Date(+new Date(now) + oneHour);
        }//addData()

        // 先赋值24个，同时数组上限为24
        for (var i = 1; i < 26; i++) {
            addData();
        }
        console.log(date)
        return date
    }
    },//method 
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
