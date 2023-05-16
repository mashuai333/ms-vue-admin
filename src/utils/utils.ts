import { JSEncrypt } from 'jsencrypt'
import CryptoJS from 'crypto-js'
export function encryptedData(publicKey: string, text: string) {
  // 新建JSEncrypt对象
  const encryptor = new JSEncrypt()
  // 设置公钥
  encryptor.setPublicKey(publicKey)
  // 加密数据
  return encryptor.encrypt(text)
}

// 解密
export function decryptedData(privateKey: string, txt: string) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}

// 加密
export function encryptDes(word: string, keyStr?: string, ivStr?: string) {
  keyStr = keyStr || 'dazhun'
  ivStr = ivStr || 'dazhun'
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr) // 偏移量：规定的是key前15位
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.DES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// 解密
export function decryptDes(word: string, keyStr?: string, ivStr?: string) {
  try {
    keyStr = keyStr || 'dazhun'
    ivStr = ivStr || 'dazhun'
    const key = CryptoJS.enc.Utf8.parse(keyStr)
    const iv = CryptoJS.enc.Utf8.parse(ivStr)
    const decrypt = CryptoJS.DES.decrypt({ ciphertext: CryptoJS.enc.Base64.parse(word) }, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
  } catch (err) {
    return 'false'
  }
}

// 处理数据为空为-
export const unGetData = (str: string) => {
  let _str = str
  if (!str || str === 'null' || str === 'undefined') {
    _str = '-'
  }
  if (str == '0') {
    _str = str
  }
  return _str
}

// 根据请求的response获取文件名
export const getFilename = response =>
  response.headers['content-disposition'].split(';')[1].split('filename=')[1]

// 流，文件名
export const downloadFile = (r: any, filename: string) => {
  const content = r
  const blob = new Blob([content])
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = filename
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  }
}

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}

// 判断日期范围是否在一个月内
export const getDayDuringOneMonth = (starDate, endDate) => {
  const sDate = new Date(starDate).getTime()
  const eDate = new Date(endDate).getTime()
  const thisMothDays = 1000 * 3600 * 24 * 30
  if (eDate - sDate > thisMothDays) {
    return true
  } else {
    return false
  }
}

// 判断是否是数组
export const isArray = (o: any) => {
  let isArray = false
  if (Object.prototype.toString.call(o) === '[object Array]') {
    isArray = true
  }
  return isArray
}
