const {parse} = require('node-html-parser');
const fetch = require('node-fetch');
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36';

// https://www.bestbuy.ca/en-ca/product/zotac-geforce-rtx-3080-trinity-10gb-gddr6x-video-card/14953249
function createBestbuyItems(urls) {
  const names = [], skus = [];
  for (let url of urls) {
    if (url.endsWith('/')) url = url.slice(0, -1);
    const splits = url.split('/');
    const sku = splits[splits.length - 1], name = splits[splits.length - 2];
    names.push(name);
    skus.push(sku);
  }

  const result = {
    method: 'GET',
    headers: {
      'User-Agent': 'PostmanRuntime/7.26.2'
    },
    url: `https://www.bestbuy.ca/ecomm-api/availability/products?skus=${skus.join('|')}&accept=application/vnd.bestbuy.standardproduct.v1%2Bjson`,
    quantities: json => {
      return json.availabilities.map((avail, index) => ({
        quantity: avail.shipping.quantityRemaining,
        name: names[index],
        url: urls[index]
      }));
    },
  };
  return {bustbuy: result};
}

// https://www.amazon.ca/MSI-GeForce-RTX-3080-10G/dp/B08HR7SV3M/ref=zg_bs_677243011_1?_encoding=UTF8&psc=1&refRID=XE174X3V8FRVF4QT2MFV
function createAmazonItems(urls) {
  const result = {};

  for (const url of urls) {
    const splits = url.split('/');

    result['amazon ' + splits[3]] = {
      url: `https://www.amazon.ca/gp/offer-listing/${splits[5]}`,
      method: 'GET',
      headers: {
        'User-Agent': userAgent
      },
      quantities: text => {
        const root = parse(text);
        const pricesText = root.querySelectorAll('span.a-size-large.a-color-price.olpOfferPrice.a-text-bold');
        const prices = pricesText.map(priceText => parseFloat(priceText.innerHTML.match(/[0-9]*[.][0-9]*/)[0]));
        const lowestPrice = prices.sort()[0];
        const price = parseInt(lowestPrice);
        return [{
          quantity: price > 500 && price < 1300,
          name: '',
          url: `https://www.amazon.ca/gp/offer-listing/${splits[5]}`,
        }];
      }
    }
  }
  return result;
}

// https://www.canadacomputers.com/search/results_details.php?language=en&keywords=rtx+3080
function createCanadaComputersItems(url) {
  const result = {
    url,
    method: 'GET',
    headers: {
      'User-Agent': userAgent
    },
    quantities: text => {
      const result = [];
      const root = parse(text);
      const products = root.querySelectorAll('.col-12.py-1.px-1.bg-white.mb-1.productTemplate.gridViewToggle');
      for (const product of products) {
        const name = product.querySelector('.text-dark.text-truncate_3').innerHTML;
        // const price = product.querySelector('.mb-0.pq-hdr-product_price').childNodes[0].innerHTML;

        const isAvailableOnline = product.innerHTML.includes('Online In Stock') || product.innerHTML.includes('Order Online and Pick Up In-Store');
        const isAvailableInStore = product.innerHTML.includes('Available In Stores') ||  product.innerHTML.includes('Available In Selected Stores');
        result.push({
          quantity: isAvailableOnline || isAvailableInStore,
          name,
          url: product.querySelector('a').attributes.href
        })
      }
      return result;
    },
  };
  return {CanadaComputers: result};
}

module.exports = {
  createBestbuyItems, createAmazonItems, createCanadaComputersItems
}
