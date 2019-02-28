const express = require('express');
const bodyParse = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
require('./app/models/employee.model');
const app = express();
const employeeController = require('./app/controllers/employeeController');

var port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;
app.use(bodyParse.urlencoded({extended : true}));
app.use(bodyParse.json());

app.set('views', path.join(__dirname, '/app/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/app/views/layouts/' }));
app.set('view engine', 'hbs');

mongoose.connect(dbConfig.url, {
    user: 'admin',
    pass: 'mongodb',
    useNewUrlParser: true
}).then(() => {
    console.log('Database successfully connected');
}).catch(err => {
    console.log('Database connection failed. ', err);
    process.exit();
});


app.get('/', (req,res) => {
    res.json({"message": "Welcome to retail application demo"});
});

require('./app/routes/user.routes.js') (app);

app.listen(port, () => {
    console.log("Server listing on port ",port);
});



app.use('/employee', employeeController);