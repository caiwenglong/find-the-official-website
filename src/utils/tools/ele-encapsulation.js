import {
  MessageBox,
  Message,
  Notification,
  Loading
} from 'element-ui'

const defaultMsg = {
  type: 'success',
  info: '提示信息',
  title: '提示',
  cfmButtonText: '确定',
  cancelButtonText: '取消',
  cfmMsgType: 'success',
  cfmMsgInfo: '删除成功!',
  cancelMsgType: 'info',
  cancelMsgInfo: '已取消删除!',
  duration: 2000
}

export function encConfirm(objMsg) {
  objMsg = Object.assign(defaultMsg, objMsg)
  return MessageBox.confirm(objMsg.info, objMsg.title, {
    cfmButtonText: objMsg.cfmButtonText,
    cancelButtonText: objMsg.cfmButtonText,
    type: objMsg.type
  }).then((res) => {
    return res
  }).catch((err) => {
    return err
  })
}

export function ybyNotify(objMsg) {
  objMsg = Object.assign(defaultMsg, objMsg)
  Notification({
    title: objMsg.type,
    message: objMsg.info,
    type: objMsg.title
  })
}

export function ybyMessage(objMsg) {
  objMsg = Object.assign(defaultMsg, objMsg)
  Message({
    type: objMsg.type,
    message: objMsg.info
  })
}

/*
*   加载数据标识
* */
let cusLoading
export function eleLoading() {
  cusLoading = Loading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}
export function closeEleLoading() {
  cusLoading.close()
}
