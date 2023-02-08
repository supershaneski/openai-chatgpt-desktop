const { app, BrowserWindow } = require('electron');
const { menubar } = require('menubar');
const path = require('path');

const icon = path.join(__dirname, 'images', 'IconTemplate.png');

const createWindow = () => {
  
  const mb = menubar({
    browserWindow: {
      transparent: true,
      icon: icon,
      webPreferences: {
        webviewTag: true,
      },
      width: 450,
      height: 550,
    },
    showOnAllWorkspaces: true,
    showDockIcon: false,
    icon: icon,
  });

  mb.app.commandLine.appendSwitch('disable-backgrounding-occluded-windows', 'true')
  
  mb.on('ready', () => {

    console.log('App is ready');
    
  });

}

app.on('ready', () => {

  createWindow()

  app.on('activate', () => {

      if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
      }

  });

});

app.on('window-all-closed', () => {
  
  if (process.platform !== 'darwin') {
    app.quit()
  }

});
