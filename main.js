const { app, Menu, Tray } = require('electron');
const path = require('path');
const request = require('request');
const open = require('open');

const issuesURL = 'https://github.com/justinsisley/XRP-Ticker/issues';
const latestReleaseURL = 'https://api.github.com/repos/justinsisley/XRP-Ticker/releases/latest';
const cryptoPriceURL = 'https://www.bitstamp.net/api/v2/ticker/xrpusd/';

// How often to fetch new data, in ms
const refreshInterval = 1000 * 30;

let tray;

// Don't show the app in the dock
app.dock.hide();

const onQuit = () => app.quit();
const onFileBug = () => open(issuesURL);

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

  getJSON(latestReleaseURL).then((release) => {
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
  getJSON(cryptoPriceURL).then((data) => {
    const value = `$${data.last}`;

    tray.setTitle(value);
    tray.setToolTip(value);
  });
}

app.on('ready', () => {
  createTray();

  // Get initial data
  updateView();

  // Refresh data periodically
  setInterval(updateView, refreshInterval);
});
