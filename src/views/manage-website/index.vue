<template>
  <div class="page-manage-website">
    <el-row :gutter="20" class="operation-bar">
      <el-col :span="6">
        <el-button
          size="mini"
          type="danger"
          @click="handleBatchDelete()"
        >批量删除</el-button>
      </el-col>
      <el-col :span="6" :offset="12">
        <el-input
          v-model="keyValue"
          size="mini"
          placeholder="输入关键字搜索"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-col>
    </el-row>
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
        label="网站分类"
        width="120"
        prop="category"
        sortable
      >
        <template slot-scope="scope">{{ scope.row.categoryName }}</template>
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
        <template slot-scope="scope">{{ scope.row.gmtCreate | dataFormat }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="修改日期"
        width="120"
        prop="gmtModified"
        sortable
      >
        <template slot-scope="scope">{{ scope.row.gmtModified | dataFormat }}</template>
      </el-table-column>
      <el-table-column
        header-align="center"
        align="center"
        label="操作"
      >
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
  import { getAllWebsiteByUserId } from '@/api/add-website'
  export default {
    data() {
      return {
        listLoading: false,
        industryCategory: [],
        tableData: [], // 表格数据
        multipleSelection: [], // 选择的数据项
        keyValue: '', // 关键字搜索
        currentPage: 1 // 当前页
      }
    },
    computed: {
      ...mapGetters([
        'idAdmin'
      ])
    },
    async created() {
      await this.handleGetWbCategories()
      this.fetchData()
    },
    methods: {
      fetchData() {
        this.listLoading = true
        getAllWebsiteByUserId(this.idAdmin).then(response => {
          this.tableData = response.data.tbWebsites
          for (let i = 0; i < this.tableData.length; i++) {
            // 通过分类ID获取分类名称
            const category = this.handleGetWbCategoryName(this.tableData[i].idCategory)
            if (category.name) {
              this.tableData[i]['categoryName'] = category.name
            }
          }
          this.listLoading = false
        })
      },
      // 获取网站分类
      handleGetWbCategories() {
        return new Promise((resolve, reject) => {
          this.$store.dispatch('website/getWbCategories').then(res => {
            this.industryCategory = res
            resolve(res)
          }).catch(err => {
            reject(err)
          })
        })
      },
      handleGetWbCategoryName(idCategory) {
        return this._lodash.find(this.industryCategory, category => {
          return category.id === idCategory
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
      handleEdit(index, row) {
        this.$router.push({ name: 'edit-website', params: { row: row }})
      },
      handleDelete() {},
      handleBatchDelete() {
        console.log(this.multipleSelection)
      },
      handleFilterByKeyword() {
        console.log(this.keyValue)
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
