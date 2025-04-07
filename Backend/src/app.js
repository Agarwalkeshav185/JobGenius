import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import ApiRoutes from './Routes/index.js';
import cors from 'cors';
import expressFileUpload from 'express-fileupload';
import { FRONTEND_URL } from './config/serverConfig.js';

const app = express();

app.use(cors({
    origin : [FRONTEND_URL],
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials : true
}));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(expressFileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));

app.use('/api', ApiRoutes);


export default app;