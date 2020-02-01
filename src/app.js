import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import { BaseHttpError } from './errors/BaseHttpError';

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.use((err, req, res, next) => {
  if (err instanceof BaseHttpError) {
    res.status(err.httpCode).send({
      error: {
        name: err.name,
        message: err.message
      }
    })
  } else {
    res.status(500).send({
      error: err
    });
  }
})

export default app;
