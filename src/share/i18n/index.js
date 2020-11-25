import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './en_us'
import zhLocale from './zh_cn'

Vue.use(VueI18n)

const localeLange = {
  en: {
    ...elementEnLocale,
    ...enLocale
  },
  zh: {
    ...elementZhLocale,
    ...zhLocale
  }
}

const i18n = new VueI18n({
  locale: 'zh',
  messages: localeLange
})

export { i18n }
