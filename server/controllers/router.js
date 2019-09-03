const express = require('express');
const user = require('./user');
const group = require('./group');
const channel = require('./channel');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async function (req, res) {
  const result = await user.login(req.body.username);

  if (result === undefined) {
    await res.status(404).send('The specific user is not found.');
  } else {
    await res.json(result);
  }
});

router.get('/user', async function (req, res) {
  const result = await user.getUsers();

  if (result === undefined) {
    await res.json([]);
  } else {
    await res.json(result);
  }
});

router.post('/user', async function (req, res) {
  const result = await user.addUser(req.body);

  if (result) {
    await res.status(201).send();
  } else {
    await res.status(409).send('A user with same username exists.');
  }
});

router.put('/user/', async function (req, res) {
  const result = await user.updateUser(req.body);

  if (result) {
    await res.status(204).send();
  } else {
    await res.status(404).send('The specific user is not found.');
  }
});

router.delete('/user', async function (req, res) {
  const result = await user.deleteUser(req.body);

  if (result) {
    await res.status(204).send();
  } else {
    await res.status(404).send('The specific user is not found.');
  }
});

router.get('/group', async function (req, res) {
  const result = await group.getGroups();
  await res.json(result);
});

router.put('/group', async function (req, res) {
  const result = await group.saveGroups(req.body);
  await res.json(result);
});

router.get('/channel', async function (req, res) {
  const result = await channel.getChannels();
  await res.json(result);
});

router.put('/channel', async function (req, res) {
  const result = await channel.saveChannels(req.body);
  await res.json(result);
});

module.exports = router;
