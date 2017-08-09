
# lab-06-tcp-chat-server


## In this lab I
* Created a TCP Server use using the net module
* Created a Client Constructor
* When sockets connect to the server a new `Client` instance is made
* When sockets are connected with the ClientPool they are given event listeners for `data`, `error`, and `close` events
* When a socket emits the `close` event the socket is removed from the client pool
* When a socket emits the `error` event the error is logged on the server
* When a socket emits the `data` event the data is logged on the server and the `\wack` commands below is implemented

* `/nick` allows a user change their nickname
* `/dm` allows a user to send a message directly to another user by nick name
* `/troll` takes in a number and a message and send the message to everyone that number of times
* `/quit` closes the connection with the user
