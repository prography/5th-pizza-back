import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500).send(err);
})

export default app;
