const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
let sequelize = require('./models').sequelize;

app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

sequelize.sync();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).send(err);
})



module.exports = app;
