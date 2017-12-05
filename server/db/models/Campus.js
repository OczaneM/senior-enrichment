'use strict';

const Sequelize = require('sequelize')
const db = require('../index')

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'http://www.bicas.co.uk/wp-content/uploads/2015/12/SUNY_Brockport_Hartwell_Hall-400x200.jpg'
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campus
