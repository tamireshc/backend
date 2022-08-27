const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const crypto = require('crypto');
const talkerFunc = require('./talkerFunc');
const checkToken = require('./middlewares/checkToken');
const checkNameAndAge = require('./middlewares/checkNameAndAge');
const checkTalk = require('./middlewares/checkTalk');
const checkWatcheAtAndRate = require('./middlewares/checkWatchedAtAndRate');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const talkers = await talkerFunc.getAllTalkers();
  res.status(200).json(talkers);
});

app.get('/talker/search', checkToken, async (req, res) => {
  const { q } = req.query;
  if (!q) {
    const talkers = await talkerFunc.getAllTalkers();
    res.status(200).json(talkers);
  } else {
    const result = await talkerFunc.querySearch(q);
    res.status(200).json(result);
  }
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await talkerFunc.getTalkerById(Number(id));
  if (talker) {
    res.status(200).json(talker);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const regex = /[\w.-]+@[\w-]+\.[\w.-]+/gi;
  if (!email) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } if (!regex.test(email)) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } if (!password) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
});

app.post('/talker', checkToken, checkNameAndAge, checkTalk,
  checkWatcheAtAndRate, async (req, res) => {
    const bodyx = req.body;
    const result = await talkerFunc.insertNewTalker(bodyx);
    const lastResult = result[result.length - 1];
    res.status(201).json(lastResult);
  });

app.delete('/talker/:id', checkToken, async (req, res) => {
  const { id } = req.params;
  await talkerFunc.deleteTalker(Number(id));
  res.sendStatus(204);
});

app.put('/talker/:id', checkToken, checkNameAndAge, checkTalk,
  checkWatcheAtAndRate, async (req, res) => {
    const { id } = req.params;
    const numberId = Number(id);
    const data = req.body;
    const result = await talkerFunc.editTalker(numberId, data);
    res.status(200).json(result);
  });

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;