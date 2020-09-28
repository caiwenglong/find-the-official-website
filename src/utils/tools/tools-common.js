/*
全局唯一标识符，简称GUID
这个可以指定长度和基数
// 8 character ID (base=2)

uuid(8, 2)  //  "01001010"

// 8 character ID (base=10)

uuid(8, 10) // "47473046"

// 8 character ID (base=16)

uuid(8, 16) // "098F4D35"
* */
export function uuId(len, radix) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []; let i
  radix = radix || chars.length

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix]
  } else {
    // rfc4122, version 4 form
    let r

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
      }
    }
  }

  return uuid.join('')
}

// 是否为空、null或者undefined
export function isEmpty(value) {
  if (value === undefined || value === null) {
    return true
  }
  return value === ''
}

// 将字符串转为数组
export function strToArr(str) {
  return isEmpty(str) ? [] : str.split(',')
}

// 将数组转成字符串
export function arrToStr(arr) {
  return arr.length ? arr.toString() : ''
}
