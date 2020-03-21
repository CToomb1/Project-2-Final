const express = require('express');
const routes = require('./routes');
const path = require("path");
const sequelize = require('./config/connection');
const dbitems = require('./Lib/db_items.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, './public/dashboard.html'));
});

app.get('/shifts', (req, res) => {
    res.sendFile(path.join(__dirname, './public/shifts.html'));
});

app.get('/employees', (req, res) => {
    res.sendFile(path.join(__dirname, './public/employees.html'));
});

app.get('/api/empshift', (req, res) => {
    dbitems.viewAssignment(function (result) {
        res.json(result);
    });
});

app.get('/api/emps', (req, res) => {
    dbitems.viewEmp(function (results) {
        res.json(results);
    });
});

app.post('/api/emp', (req, res) => {
    dbitems.createEmp(req.body);
});

app.post('/api/shifts', (req, res) => {
    dbitems.createShift(req.body);
});

app.post('/api/assignshift', (req, res) => {
    dbitems.assignEmp(req.body);
});

app.get('/api/shifts', (req, res) => {
    dbitems.viewShifts(function (results) {
        res.json(results);
    });
});

// if you have a front-end...use express.static('public')

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});