const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const initDB = require('./database/config');
const cors = require('cors');
const taskRouter = require('./routes/taskRoute');

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

initDB.then((result) => {
    console.log('db connected! collection is :' + result.modelNames());
}).catch((err) => {
    console.error('db not working!'); 
});

app.use('/tasks', taskRouter);

module.exports = app;
