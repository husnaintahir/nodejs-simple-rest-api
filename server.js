const express = require('express');
const logger = require('morgan');

const users = require('./routes/users');

const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const middleware = require('./middleware');


var { port } = require('./config/config');

const app = express();


app.set('secretKey', process.env.JWT_SECRETKEY);

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(middleware.verifyAuthToken);
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.get('/', function (req, res) {
    res.json({
        "statusCode": 200,
        "message": "Welcome To My Rest API Demo"
    });
});

app.use('/users', users);

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {


    if (err.status === 404) {
        resObj = {
            "statusCode": 200,
            "error": 'API not found',
            "data": null
        };
        res.status(404).json(resObj);

    } else {

        var joiError = undefined;
        if (err.errors && err.errors[0] && err.errors[0].messages) {
            joiError = err.errors[0].messages[0].replace(/\"/gi, '');
        }
        res.json({
            "statusCode": 200,
            "error": joiError || err,
            "data": null
        });

    }
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connetction error'));

// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);

app.listen(process.env.PORT || 3000, function () { console.log(`Node server is running in ${process.env.NODE_ENV} on port ${port}`); });