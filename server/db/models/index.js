'use strict';

//All Models
const Student = require('./Student')
const Campus = require('./Campus')

//Associations
Student.belongsTo(Campus)
Campus.hasMany(Student)

// Exporting all models
module.exports = {
	Student,
	Campus
}
