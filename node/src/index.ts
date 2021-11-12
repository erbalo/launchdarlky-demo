import * as http from 'http';
import app from './app';

import {onError, onListening } from './utils/utils';

const server = http.createServer(app);
const port = 8000;

(async () => {
    server.listen(port);
    server.on('error', onError(server, port));
    server.on('listening', onListening(server));
})();