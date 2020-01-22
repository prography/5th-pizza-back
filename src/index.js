import app from './app';

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';

app.listen(port, host, () => {
  console.log(`server is running on ${port}`)
});
