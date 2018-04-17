<p align="center">
  <img alt="BTC" src="https://cdn.coinranking.com/Sy33Krudb/btc.svg" width="144">
</p>

<h3 align="center">
  BTC Ticker
</h3>

<p align="center">
  A simple Mac OS X tray app that displays the current price of BTC in USD
</p>

<p align="center">
  <a href="https://github.com/srslafazan/BTC-Ticker/blob/master/license"><img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat"></a>
  <a href="https://github.com/srslafazan/BTC-Ticker/releases/latest"><img src="https://img.shields.io/github/release/srslafazan/BTC-Ticker.svg" /></a>
  <a href="https://david-dm.org/srslafazan/BTC-Ticker"><img src="https://david-dm.org/srslafazan/BTC-Ticker/status.svg?style=flat" ></a>
  <a href="https://david-dm.org/srslafazan/BTC-Ticker?type=dev"><img src="https://david-dm.org/srslafazan/BTC-Ticker/dev-status.svg?style=flat"></a>
</p>

## Installation for Users

[Download the latest release](https://github.com/srslafazan/BTC-Ticker/releases/latest), then unzip the archive and double-click on the app to run it. Feel free to move the app into `/Applications` if you'd like.

## Installation for Developers

```bash
git clone https://github.com/srslafazan/BTC-Ticker
cd BTC-Ticker
npm install
```

## Development

```bash
npm start
```

## Packaging

```bash
npm run package && open dist
```

## Credits

* All credits to Justin Sisley -- This is a re-implementaiton (based on his XRP-Ticker) for BTC tracking -- purely for electron learning and development purposes.

- Depends on [Electron](http://electron.atom.io)
- Uses the [CryptoCompare API](https://www.cryptocompare.com/)
- Icon from [Coinranking](https://coinranking.com/)