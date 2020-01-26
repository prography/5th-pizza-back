import app from './app';
import dotenv from 'dotenv';
import { connectDatabase, sync } from './models';

dotenv.config();

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';
function main() {
  connectDatabase();
  sync();
  app.listen(port, host, () => {
    console.log(`server is running on ${port}`)
  });
}

main();
