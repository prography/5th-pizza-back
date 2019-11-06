const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
let sequelize = require('./models').sequelize;

app = express();

sequelize.sync();

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json());
app.use(routes);

module.exports = app;
