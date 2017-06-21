'use strict';

module.exports = function(socket) {
  this.nickname = `guest-${Math.floor(Math.random() * 500)}`;
  this.socket = socket;
};
