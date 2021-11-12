import express from 'express';
import expressReqId from 'express-request-id';
import methodOverride from 'method-override';
import compression from 'compression';
import morganMiddleware from './middlewares/morgan.middleware';
import { userRouter } from './routes/user.router';

class App {
    public express: express.Application;
    
    constructor() {
        this.express = express();
        this.init();
    }

    private init(): void {
        this.middleware();
    }

    private middleware(): void {
        const addRequestId = expressReqId();

        this.express.get('/health', (req, res) => {
            res.status(200).send()
        })

        this.express.use(addRequestId);
        this.express.use(morganMiddleware);
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: false}));
        this.express.use(methodOverride());
        this.express.use(compression());

        this.express.use('/api/users', userRouter);
    }
}

export default new App().express