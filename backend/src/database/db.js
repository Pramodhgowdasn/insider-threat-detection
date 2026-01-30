require('dotenv').config();

const knex = require('knex');
const knexConfig = require('../../knexfile');

// Use development config explicitly
const db = knex(knexConfig.development);

module.exports = db;
