'use strict'
const Sequelize = require('sequelize')
const db = new Sequelize('postgress://localhost:5432/land', {logging: false})

module.exports = db
