import util from '@/libs/util.js'
import CryptoJS from 'crypto-js'

// 获取token
export function getToken () {
  return util.cookies.get('token')
}

// 获取用户ID
export function getUserId () {
  return util.cookies.get('uuid')
}

// 获取商户ID
export function getShopId () {
  return util.cookies.get('shopid')
}

// 获取平台ID
export function getOrganId () {
  return util.cookies.get('organid')
}

// 获取用户名称
export function getUserName () {
  return util.cookies.get('username')
}

export function encrypt (key, iv, word) {
  const Key = CryptoJS.enc.Base64.parse(key)
  const Iv = CryptoJS.enc.Base64.parse(iv)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, Key, {
    iv: Iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 })
  return iv + CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export function ToEncrypy (word) {
  const Key = CryptoJS.enc.Base64.parse('1A2b3C4d5E6fG!@#$')
  const Iv = CryptoJS.enc.Base64.parse('1A2b3C4d5E6fG!@#$')

  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, Key, {
    iv: Iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

export function ToDecrypt (word) {
  const Key = CryptoJS.enc.Base64.parse('1A2b3C4d5E6fG!@#$')
  const Iv = CryptoJS.enc.Base64.parse('1A2b3C4d5E6fG!@#$')
  let decrypted = CryptoJS.AES.decrypt(word, Key, {
    iv: Iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

// 取出Data空值的项
export function ClearData (data) {
  for (const key in data) {
    if (data[key] === '' || data[key] === null) {
      delete data[key]
    }
  }
  return data
}

// 清除时间中的多余字母
export function ClearTime (data) {
  data = data.replace('T', '')
  data = data.replace('Z', '')

  return data
}
