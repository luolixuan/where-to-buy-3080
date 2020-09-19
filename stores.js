const {createBestbuyItems, createAmazonItems, createCanadaComputersItems, createNeweggItems} = require('./adapter');

const stores = {
  ...createBestbuyItems([
    'https://www.bestbuy.ca/en-ca/product/zotac-geforce-rtx-3080-trinity-10gb-gddr6x-video-card/14953249',
    // 'https://www.bestbuy.ca/en-ca/product/msi-nvidia-geforce-rtx-3080-ventus-3x-10gb-gddr6x-video-card/14950588',
    // 'https://www.bestbuy.ca/en-ca/product/asus-rog-strix-geforce-rtx-3080-10gb-gddr6x-video-card/14954116'
  ]),
  ...createAmazonItems([
    // ZOTAC
    'https://www.amazon.ca/Graphics-IceStorm-Advanced-Lighting-ZT-A30800D-10P/dp/B08HJNKT3P?ref_=ast_sto_dp',

    // MSI
    'https://www.amazon.ca/MSI-GeForce-RTX-3080-10G/dp/B08HR7SV3M/ref=zg_bs_677243011_1?_encoding=UTF8&psc=1&refRID=XE174X3V8FRVF4QT2MFV',
    'https://www.amazon.ca/MSI-GeForce-RTX-3080-10G/dp/B08HR5SXPS?ref_=ast_sto_dp',

    // ASUS
    'https://www.amazon.ca/Asus-TUF-RTX3080-O10G-GAMING/dp/B08HH5WF97?ref_=ast_sto_dp',
    'https://www.amazon.ca/Asus-TUF-RTX3080-10G-GAMING/dp/B08HHDP9DW?ref_=ast_sto_dp',

    // EVGA
    'https://www.amazon.ca/EVGA-GeForce-Technology-Backplate-10G-P5-3897-KR/dp/B08HR3Y5GQ',
    'https://www.amazon.ca/EVGA-GeForce-Technology-Backplate-10G-P5-3895-KR/dp/B08HR3DPGW?ref_=ast_sto_dp',
    'https://www.amazon.ca/EVGA-GeForce-Cooling-Backplate-10G-P5-3885-KR/dp/B08HR55YB5?ref_=ast_sto_dp',
    'https://www.amazon.ca/EVGA-GeForce-Cooling-Backplate-10G-P5-3883-KR/dp/B08HR4RJ3Q?ref_=ast_sto_dp',
    'https://www.amazon.ca/EVGA-GeForce-Gaming-Cooling-10G-P5-3881-KR/dp/B08HR6FMF3?ref_=ast_sto_dp',

    // GIGABYTE
    'https://www.amazon.ca/GIGABYTE-GeForce-Graphics-WINDFORCE-GV-N3080GAMING/dp/B08HJTH61J?ref_=ast_sto_dp',
    'https://www.amazon.ca/GIGABYTE-GeForce-Graphics-WINDFORCE-GV-N3080EAGLE/dp/B08HJS2JLJ?ref_=ast_sto_dp',
  ]),
  ...createCanadaComputersItems('https://www.canadacomputers.com/search/results_details.php?language=en&keywords=rtx+3080'),
  ...createNeweggItems('https://www.newegg.ca/p/pl?d=rtx+3080&N=100007708&name=Desktop+Graphics+Cards'),

};

module.exports = {stores};
