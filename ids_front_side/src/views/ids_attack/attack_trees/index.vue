<!--树查看攻击信息-->
<template>
  <div class="app-container">
      <div style=" display: flow-root ">
          <div style="width:50%; float:left; overflow:hidden;">
        <!--时间选择器-->
            <div class="block"  style="margin-bottom:30px;">
                <span class="demonstration">时间筛选</span>
                    <el-date-picker
                    v-model="value2"
                    type="datetimerange"
                    :picker-options="pickerOptions"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    align="right">
                    </el-date-picker>
            </div>
        </div>
        <!--
        <div style="width:50%; float:left; overflow:hidden;">
           
            <el-input v-model="filterText" placeholder="" style="margin-bottom:30px;" />
        </div>
        -->

      </div>
      
<!--下方树形选择器和图表-->
      <div style=" display: flow-root ">
        <div style="width:20%; float:left; overflow:hidden;">
        <!--树形月份 查看器-->
            <el-tree
            ref="monthTree"
            :data="treeLabelMonth"
            :props="treeProps"
            :filter-node-method="filterNode"
            class="filter-tree"/>  
            <!--default-expand-all--->
        </div>



        <!--树形种类 攻击分类查看器-->
        <div style="width:20%; float:left; overflow:hidden; ">
            <el-tree
            ref="attackTree"
            node-key='label'
            :data="treeLabelAttack"
            :props="attackTreeProps"
            :filter-node-method="filterNode"
            @node-click="handleTreeNodeClick"
            class="filter-tree"/> 
        </div>
        <div style="width:60%; float:right; overflow:hidden;">
            <div >
            <!--攻击 指定月份 图表展示区-->
                <div id="myChartMonth" style="width: 100%; height: 270px; " />
            </div>
        </div>
      </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      treeLabelMonth: [{
        id: 1,
        label: '2022年',
        children: [{
          id: 4,
          label: '2022年第一季度',
          children: [{
            id: 9,
            label: '2022年1月'
          }, {
            id: 10,
            label: '2022年2月'
          },{
            id: 10,
            label: '2022年3月'
          }]
        },{
          
          id: 4,
          label: '2022年第二季度',
          children: [{
            id: 9,
            label: '2022年4月'
          }, {
            id: 10,
            label: '2022年5月'
          },{
            id: 9,
            label: '2022年6月'
          }]

        }]
      }, {
        id: 2,
        label: '2021年',
        children: [{
          id: 5,
          label: '2021年第一季度',
          children: [{
            id: 6,
            label: '2021年1月'
          }, {
            id: 7,
            label: '2021年2月'
          }]
        }]
      }, 
      ],
      treeLabelAttack: [{
        id: 1,
        label: 'DOS攻击',
        children: [{
          id: 4,
          label: '2022年',
          children: [{
            id: 9,
            label: '2022年4月'
          }, {
            id: 10,
            label: '2022年3月'
          }]
        }]
      }, 
      {
        id: 2,
        label: 'U2L攻击',
        children: [
          {
            id: 5,
            label: '2022年',
            children: [
              {
                id: 6,
                label: '2022年4月'
              }, 
              {
                id: 7,
                label: '2022年3月'
              }
            ]
          }
        ]
      }, 
      {
        id: 3,
        label: 'R2L攻击',
        children: [{
          id: 7,
          label: '2022年'
        }, {
          id: 8,
          label: '2021年'
        }]
      }, 
      {
        id: 4,
        label: 'PROBE攻击',
        children: [{
            id: 7,
            label: '2022年',
        }, {
            id: 8,
            label: '2021年',
            children:[{
              id: 15,
              label: '2021年12月'
            }
            ,{
              id: 17,
              label: '2021年11月'
            }]
        }]
      }
      ],
      treeProps: {
        children: 'children',
        label: 'label'
      },
      //攻击分类树属性
      attackTreeProps: {
        children: 'children',
        label: 'label'
      },
      //时间筛选器
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value2: ''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },
  mounted(){//钩子函数
      this.draw()
    },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    draw(){
        //初始化折线图表
        var echarts = require('echarts')
        var myChartMonth = echarts.init(document.getElementById('myChartMonth'))
        let base = +new Date(2022, 2, 1);
        let oneDay = 24 * 3600 * 1000;
        let date = [];
        let data = [Math.random() * 300];
        for (let i = 1; i < 31; i++) {
            var now = new Date((base += oneDay));
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
        }//设置一个月的日期
//月份折线图配置项
        var option = {
        title: {
            text: '月份攻击图'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
            }
        },
        legend: {//折线图颜色说明区域数据
            data: ['R2L', 'PROBE', 'DOS', 'U2R']
        },
        toolbox: {
            feature: {
            saveAsImage: {}//下载保存
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
            boundaryGap: false,
            data: date //设置横坐标名称
            }
        ],
        yAxis: [
            {
            type: 'value'
            }
        ],
        series: [
            {
            name: 'R2L',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [20, 32, 101, 34, 90, 230, 210,10,145,124,31,12,51,135,45,91,135,15,35,145,124,135,141,135,123,11,13,23,41,16,141]
            },

            {
            name: 'PROBE',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [412, 671, 124, 213, 21, 671, 21,510,245,421,41,12,261,135,241,591,135,135,511,145,124,135,141,135,123,124,731,123,213,512,1341]
            },
            {
            name: 'U2R',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [12, 214, 12, 31, 56, 61, 6,21,54,12,32,28,6,15,41,91,35,15,11,15,24,35,11,35,23,24,31,23,13,52,141]
            },

            {
            name: 'DOS',
            type: 'line',
            stack: 'Total',
            areaStyle: {},
            emphasis: {
                focus: 'series'
            },
            data: [1412, 2671, 1124, 613, 611, 421, 421,420,515,421,341,312,261,135,241,131,251,241,231,145,124,135,141,241,161,124,731,123,213,512,1341]
            },


        ]
        };
        myChartMonth.setOption(option)
    },
    //节点点击事件
    handleTreeNodeClick(data){
      const a =this.$refs.attackTree.getNode(data.label)
      //console.log(data)
      if(a.childNodes.length==0){
        console.log(a)
        console.log('点击的是子节点')
        console.log('a.label:'+a.label)
      }
      
    },
  }
}
</script>

