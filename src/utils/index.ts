/**
 * 工具函数
 */

const PREFIX = 'bk_'
/**
 * localstore 操作
 */
export const store = {
  set(key: string, data: any) {
    return window.localStorage.setItem(PREFIX + key, JSON.stringify(data))
  },
  get(key: string) {
    return JSON.parse(window.localStorage.getItem(PREFIX + key) as string)
  },
  remove(key: string) {
    return window.localStorage.removeItem(PREFIX + key)
  },
  clear() {
    window.localStorage.clear()
  }
}

/**
 * 装换成数字
 * @param val
 */
export const toNumber = (val: string): number => {
  const reg = /^[0-9]+.?[0-9]*$/
  const matchRes = val.match(reg)
  if (matchRes && matchRes.length) return parseFloat(matchRes[0].toString())
  return 0
}

/**
 * 输入两位小数
 * @param val
 * @param length
 */
export const toInputFixed = (val: string, length = 10, fixed = 2): string => {
  const lastCode = val.substr(val.length - 1, 1)
  if (lastCode === '.' && val.substring(0, val.length - 1).includes('.')) {
    val = val.substring(0, val.length - 1)
  }
  val = val.substr(0, length)
  const dotIndex = val.indexOf('.')
  if (dotIndex > -1 && val.length - 1 - dotIndex > fixed) {
    val = val.substr(0, dotIndex + fixed + 1)
  }
  let resultStr: number | string = val
  if (val.indexOf('.') < 0 && val !== '') { // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    resultStr = parseFloat(toNumber(val).toString())
  }
  return resultStr.toString().replace(/[^\d|^\.]/g, '')
}

/**
 * 关闭窗口
 */
export function closeWin() {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    open(location, '_self').close()
  } catch (e) {
    console.log('关闭窗口错误', e)
  }
}

/**
 * 打开窗口
 */
export function openWin(res: string, isTarget = false) {
  window.open(res, isTarget ? '_self' : '_blank')
}
