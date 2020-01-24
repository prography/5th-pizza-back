import app from './app';
import { sequelize } from './models';

const port = process.env.PORT || 4000;
const host = process.env.HOST || 'localhost';
async function main() {
  await sequelize.sync()
  app.listen(port, host, () => {
    console.log(`server is running on ${port}`)
  });
}

main();
