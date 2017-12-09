'use strict'
const router = require('express').Router()
const {Campus, Student} = require('../db/models')
module.exports = router


//get a specific campus
router.get('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
  .then( foundCampus => res.json(foundCampus))
  .catch(next)
})

//Get all campuses
router.get('/', (req, res, next) => {
  Campus.findAll()
    .then( foundCampus => res.json(foundCampus))
    .catch(next)
})

//Create a Campus
router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then( createdCampus => res.json(createdCampus))
    .catch(next)
})

//Updated a specific Campus
router.put('/:id', (req, res, next) => {
  Campus.update(req.body, {
    where: {id: req.params.id},
    returning: true
  })
  .then( updatedCampusArray => res.json(updatedCampusArray[1][0]))
  .catch(next)
})

//Delete a specific Campus
router.delete('/:id', (req, res, next) => {
  Campus.destroy({where: {id: req.params.id}})
  .then( () => res.status(204).end())
  .catch(next)
})
