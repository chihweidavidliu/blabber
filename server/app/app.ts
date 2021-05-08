// lib/app.ts
import express, { Application } from 'express';
import socketio from 'socket.io';
import http from 'http';
import router from './router';
// import mongoose from 'mongoose';

import { addUser, removeUser, getUser, getUsersInRoom } from './users';

//config
import config from './config/config.json';
const env = process.env.NODE_ENV || 'development'; // set the environment
import { IEnvConfig } from './interfaces';

if (env === 'development' || env === 'test') {
  const envConfig: IEnvConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    // turn the envConfig object into an array of key names
    process.env[key] = envConfig[key]; // for each key, set process.env[key] to the value of that key (taken from envConfig object)
  });
}

// Create a new express application instance
const app: Application = express();
app.use(router);

// socket io requires you to create a server via the http library
const httpServer = http.createServer(app);
const io = socketio(httpServer);

io.on('connection', socket => {
  console.log('we have a new connection');

  // joining
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) {
      return callback({ error });
    } else if (user) {
      socket.emit('message', {
        user: 'admin',
        text: `${user.name}, welcome to the room '${user.room}'`,
      });

      socket.broadcast
        .to(user.room)
        .emit('message', { user: 'admin', text: `${user.name} has joined` });

      socket.join(user.room);
      // send info about all the people in the room
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      callback({ success: true });
    }
  });

  // sending messages
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if (!user) {
      return callback({ error: 'No user found' });
    }

    io.to(user.room).emit('message', { user: user.name, text: message });
    callback({ success: true });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` });

      // update room data
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

// Database - dont' need this for now
// mongoose.Promise = global.Promise;
// mongoose
//   .connect(`${process.env.MONGODB_URI}`)
//   .catch((err: Error) => console.log('There was an error', err));

// note that app.listen doesn't work here with socket io, must use instance of server created vio http library
export const server = httpServer.listen(process.env.PORT, function() {
  console.log(`Example app listening on port ${process.env.PORT}!`);
});

export default app;
