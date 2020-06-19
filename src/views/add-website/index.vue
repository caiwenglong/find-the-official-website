<template>
  <div class="page-add-website">
    <el-form ref="addWebsiteForm" :model="formAddWebsite" :rules="rulesAddWebsite" class="form-add-website">
      <el-form-item label="网站名称：" prop="name">
        <el-input v-model="formAddWebsite.name" clearable />
      </el-form-item>
      <el-form-item label="网站地址：" prop="url">
        <el-input v-model="formAddWebsite.url" clearable />
      </el-form-item>
      <el-form-item label="网站分类：" prop="category">
        <el-select v-model="formAddWebsite.category" filterable placeholder="请选择分类">
          <el-option
            v-for="item in industryCategory"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
          placeholder="请输入网站关键字">
          <el-option
            v-for="item in keywordOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
    name: '',
    url: '',
    logo: '',
    category: '',
    price: 1,
    payMode: '1',
    delivery: false,
    bidding: false,
    keywords: ''
  }
  /* 行业分类 */
  const industryCategory = [
    {
      value: '农林牧渔',
      label: '农林牧渔'
    },
    {
      value: '医药卫生',
      label: '医药卫生'
    },
    {
      value: '建筑建材',
      label: '建筑建材'
    },
    {
      value: '冶金矿产',
      label: '冶金矿产'
    },
    {
      value: '石油化工',
      label: '石油化工'
    },
    {
      value: '交通运输',
      label: '交通运输'
    },
    {
      value: '信息产业',
      label: '信息产业'
    },
    {
      value: '机械机电',
      label: '机械机电'
    },
    {
      value: '轻工食品',
      label: '轻工食品'
    },
    {
      value: '服装纺织',
      label: '服装纺织'
    },
    {
      value: '专业服务',
      label: '专业服务'
    },
    {
      value: '安全防护',
      label: '安全防护'
    },
    {
      value: '环保绿化',
      label: '环保绿化'
    },
    {
      value: '旅游休闲',
      label: '旅游休闲'
    },
    {
      value: '办公文教',
      label: '办公文教'
    },
    {
      value: '电子电工',
      label: '电子电工'
    },
    {
      value: '玩具礼品',
      label: '玩具礼品'
    },
    {
      value: '家居用品',
      label: '家居用品'
    },
    {
      value: '体育用品',
      label: '体育用品'
    }
  ]

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
        industryCategory: industryCategory,
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
    methods: {
      isURL(url) {
        const strRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
        const urlReg = new RegExp(strRegex)
        return urlReg.test(url)
      },
      rulesRequired(message, triggerEvent) {
        return { required: true, message: message, trigger: triggerEvent || 'blur' }
      },
      handleSubmit(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            console.log(valid + 'qqqq')
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
