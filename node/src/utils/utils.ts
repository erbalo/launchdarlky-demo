import { Server } from 'http';
import Logger from '../commons/logger';

export const normalizePort = (val: number | string): number | string | boolean => {
    let port: number = (typeof val === 'string') ? parseInt(val) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}

export const onError = (server: Server, serverPort: any) => {
    return (error: NodeJS.ErrnoException): void => {
        let port: number | string = serverPort;
        if (error.syscall != 'listen') throw error;
        let bind = (typeof port === 'string') ? `pipe ${port}` : `port ${port}`;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated priviliges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export const onListening = (server: Server) => {
    return (): void => {
        let addr = server.address();
        let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
        Logger.info(`Listening at ${bind}...`);
    }
}

export const handleError = (error: Error) => {
    let errorMessage: string = `${error.name}: ${error.message}`;
    if (process.env.NODE_ENV !== 'test') console.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
}

export const throwError = (condition: boolean, message: string): void => {
    if (condition) throw new Error(message);
}

export const cloneArray = (array: any[]): any[] => {
    return array.map(a => { return { ...a } });
}