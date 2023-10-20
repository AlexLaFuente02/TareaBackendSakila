const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info de la API
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Documentacion SakilaBD by Alex",
      version: "1.0.0"
    },
  },
  apis: ["src/API/authAPI.js", "src/API/actorAPI.js", "src/ENT/ActorENT.js"],
};

// Docs en JSON Format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  console.log(`Documentacion corriendo en http://localhost:${port}/api-docs`);
}

module.exports = { swaggerDocs };
