import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';

const app = express();
const port = 5000;
const io = require('socket.io').listen(app.listen(port));

app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect('mongodb://localhost/storycard', {useNewUrlParser: true});

app.use(session({
    secret: '1$1$StoryCard@234',
    resave: false,
    saveUninitialized: true
}));

app.use('/', express.static(path.resolve(__dirname, '../../client/build'))); 

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', api);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build/index.html'));
});

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});