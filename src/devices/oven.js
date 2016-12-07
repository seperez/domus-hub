const EventEmitter = require('events').EventEmitter;
const five = require('johnny-five');
const songs = require('j5-songs');

const device = new EventEmitter();

device.name = 'oven';
device.events = ['gas:on', 'gas:off'];
device.port = '/dev/rfcomm0';
device.board = new five.Board({
  port: device.port,
});
device.components = {
  gas: new five.Sensor('A0'),
  alarm: new five.Piezo(6),
  song: songs.load('claxon'),
};
let recentlyGasDetected = false;

const gasChange = () => {
  if (this.value > 60) {
    device.emit('gas:on', this.value);

    recentlyGasDetected = true;

    if (!device.components.alarm.isPlaying) {
      device.components.alarm.play(device.components.song);
    }
  } else if (recentlyGasDetected) {
    recentlyGasDetected = false;
    device.emit('gas:off', this.value);
  }
};

const boardReady = () => {
  device.components.gas.scale(0, 100).on('change', gasChange);
  device.emit('ready');
};

device.init = () => {
  device.board.on('ready', boardReady);
};

module.exports = device;
