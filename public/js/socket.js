var socket = io.connect('http://af014d37.ngrok.io');
socket.on('message', function(data) {
  console.log(data);
  socket.emit('my other event', {
    my: 'data'
  });
});
