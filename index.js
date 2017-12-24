const { ipcRenderer, shell } = require('electron')

document.addEventListener('click', (event) => {
  if (event.target.href) {
    // Open links in external browser
    shell.openExternal(event.target.href)
    event.preventDefault();
  } else if (event.target.classList.contains('js-refresh-action')) {
    updateData();
  } else if (event.target.classList.contains('js-quit-action')) {
    window.close();
  }
})

const getData = (position) => {
  const url = 'https://min-api.cryptocompare.com/data/price?fsym=XRP&tsyms=USD';

  return window.fetch(url).then((response) => {
    return response.json();
  })
}

const updateView = (data) => {
  document.querySelector('.js-price').textContent = `$${data.USD}`;
}

const updateData = () => {
  getData().then((data) => {
    ipcRenderer.send('data-updated', data);

    updateView(data);
  })
}

// Refresh data every 30 seconds
setInterval(updateData, 1000 * 30);

// Update initial data when loaded
document.addEventListener('DOMContentLoaded', updateData);
