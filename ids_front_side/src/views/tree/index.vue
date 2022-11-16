<!--树查看攻击信息-->
<template>
  <div class="app-container">
    <!--搜索框-->
    <el-input v-model="filterText" placeholder="搜索" style="margin-bottom:30px;" />
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

    <!--树形查看器-->
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all/>

  </div>
</template>

<script>
export default {
  data() {
    return {
      filterText: '',
      data2: [{
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
      }, {
        id: 2,
        label: 'U2L攻击',
        children: [{
          id: 5,
          label: '2022年',
          children: [{
            id: 6,
            label: '2022年4月'
          }, {
            id: 7,
            label: '2022年3月'
          }]
        }]
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
          children:[{
            id: 10,
            label: '2022年4月'
          },{
            id: 15,
            label: '2022年3月'
          }]
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
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

  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

