const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const port = 41234;
const host = 'localhost';

module.exports = (message) => {
  client.send(Buffer.from(message), port, host, (err) => {
    if (err) throw err;
  });
};