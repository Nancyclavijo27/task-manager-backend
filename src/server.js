// src/server.js

const app = require('./app');

const PORT = process.env.PORT || 5000;

// Iniciar el servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar para pruebas
module.exports = server;
