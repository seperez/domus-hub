const Hub = require('./components/hub');
const oven = require('./devices/oven');
// const airConditioner = require('./devices/airConditioner');
// const door = require('./devices/door');
// const kitchenLigths = require('./devices/kitchenLigths');
// const livingLigths = require('./devices/livingLigths');

const home = new Hub({
  name: 'main',
  devices: [oven],
});

console.info('home', home);
