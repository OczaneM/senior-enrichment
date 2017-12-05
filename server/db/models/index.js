'use strict';

const db = require('../index');

//All Models
const Student = require('./models/Student')
const Campus = require('./model/Campus')

//Associations
Student.belongsTo(Campus)
Campus.hasMany(Student)

// Exporting all models
module.exports = {
	db,
	Student,
	Campus
}
