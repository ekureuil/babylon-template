import * as e from 'electron'
import * as path from 'path'
import * as url from 'url'

// Keep a global reference : avoid GC
let mainWindow : e.BrowserWindow | null

function createWindow () {
  mainWindow = new e.BrowserWindow(
    {width: 800, 
      height: 600,
      webPreferences: {
        webSecurity : true
      }
    })
  // Uncomment for production: 
  //mainWindow.setMenu(null);

  // load the html page containing the babylon application
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Uncomment if you want dev tools opened right away
  // (this can always be done if setMenu(null) has not been commented)
  // mainWindow.webContents.openDevTools()

  // When windows is closed, mark old mainWindow to be GCollected.
  mainWindow.on('closed', () => {mainWindow = null} )
}

e.app.on('ready', createWindow)
e.app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    e.app.quit()
  }
})

e.app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})