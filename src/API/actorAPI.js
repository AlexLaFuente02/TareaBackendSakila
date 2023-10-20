const express = require('express');
const router = express.Router();
const actorService = require('../Service/actorService');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.1.0",
    info: { title: "Documentacion SakilaBD by Alex", version: "1.0.0" },
  },
  apis: [__filename],
};

const swaggerDocs = swaggerJsdoc(options);

/**
 * @openapi
 * /actor:
 *   get:
 *     tags:
 *       - Actors
 *     summary: Obtener todos los actores
 *     description: Obtiene una lista de todos los actores en la base de datos.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: getAllActors
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ActorDTO"
 *                 message:
 *                   type: string
 *                   example: Actores obtenidos correctamente
 */
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

/**
 * @openapi
 * /actor/paginado:
 *   get:
 *     tags:
 *       - Actors
 *     summary: Obtener actores con paginación
 *     description: Obtiene una lista de actores con paginación.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: integer
 *         description: Número de elementos por página
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: getActorsWithPagination
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/ActorDTO"
 *                 message:
 *                   type: string
 *                   example: Actores obtenidos correctamente
 */
router.get('/paginado', async (req, res) => {
  const { page = 1, perPage = 3 } = req.query;
  const offset = (page - 1) * perPage;

  console.log(`GET request received for getActorsWithPagination: page ${page}, perPage ${perPage}`);

  const response = await actorService.getActorsWithPagination(offset, perPage);

  res.json({
    method: 'getActorsWithPagination',
    code: response.code,
    result: response.result,
    message: response.message,
  });
});

/**
 * @openapi
 * /actor/{id}:
 *   get:
 *     tags:
 *       - Actors
 *     summary: Obtener actor por ID
 *     description: Obtiene un actor por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del actor
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: getActorById
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   $ref: "#/components/schemas/ActorDTO"
 *                 message:
 *                   type: string
 *                   example: Actor obtenido correctamente
 *       404:
 *         description: Actor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: getActorById
 *                 code:
 *                   type: string
 *                   example: ACT-1002
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Actor no encontrado
 */
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


/**
 * @openapi
 * /actor:
 *   post:
 *     tags:
 *       - Actors
 *     summary: Crear actor
 *     description: Crea un nuevo actor en la base de datos.
 *     requestBody:
 *       description: Datos del actor a crear
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ActorDTO"
 *     responses:
 *       201:
 *         description: Actor creado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: createActor
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   $ref: "#/components/schemas/ActorDTO"
 *                 message:
 *                   type: string
 *                   example: Actor creado correctamente
 */
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

/**
 * @openapi
 * /actor/{id}:
 *   put:
 *     tags:
 *       - Actors
 *     summary: Actualizar actor por ID
 *     description: Actualiza un actor existente en la base de datos por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del actor
 *       - in: query
 *         name: actorData
 *         schema:
 *           $ref: "#/components/schemas/ActorDTO"
 *     responses:
 *       200:
 *         description: Actor actualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: updateActor
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   $ref: "#/components/schemas/ActorDTO"
 *                 message:
 *                   type: string
 *                   example: Actor actualizado correctamente
 *       404:
 *         description: Actor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: updateActor
 *                 code:
 *                   type: string
 *                   example: ACT-1004
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Actor no encontrado
 */

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

/**
 * @openapi
 * /actor/{id}:
 *   delete:
 *     tags:
 *       - Actors
 *     summary: Eliminar actor por ID
 *     description: Elimina un actor existente en la base de datos por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del actor
 *     responses:
 *       200:
 *         description: Actor eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: deleteActor
 *                 code:
 *                   type: string
 *                   example: ACT-0000
 *                 result:
 *                   type: string
 *                   example: Actor eliminado con éxito
 *                 message:
 *                   type: string
 *                   example: Actor eliminado con éxito
 *       404:
 *         description: Actor no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 method:
 *                   type: string
 *                   example: deleteActor
 *                 code:
 *                   type: string
 *                   example: ACT-1005
 *                 result:
 *                   type: null
 *                 message:
 *                   type: string
 *                   example: Actor no encontrado
 */

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
