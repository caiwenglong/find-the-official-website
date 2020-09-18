<template>
  <div class="page-add-website">
    <el-form ref="addWebsiteForm" :model="formAddWebsite" :rules="rulesAddWebsite" class="form-add-website">
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="formAddWebsite.name" clearable />
      </el-form-item>
      <el-form-item label="网站地址：" prop="url">
        <el-input v-model="formAddWebsite.url" clearable />
      </el-form-item>
      <el-form-item label="网站分类：" prop="idCategory">
        <el-select v-model="formAddWebsite.idCategory" filterable placeholder="请选择分类">
          <el-option
            v-for="item in industryCategory"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="关键字：" prop="keywords">
        <el-select
          v-model="formAddWebsite.keywords"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请输入网站关键字"
        >
          <el-option
            v-for="item in keywordOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item class="no-required" label="排名竞价：" prop="delivery">
        <el-switch v-model="formAddWebsite.delivery" />
      </el-form-item>
      <el-form-item v-if="formAddWebsite.delivery" class="no-required" label="支付方式：" prop="pyMode">
        <el-radio-group v-model="formAddWebsite.payMode">
          <el-radio v-model="formAddWebsite.payMode" label="1">微信</el-radio>
          <el-radio v-model="formAddWebsite.payMode" label="2">支付宝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formAddWebsite.delivery" label="竞价价格：" prop="price">
        <el-input v-model="formAddWebsite.price" type="number" step="0.01" autocomplete="off" />
        <label>元</label>
      </el-form-item>
      <el-form-item label="上传logo：" class="no-required">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          list-type="picture"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item class="btn-wrapper">
        <el-button type="success" @click="linkToUploadWebsite">通过excel批量上传</el-button>
        <el-button type="primary" @click="handleSubmit('addWebsiteForm')">添加</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  /* 网站默认对象 */
  const defaultForm = {
    idAdmin: '',
    name: '',
    url: '',
    logo: '',
    idCategory: '',
    price: 1,
    payMode: '1',
    delivery: false,
    bidding: false,
    keywords: ''
  }

  const keywordOptions = [{
      value: 'HTML',
      label: 'HTML'
    }, {
      value: 'CSS',
      label: 'CSS'
    }, {
      value: 'JavaScript',
      label: 'JavaScript'
    }]
  import { addWebsite, getWbCategories } from '../../api/add-website'
  import { mapGetters } from 'vuex'

  export default {
    name: 'AddWebsite',
    data: function() {
      const ValidateURL = (rule, value, callback) => {
        let message = ''
        if (!this.isURL(value)) {
          message = '请输入正确的URL地址'
          callback(new Error(message))
        } else {
          callback()
        }
      }
      return {
        formAddWebsite: Object.assign({}, defaultForm),
        industryCategory: [],
        keywordOptions: keywordOptions,
        controls: false,
        rulesAddWebsite: {
          name: [
            this.rulesRequired('请输入网站名称'),
            { min: 2, max: 64, message: '网站名称长度在2-64个字符之间', trigger: 'blur' }
          ],
          url: [
            this.rulesRequired('请输入网站地址'),
            { validator: ValidateURL }
          ],
          category: [
            this.rulesRequired('请选择网站分类', 'change')
          ],
          price: [
            { required: true, message: '请填写正确的金额,保留两位小数', pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/ }
          ]
        }
      }
    },
    created() {
      this.handleGetWbCategories()
    },
    computed: {
      ...mapGetters([
        'idAdmin'
      ])
    },
    methods: {
      // 验证Url
      isURL(url) {
        const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
        const urlReg = new RegExp(strRegex)
        return urlReg.test(url)
      },
      rulesRequired(message, triggerEvent) {
        return { required: true, message: message, trigger: triggerEvent || 'blur' }
      },

      // 获取网站分类
      handleGetWbCategories() {
        getWbCategories().then(res => {
          console.log(res.data.wbCategoryList)
          if (res.data && res.data.wbCategoryList && res.data.wbCategoryList.length) {
            this.industryCategory = res.data.wbCategoryList
          }
        })
      },

      // 提交表单
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.formAddWebsite.idAdmin = this.idAdmin
            addWebsite(this.formAddWebsite).then(res => {
              if (res && res.code === 'OW20000') {
                this.$message({
                  message: `网站${res.data.website.name}:${res.data.website.url}添加成功！`,
                  type: 'success'
                })
              }
            }).catch(err => {
              console.log(err.message)
            })
          } else {
            console.log(valid)
          }
        })
      },
      handleCancel() {
        this.$router.push({ name: 'manege-website' })
      },
      linkToUploadWebsite() {
        this.$router.push({ name: 'upload-website' })
      }
    }
  }
</script>

<style scoped lang="scss">
  .page-add-website {
    width: 100%;
  }
  .form-add-website {
    width: 60%;
    margin: 0 auto;
  }
  .el-input {
    width: 60%;
  }
  .btn-wrapper {
    width: 70%;
    text-align: center;
    margin-top: 52px;
    margin-bottom: 0;
  }
</style>
