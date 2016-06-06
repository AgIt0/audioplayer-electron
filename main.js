const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = require('electron').ipcMain
const dialog = require('electron').dialog

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

ipc.on('open-file-dialog', function (event) {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (files) {
        if (files) event.sender.send('selected-directory', files)
    })
})
