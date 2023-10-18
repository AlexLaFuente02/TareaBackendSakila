const express = require("express");
const app = express();
const PORT = process.env.PORT || 3030;

const actorAPI = require("./API/actorAPI");

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Rutas
app.use("/actor", actorAPI);

// Ruta de inicio
app.get("/", (req, res) => {
    res.send("¡Bienvenido al API REST de SAKILA!");
});
  
  // Escucha en el puerto especificado
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  