import http from 'http';
import createDebug from 'debug';
import { app } from './app.js';
import { dbConnect } from './db/mongo.connect.js';

const PORT = process.env.PORT || 4321;

const debug = createDebug('FRNMS');

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB:', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug(error.message);
});

server.on('listening', () => {
  debug('Listening on http://localhost:' + PORT);
});
