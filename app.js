const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');
const {dbConnection} = require('./db/db');
const { consultaAxios } = require('./controllers/controllers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.get("/pokemon", consultaAxios);
app.use((req, res) => {
    res.status(404).send(`La ruta ${req.originalUrl} no existe`)
});

dbConnection()

module.exports = app;
