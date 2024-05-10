exports.init = function (io) {
  /* valutare se usare channel differenti per campionati e club*/
  io.sockets.on('connection', function (socket) {
    console.log('A user connected');
    try {
      /** it creates or joins a room */
      socket.on('create or join', function (room, name) {
        socket.join(room);
        socket.broadcast.to(room).emit('create or join', name);
        //console.log(name + ' joined ' + room);
      });

      socket.on('chat message', function (room, msg, name) {
        socket.broadcast.to(room).emit('chat message', msg, name);
        //console.log(name + " sent a message in " + room + ": " + msg);
      });

      socket.on('leave conversation', function (room, name) {
        //console.log("User leaved");
        socket.broadcast.to(room).emit('leave conversation', name);
        socket.leave(room);
        //console.log(name + ' left ' + room);
      });

      socket.on('disconnected', (room, name) => {
        try {
          //console.log("User disconnected");
          socket.broadcast.to(room).emit('disconnected', name);
          socket.leave(room);
        } catch (e) {
          console.log('ignore ' + e);
        }
      });

    } catch (e) {
      console.log(e);
    }
  })
}