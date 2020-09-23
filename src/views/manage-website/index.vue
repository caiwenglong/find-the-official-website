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
          maxlength="10"
          placeholder="输入关键字搜索"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" />
        </el-input>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTableWebsite"
      v-loading="listLoading"
      :data="tableData.filter(data => !keyValue || data.name.toLowerCase().includes(keyValue.toLowerCase()))"
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
            @click="handleDelete(scope.$index, scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination
        :page-size="pageSize"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getAllWebsiteByUserId, delWebsiteById, batchDelWebsite } from '@/api/add-website'
  const confirmBatchDel = {
    type: 'warning',
    info: '即将删除网站信息！',
    title: '删除网站信息'
  }
  const delMsg = {
    type: 'success',
    info: '删除成功'
  }
  export default {
    data() {
      return {
        listLoading: false,
        industryCategory: [], // 网站分类列表
        idList: [], // 网站ID列表
        tableData: [], // 表格数据
        multipleSelection: [], // 选择的数据项
        keyValue: '', // 关键字搜索
        currentPage: 1, // 当前页
        pageSize: 5,
        total: 0
      }
    },
    computed: {
      ...mapGetters([
        'idAdmin'
      ])
    },
    async created() {
      this.listLoading = true
      await this.handleGetWbCategories()
      this.fetchData()
    },
    methods: {
      fetchData() {
        getAllWebsiteByUserId(this.idAdmin, this.currentPage, this.pageSize).then(response => {
          this.tableData = response.data.tbWebsites
          this.total = response.data.total
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
        this.multipleSelection = val
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData()
      },
      handleEdit(index, row) {
        this.$router.push({ name: 'edit-website', params: { row: row }})
      },
      handleDelete(index, idWebsite) {
        this._tools.eleEnc.encConfirm(confirmBatchDel).then(res => {
          if (res === 'confirm') {
            this._tools.eleEnc.eleLoading()
            delWebsiteById(idWebsite).then(res => {
              if (res.code === 'OW20000') {
                this.tableData.splice(index, 1)
                this._tools.eleEnc.closeEleLoading()
                this._tools.eleEnc.ybyMessage(delMsg)
              }
            })
          }
        })
      },
      // 批量删除网站
      handleBatchDelete() {
        this._tools.eleEnc.encConfirm(confirmBatchDel).then(res => {
          if (res === 'confirm') {
            this.handleGetIdList()
            this._tools.eleEnc.eleLoading()
            batchDelWebsite(this.idList).then(res => {
              if (res.code === 'OW20000') {
                this.handleDelTableData()
                this._tools.eleEnc.closeEleLoading()
                this._tools.eleEnc.ybyMessage(delMsg)
                this.$router.push({ name: 'manege-website' })
              }
            })
          }
        })
      },
      handleGetIdList() {
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.idList.push(this.multipleSelection[i].id)
        }
      },
      handleDelTableData() {
        for (let i = 0; i < this.idList.length; i++) {
          this._lodash.remove(this.tableData, item => {
            return item.id === this.idList[i]
          })
        }
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
