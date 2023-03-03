import http from 'http';
import createDebug from 'debug';
import { app } from './app.js';

const debug = createDebug('FRNMS');

const PORT = process.env.PORT || 4321;

const server = http.createServer(app);

server.listen(PORT);

server.on('error', (error) => {
  debug(error.message);
});

server.on('listening', () => {
  debug('Listening on http://localhost:' + PORT);
});
