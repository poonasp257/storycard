import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';
import { logger } from './modules/logger';

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const isDevMode = process.env.NODE_ENV === "development";
const morganFormat = isDevMode ? "dev" : "common";

app.use(morgan(morganFormat));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/collaboArt', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(session({
    secret: '1$1$collaboArt@234',
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', api);

const routeDir = path.resolve(__dirname, '../../client/build');
app.use(express.static(routeDir)); 
app.get('*', (req, res) => res.sendFile(path.resolve(routeDir, 'index.html')));

app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = 9090;
server.listen(port, () => {
    logger.info(`server listening on port ${port}`);
});