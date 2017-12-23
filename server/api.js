const express = require('express');
const apiRouter = express.Router();
const {
  createMeeting,
  deleteAllFromDatabase,
  addToDatabase,
  getAllFromDatabase,
  getFromDatabaseById,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea')

apiRouter.get('/minions', (req, res, next) => {
  const minions = getAllFromDatabase('minions')
  if (minions) {
    res.status(200).send(minions);
  } else {
    res.status(400).send();
  }
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  const Id = req.params.minionId
  const minion = getFromDatabaseById('minions', Id)
  if (minion) {
    res.status(200).send(minion)
  } else {
    res.status(404).send();
  }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
  const instance = req.body
  const minion = updateInstanceInDatabase('minions', instance)
  if (minion) {
    res.status(200).send(minion)
  } else {
    res.status(404).send();
  }
})


apiRouter.post('/minions', (req, res, next) => {
  const instance = addToDatabase('minions', req.body);
  if (instance) {
    res.status(201).send(instance);
  } else {
    res.status(404).send();
  }
})

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const Id = req.params.minionId
  const success = deleteFromDatabasebyId('minions', Id)
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

apiRouter.get('/ideas', (req, res, next) => {
  const ideas = getAllFromDatabase('ideas');
  if (ideas) {
    res.status(200).send(ideas);
  } else {
    res.status(400).send();
  }
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  const Id = req.params.ideaId;
  const idea = getFromDatabaseById('ideas', Id);
  if (idea) {
    res.status(200).send(idea);
  } else {
    res.status(404).send();
  }
})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const instance = req.body
  const idea = updateInstanceInDatabase('ideas', instance)
  if (idea) {
    res.status(200).send(idea)
  } else {
    res.status(404).send()
  }
})

apiRouter.post('/ideas', checkMillionDollarIdea,  (req, res, next) => {
  const instance = addToDatabase('ideas', req.body)
  if (instance) {
    res.status(201).send(instance);
  } else {
    res.status(404).send();
  }
})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  const success = deleteFromDatabasebyId('ideas', req.params.ideaId)
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
})

apiRouter.get('/meetings', (req, res, next) => {
  res.status(200).send(getAllFromDatabase('meetings'))
})

apiRouter.post('/meetings', (req, res, next) =>{
  const instance = createMeeting();
  const meeting = addToDatabase('meetings', instance)
  if (meeting) {
    res.status(201).send(instance);
  } else {
    res.status(404).send();
  }
})

apiRouter.delete('/meetings', (req, res, next) => {
  deleteAllFromDatabase('meetings')
  res.status(204).send();
})

module.exports = apiRouter;
