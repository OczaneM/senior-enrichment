'use strict'
const router = require('express').Router()
const {Campus, Student} = require('../db/models')
module.exports = router

//Get all students
router.get('/', (req, res, next) => {
  Student.findAll({include: [Campus]})
    .then( foundStudent => res.json(foundStudent))
    .catch(next)
})

//Create a student
router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then( createdStudent => {
      Student.findOne({
        where: {id: createdStudent.id},
        include: [Campus]})
    })
    .then( createdStudent => res.json(createdStudent))
    .catch(next)
})

//Updated a specific student
router.put('/:id', (req, res, next) => {
  Student.update(req.body, {
    where: {id: req.params.id},
    returning: true
  })
  .then( updatedStudentArray => {
    return Student.findOne({
      where: {id: updatedStudentArray[1][0].id},
      include: [Campus] })
      .then( updatedStudent => res.json(updatedStudent))
      .catch(next)
  })
})

//Delete a specific student
router.delete('/:id', (req, res, next) => {
  Student.destroy({where: {id: req.body.id}})
  .then( () => res.statusMessage(204))
  .catch(next)
})
