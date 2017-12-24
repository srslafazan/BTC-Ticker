const { app, Menu, Tray } = require('electron');
const path = require('path');
const request = require('request');
const open = require('open');

let tray;

// Don't show the app in the dock
app.dock.hide();

const onQuit = () => app.quit();
const onFileBug = () => open('https://github.com/justinsisley/XRP-Ticker/issues');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    request({
      url,
      headers: {
        'User-Agent': 'XRP-Ticker',
      },
    }, (error, response, body) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(JSON.parse(body));
    });
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, 'assets', 'xrp.png'));

  const url = 'https://api.github.com/repos/justinsisley/XRP-Ticker/releases/latest';

  getJSON(url).then((release) => {
    const contextMenu = Menu.buildFromTemplate([
      { type: 'normal', label: `XRP Ticker`, enabled: false },
      { type: 'normal', label: release.tag_name, enabled: false },
      { type: 'separator' },
      { type: 'normal', label: 'File a Bug', click: onFileBug },
      { type: 'separator' },
      { type: 'normal', label: 'Quit', click: onQuit },
    ]);

    tray.setContextMenu(contextMenu);
  });
}

function updateView() {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD';

  getJSON(url).then((data) => {
    const value = `$${data.USD}`;

    tray.setTitle(value);
    tray.setToolTip(value);
  });
}

app.on('ready', () => {
  createTray();

  // Get initial data
  updateView();

  // Refresh data every 30 seconds
  setInterval(updateView, 1000 * 30);
});
