<template>
  <div class="page-manage-website">
    <div class="btn-wrapper">
      <el-button
        size="mini"
        type="danger"
        @click="handleBatchDelete()"
      >批量删除</el-button>
    </div>
    <el-table
      ref="multipleTableWebsite"
      v-loading="listLoading"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort="{prop: 'dateModified', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="selection"
        width="55"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="name"
        label="网站名称"
        width="120"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="url"
        label="网站地址"
        show-overflow-tooltip
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="logo"
        label="网站logo"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <a class="logo-wrapper" :href="scope.row.url">
            <img :src="scope.row.logo" alt="logo">
          </a>
        </template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        prop="hitsToday"
        label="今日点击量"
        width="100"
      />
      <el-table-column
        header-align="center"
        align="center"
        prop="hitsTotal"
        label="总点击量"
        width="100"
      />
      <el-table-column
        header-align="center"
        align="center"
        label="创建日期"
        width="120"
        prop="gmtCreate"
        sortable
      >
        <template slot-scope="scope">{{ scope.row.gmtCreate }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="修改日期"
        width="120"
        prop="gmtModified"
        sortable
      >
        <template slot-scope="scope">{{ scope.row.gmtModified }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
      >
        <template slot="header">
          <el-input
            v-model="keyValue"
            size="mini"
            placeholder="输入关键字搜索"
          >
            <i slot="suffix" class="el-input__icon el-icon-search" />
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        :page-size="5"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  const tableData = [{
    dateCreate: '2016-05-03',
    dateModified: '2020-05-08',
    name: '百度',
    hitsToday: '123',
    hitsTotal: '123123',
    address: 'https://www.baidu.com/',
    url: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png'
  }]
  import { getList } from '@/api/table'
  export default {
    data() {
      return {
        listLoading: false,
        tableData: tableData, // 表格数据
        multipleSelection: [], // 选择的数据项
        keyValue: '', // 关键字搜索
        currentPage: 1 // 当前页
      }
    },
    created() {
      this.fetchData()
    },
    computed: {
      ...mapGetters([
        'idAdmin'
      ])
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getList(this.idAdmin).then(response => {
          this.tableData = response.data.tbWebsites
          this.listLoading = false
        })
      },
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
    padding-left: 20px;
  }
</style>
