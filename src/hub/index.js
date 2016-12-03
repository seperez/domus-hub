class Hub {
  constructor(devices) {
    this.devices = devices;
    this.init();
  }

  init() {
    this.devices.forEach((device) => {
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

  static deviceEventEmitted(device, eventName, eventData) {
    console.info(`Device [${device.name}] emitted event [${eventName}]`, eventData);
    // io.emit(eventName, eventData);
  }
}

exports.Hub = Hub;
