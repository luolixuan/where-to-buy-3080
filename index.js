const fetch = require('node-fetch');
const open = require('open');
const {send} = require('./mailer');
const {stores} = require('./stores');

let lastLink = '';

const getQuantity = async (store) => {
  const res = await fetch(store.url,
    {
      method: store.method,
      body: store.body ? JSON.stringify(store.body) : undefined,
      headers: store.headers
    });
  let json;
  const text = await res.text();
  try {
    json = JSON.parse(text);
  } catch (e) {
    // For Bestbuy
    try {
      json = JSON.parse(text.substring(1));
    } catch (e) {
      json = text;
    }
  }
  // console.log(json)
  try {
    return store.quantities(json);
  } catch (e) {
    console.error("Failed to get data from", store.url);
    console.error(e);
    return 0
  }
};

async function checkStore(storeName, store) {
  let quantities = await getQuantity(store);
  for (let i = 0; i < quantities.length; i++) {
    const {quantity, name, url} = quantities[i];
    let display = `${storeName} ${name}`;

    if (display.length > 60)
      display = display.slice(0, 60) + '...';

    if (quantity > 0) {
      console.error(display, 'has', quantity === true ? '>=1' : quantity, url);

      if (lastLink !== url) {
        open(url);
        lastLink = url;
      }

      send(`${storeName} ${name} has ${quantity === true ? '>=1' : quantity} <a href="${url}">link</a>`)
    } else
      console.log(display, 'has 0')
  }
}

async function main() {
  while (1) {
    const timeWait = 5000 + Math.random() * 10 * 1000;
    const promises = [];
    for (const [storeName, store] of Object.entries(stores)) {
      promises.push(checkStore(storeName, store));
    }
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', new Date().toLocaleString());

    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e)
    }

    console.log('Refresh after', Math.round(timeWait / 1000), 's...');
    await sleep(timeWait)
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

// periodic clean the last link
setInterval(() => lastLink = '', 60 * 1000);

main();
