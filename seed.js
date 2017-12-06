'use strict'
const Promise = require('bluebird')
const db = require('./server/db')

let data = {
  campus: [
    {
      name: 'Jupiter',
      imageUrl: 'https://i.pinimg.com/originals/ef/10/5b/ef105b34f57127f9c3be923a6adb276a.jpg',
      description: 'Built upon the face of a mountain, Jupiter campus focuses on the mystic arts'
    },
    {
      name: 'Earth',
      imageUrl: 'https://i.pinimg.com/564x/15/b9/0e/15b90e89117922278f06fed2f978a3df--lord-of-the-rings-the-lord.jpg',
      description: 'Hidden in the Deep Sea Forest, Earth campus focuses on medicinal and healing arts'
    },
    {
      name: 'Saturn',
      imageUrl: 'https://31.media.tumblr.com/3300d815ddfde785d2f2f4973f4c745f/tumblr_inline_nd3ckrBc7d1sm5dl0.jpg',
      description: 'Floating above the clouds, Saturn campus focuses on the divine arts'
    },
    {
      name: 'Mercury',
      imageUrl: 'https://i.pinimg.com/originals/0c/c2/3c/0cc23c50e0b4b523e3a9772e9fe8a8bc.jpg',
      description: 'Located on the triedge of the Mercury Sea, Mercury Campus focuses on elemental arts'
    },
  ],
  student: [
    {
      firstname: 'Oczane',
      lastname: 'Rivera',
      email: 'oczane.rivera@mystic.com',
      gpd: 3.50,
      campusId: 1
    },
    {
      firstname: 'Jael',
      lastname: 'Rivera',
      email: 'jael.rivera@mystic.com',
      gpd: 3.00,
      campusId: 3
    },
    {
      firstname: 'Justin',
      lastname: 'Mathieu',
      email: 'justin@wondermail.com',
      gpd: 2.60,
      campusId: 4
    },
    {
      firstname: 'Evelyn',
      lastname: 'Michel',
      email: 'evelyn@wondermail.com',
      gpd: 3.50,
      campusId: 2
    },
  ]
}

db.sync({force: true})
  .then( () => {
    console.log('Dropped old data, now insterting seed data')
    return db.Campus.bulkCreate(data.campus)
  })
  .then( () => db.Student.bulkCreate(data.student))
  .then( () => {
    console.log('Finished inserting data')
  })
  .catch( err => console.error('Umm there seems to be a problem', err, err.stack))
  .finally( () => {
    db.close()
    console.log('connection closed')
    return null;
  })
