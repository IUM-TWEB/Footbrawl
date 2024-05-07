exports.init = function (io) {
  /* valutare se usare channel differenti per campionati e club*/
  io.sockets.on('connection', function (socket) {
    console.log('A user connected');
    try {
      /** it creates or joins a room */
      socket.on('create or join', function (room, name) {
        socket.join(room);
        io.sockets.to(room).emit('joined', room, name); //si può usare broadcast e inserire il prorpio messaggio di join tramite client
      });

      socket.on('chat message', function (room, msg, name) {
        io.sockets.to(room).emit('chat message', room, msg, name);
      });

      socket.on('leave conversation', function (room, name) {
        io.sockets.to(room).emit('leaved', room, name);
        socket.leave(room);
      });

      socket.on('disconnected', (room, name) => {
        try {
          io.sockets.to(room).emit('leaved', room, name);
          socket.leave(room);
        } catch (e) {
          console.log('ignore' + e);
        }

      });
    } catch (e) {
      console.log(e);
    }
  })
}