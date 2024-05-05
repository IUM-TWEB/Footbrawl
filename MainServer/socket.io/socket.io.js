exports.init = function (io) {
  /* valutare se usare channel differenti per campionati e club*/
  io.sockets.on('connection', function (socket) {
    console.log('A user connected');
    try {
      /** it creates or joins a room */
      socket.on('create or join', function (room, userId) {
        socket.join(room);
        io.sockets.to(room).emit('joined', room, userId);
      });

      socket.on('chat', function (room, userId, chatText) {
        io.sockets.to(room).emit('chat', room, userId, chatText);
      });

      socket.on('leave conversation', function (room, userId) {
        io.sockets.to(room).emit('leaved', room, userId);
        socket.leave();
      });

      socket.on('disconnected', (room) => {
        console.log('A user disconnected');
      });
    } catch (e) {
      console.log(e);
    }
  })
}