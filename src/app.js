const express = require('express'); 
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./utils/errorHandler'); 


// Configuración de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

// Inicializar la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Define las opciones para Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
  },
  apis: ['./src/routes/taskRoutes.js'], // Cambia según la ubicación exacta

};    

// Genera la documentación de la API
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Log para verificar el contenido de swaggerDocs
//console.log('Swagger Docs:', JSON.stringify(swaggerDocs, null, 2));

// Usa Swagger UI para ver la documentación
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api/tasks', require('./routes/taskRoutes'));

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de manejo de errores global
app.use(errorHandler);

// Exportar solo la app (sin escuchar el puerto)
module.exports = app;
