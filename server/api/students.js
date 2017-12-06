'use strict'
const router = require('express').Router()
const {Campus, Student} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Student.findAll({include: [Campus]})
    .then( foundStudent => res.json(foundStudent))
    .catch(next)
})
