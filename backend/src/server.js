require('dotenv').config();

const db = require('./database/db');

const app = require('./app');
const config = require('./config');


app.listen(config.port, () => {
  console.log(
    `Backend server running on port ${config.port} [${config.env}]`
  );
});
