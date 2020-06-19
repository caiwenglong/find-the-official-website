<template>
  <div class="page-manage-website">
    <div class="btn-wrapper">
      <el-button
        size="mini"
        type="danger"
        @click="handleBatchDelete()">批量删除</el-button>
    </div>
    <el-table
      ref="multipleTableWebsite"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort="{prop: 'dateModified', order: 'descending'}"
      @selection-change="handleSelectionChange">
      <el-table-column
        header-align="center"
        align="center"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="网站名称"
        width="120">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="address"
        label="网站地址"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="url"
        label="网站logo"
        show-overflow-tooltip>
        <template slot-scope="scope"><a class="logo-wrapper" :href="scope.row.address"><img :src="scope.row.url" alt="logo"></a></template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="hitsToday"
        label="今日点击量"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="hitsTotal"
        label="总点击量"
        width="100">
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="创建日期"
        width="120"
        prop="dateCreate"
        sortable>
        <template slot-scope="scope">{{ scope.row.dateCreate }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="修改日期"
        width="120"
        prop="dateModified"
        sortable>
        <template slot-scope="scope">{{ scope.row.dateModified }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作">
        <template slot="header">
          <el-input
            v-model="keyValue"
            size="mini"
            placeholder="输入关键字搜索">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50, 100]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const tableData = [{
    dateCreate: '2016-05-03',
    dateModified: '2020-05-08',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }, {
    dateCreate: '2016-05-02',
    dateModified: '2020-05-07',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }, {
    dateCreate: '2016-05-04',
    dateModified: '2020-05-06',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }, {
    dateCreate: '2016-05-01',
    dateModified: '2020-05-05',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }, {
    dateCreate: '2016-05-07',
    dateModified: '2020-05-01',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }]
  export default {
    data() {
      return {
        tableData: tableData, // 表格数据
        multipleSelection: [], // 选择的数据项
        keyValue: '', // 关键字搜索
        currentPage: 1 // 当前页
      }
    },
    methods: {
      handleSelectionChange(val) {
        console.log(val)
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
      },
      handleEdit() {},
      handleDelete() {},
      handleBatchDelete() {
        console.log(this.multipleSelection)
      }
    }
  }
</script>

<style scoped lang="scss">
  .logo-wrapper {
    width: 108px;
    display: inline-block;
    img {
      width: 100%;
    }
  }
  .pagination-wrapper {
    text-align: center;
    margin-top: 20px;
  }
  .btn-wrapper {
    margin-top: 20px;
    padding-left: 20px;
  }
</style>
