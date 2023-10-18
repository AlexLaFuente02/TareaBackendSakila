const express = require('express');
const router = express.Router();
const actorService = require('../Service/actorService'); // Ajusta la importación según tu estructura de carpetas

router.get('/', async (req, res) => {
  console.log('GET request received for getAllActors');
  const response = await actorService.getAllActors();
  res.json({
    method: 'getAllActors',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.get('/:id', async (req, res) => {
  console.log(`GET request received for getActorById with ID: ${req.params.id}`);
  const response = await actorService.getActorById(req.params.id);
  res.json({
    method: 'getActorById',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.post('/', async (req, res) => {
  console.log('POST request received for createActor with data:', req.body);
  const response = await actorService.createActor(req.body);
  res.json({
    method: 'createActor',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.put('/:id', async (req, res) => {
  console.log(`PUT request received for updateActor with ID: ${req.params.id}, data:`, req.body);
  const response = await actorService.updateActor(req.params.id, req.body);
  res.json({
    method: 'updateActor',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

router.delete('/:id', async (req, res) => {
  console.log(`DELETE request received for deleteActor with ID: ${req.params.id}`);
  const response = await actorService.deleteActor(req.params.id);
  res.json({
    method: 'deleteActor',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

module.exports = router;
