const { app, Menu, Tray } = require('electron');
const path = require('path');
const request = require('request');
const open = require('open');

const appName = 'BTC-Ticker';
const baseRepo = `srslafazan/${appName}`;

const issuesURL = `https://github.com/${baseRepo}/issues`;
const latestReleaseURL = `https://api.github.com/repos/${baseRepo}/releases/latest`;
const cryptoPriceURL = 'https://www.bitstamp.net/api/v2/ticker/btcusd/';

// How often to fetch new data, in ms
const refreshInterval = 1000 * 60;

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
        'User-Agent': appName,
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
  tray = new Tray(path.join(__dirname, 'assets', 'btc.png'));
  getJSON(latestReleaseURL)
  .then((release) => {
    const contextMenu = Menu.buildFromTemplate([
      { type: 'normal', label: 'BTC Ticker', enabled: false },
      { type: 'normal', label: `v${release.tag_name}`, enabled: false },
      { type: 'separator' },
      { type: 'normal', label: 'File a Bug', click: onFileBug },
      { type: 'separator' },
      { type: 'normal', label: 'Quit', click: onQuit },
    ]);

    tray.setContextMenu(contextMenu);
  })
}

function updateTitle() {
  getJSON(cryptoPriceURL)
  .then((price) => {
    const value = `$${price.last}`;
    tray.setTitle(value);
  });
}

app.on('ready', () => {
  createTray();

  // Show initial data
  updateTitle();

  // Refresh data periodically
  setInterval(updateTitle, refreshInterval);
});
