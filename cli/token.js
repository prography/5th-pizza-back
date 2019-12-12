const { generateToken } = require('../src/utils/AuthHelper');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '..', 'src', '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
}

function main() {
    switch(process.argv[2]) {
        case 'generate':
            console.log(generateToken({ user_id: 1 }))
        break;
    }
}

main();
