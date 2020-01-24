import app from './app';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({
    path: envPath
  });
}

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';
async function main() {
  import { sequelize } from './models';
  await sequelize.sync()
  app.listen(port, host, () => {
    console.log(`server is running on ${port}`)
  });
}

main();
