'use strict';

const Sequelize = require('sequelize')
const db = require('../index')

const Student = db.define('student', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.INTEGER,
    validate: {
      max: 4,
      min: 0
    }
  },
  fullname: {
    type: Sequelize.VIRTUAL,
    get () {
      return `${this.getDataValue('firstname')} ${this.getDataValue('lastname')}`
    }
  }
})

module.exports = Student
