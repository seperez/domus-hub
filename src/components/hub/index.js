const EventEmitter = require('events').EventEmitter;

class Hub extends EventEmitter {
  constructor({ name, devices }) {
    super();
    this.name = name;
    this.devices = devices;
    this.init();
  }

  init() {
    this.devices.forEach((device) => {
      console.info('device', device);
      device.on('ready', () => this.deviceReady(device));
      device.init();
    });
  }

  deviceReady(device) {
    console.info(`Device [${device.name}] ready`);
    device.events.forEach((eventName) => {
      device.on(eventName, eventData => this.deviceEventEmitted(device, eventName, eventData));
    });
  }

  deviceEventEmitted(device, eventName, eventData) {
    console.info(`Device [${device.name}] emitted event [${eventName}]`, eventData);
    // io.emit(eventName, eventData);
  }
}

module.exports = Hub;
