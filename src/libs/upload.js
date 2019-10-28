import OSS from 'ali-oss'
import { getShopId } from '@/libs/info'

// 上传图片
export function UploadFile (file, fImgPath, imageHostUrl, data, result) {
  // 验证新图片
  file = file.file
  let imageName = ''
  var shop = getShopId()
  if (fImgPath === '') {
    var timestamp = (new Date()).getTime()
    imageName = 'websiteXD/' + shop + '/' + timestamp + file.name
  } else {
    imageName = fImgPath.split('net/')[1]
    // imageName = imageName.split('?')[0]
    imageName = 'websiteXD/' + shop + '/' + imageName
    // 删除图片
    // this.OssDelImg(fImgPath)
  }
  let client = new OSS({
    region: data.data.Region,
    accessKeyId: data.data.AccessKeyId,
    accessKeySecret: data.data.AccessKeySecret,
    stsToken: data.data.SecurityToken,
    bucket: data.data.Bucket
  })
  // 上传图片
  client.put(imageName, file).then((res) => {
    if (res.res.statusCode === 200) {
      // 由于浏览器缓存问题，导致相同名称的图片不会及时进行更新，所以在赋值src的时候加上了tempId来解决，这不会影响到图片真实的地址
      fImgPath = imageHostUrl + res.name// + '?tempId=' + Math.random()
      result(fImgPath)
    }
  })
}
// import OSS from 'ali-oss'
// import { getShopId } from '@/libs/info'

// // 上传图片
// export function UploadFile (file, fImgPath, imageHostUrl, data, result) {
//   // 验证新图片
//   file = file.file
//   let imageName = ''
//   var shop = getShopId()
//   if (fImgPath === '') {
//     var timestamp = (new Date()).getTime()
//     imageName = 'websiteXD/' + shop + '/' + timestamp + file.name
//   } else {
//     imageName = fImgPath.split('net/')[1]
//     // imageName = imageName.split('?')[0]
//     imageName = 'websiteXD/' + shop + '/' + imageName
//     // 删除图片
//     // this.OssDelImg(fImgPath)
//   }
//   let client = new OSS({
//     region: data.data.Region,
//     accessKeyId: data.data.AccessKeyId,
//     accessKeySecret: data.data.AccessKeySecret,
//     stsToken: data.data.SecurityToken,
//     bucket: data.data.Bucket
//   })
//   // 上传图片
//   client.put(imageName, file).then((res) => {
//     if (res.res.statusCode === 200) {
//       // 由于浏览器缓存问题，导致相同名称的图片不会及时进行更新，所以在赋值src的时候加上了tempId来解决，这不会影响到图片真实的地址
//       fImgPath = imageHostUrl + res.name// + '?tempId=' + Math.random()
//       result(fImgPath)
//     }
//   })
// }
