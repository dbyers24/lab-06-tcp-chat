'use strict';

const net = require('net');
const server = net.createServer();
const User = require('./modules/user.js');
let clientPool = [];

server.on('connection', (socket) => {
  let user = new User(socket);
  socket.write(`Yo, ${user.nickname} welcome to zee chat!`);
  console.log(`${user.nickname} Connected`);
  clientPool = [...clientPool, user];

  let handleDisconnect = () => {
    console.log(`${user.nickname} Disconnected`);
    clientPool = clientPool.filter(item => item !== user);
  };

  let handleError = () => {
    console.log(`${user.nickname}, you been making some serreuss errors.`);
  };

  socket.on('error', handleError);
  socket.on('close', handleDisconnect);

  socket.on('data', (buffer) => {
    let data = buffer.toString();

    if(data.startsWith('/nick')) {
      user.nickname = data.split('/nick ')[1] || user.nickname;
      user.nickname = user.nickname.trim();
      socket.write(`Henceforth, you shall be named ${user.nickname}`);
      return;
    }

    if(data.startsWith('/dm')) {
      let messageRecipientName = data.split(' ')[1];
      let dMtarget = clientPool.filter(item => item.nickname === messageRecipientName);
      dMtarget.forEach((dmUser) => {
        let message = data.split(' ').slice(2).join(' ');
        dmUser.socket.write(`${user.nickname}: ${message}`);
      });
      return;
    }

    if(data.startsWith('/troll')) {
      let repeatValue = data.split(' ')[1];
      let message = data.split(' ').splice(2).join(' ');

      for (let i = 0; i < repeatValue; i++) {
        user.socket.write(message);
      }
    }

    if(data.startsWith('/quit')) {
      handleDisconnect();
      socket.end();
    }

    clientPool.forEach((item) => {
      console.log(clientPool);
      item.socket.write(`${user.nickname}: ${data}`);
    });
  });
});

server.listen('3000', () => {
  console.log('servin it up on port 3000');
});
