import { app, protocol, BrowserWindow, globalShortcut } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
// 判断是否调用开发工具
let dev = 0

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }])

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    // 设置无边框
    frame: true,
    // 设置ICON
    icon: path.join(__dirname, 'windows.ico'),
    webPreferences: {
      nodeIntegration: true
    } })
  // 去除Windows菜单栏
  win.setMenu(null)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    // win.loadURL('app://./index.html')
    win.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true
      })
    )
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  // 控制台快捷键
  globalShortcut.register('Ctrl+F12', () => {
    if (dev === 0) {
      win.webContents.openDevTools()
      dev = 1
    } else if (dev === 1) {
      win.webContents.closeDevTools()
      dev = 0
    }
  })
  // 退出快捷键
  globalShortcut.register('Command+Q', () => {
    app.quit()
  })

  // 全屏快捷键
  globalShortcut.register('F11', () => {
    if (win.isMaximized() === true) {
      win.unmaximize()
    } else {
      win.maximize()
    }
  })

  // 隐藏窗口
  globalShortcut.register('Alt+D', () => {
    if (win.isVisible() === true) {
      win.hide()
    } else {
      win.show()
    }
  })

  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
