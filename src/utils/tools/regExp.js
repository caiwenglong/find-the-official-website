const isHttpUrl = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/
const isHttpUrlExp = new RegExp(isHttpUrl)

export function isHttpStart(url) {
  return isHttpUrlExp.test(url)
}
