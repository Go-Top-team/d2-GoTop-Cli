# d2-electron-cli
D2Admin-Start-Kit Electron version

# 1.运行命令
## 1.1依赖项
```
npm install
```

## 1.3 网页端开发调试
```
  npm run dev
```

## 1.4 网页端构建打包
```
  npm run build
```

## 1.5 桌面端开发调试
```
  npm run electron:serve
```

## 1.6 桌面端构建打包
```
  npm run electron:build
```

# 2.注意事项：
## 2.1.网页端打包
```
打包网页端时，Vue.config.js文件中UglifyJsPlugin的引入与非开发环境设置代码需取消注释，
并在package包中的devDependencies设置里添加 "uglifyjs-webpack-plugin": "^2.0.1"
```

# 3.生成图标
## 2.1生成icons图标
```
  npm run icon
```
会在根目录生成一个icons-build文件夹，里面含有各种类型的图标

## 2.2注意事项
public目录中必须有你要生成的图标的all.png原始图片