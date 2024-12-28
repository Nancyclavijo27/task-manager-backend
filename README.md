
# Task Manager API

## Descripción

Esta API permite gestionar tareas, con operaciones CRUD (Crear, Leer, Actualizar, Eliminar). Los usuarios pueden crear nuevas tareas, obtener todas las tareas, buscar tareas por ID, actualizarlas y eliminarlas. Además, la API permite filtrar las tareas por su estado de completado.

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (a través de Mongoose)
- Swagger (para la documentación de la API)
- Express Validator (para la validación de datos)
- CORS (para permitir peticiones de diferentes dominios)
- dotenv (para manejar variables de entorno)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
Nota: Asegúrate de reemplazar <URL_DEL_REPOSITORIO> con la URL real de tu repositorio en GitHub u otra plataforma de repositorios.

Navega al directorio del proyecto:

bash
Copiar código
cd task-manager-api
Instala las dependencias necesarias:

bash
Copiar código
npm install
Crea un archivo .env en la raíz del proyecto para configurar las variables de entorno. Un ejemplo de las variables que podrías tener es:

bash
Copiar código
MONGO_URI=<tu_uri_de_mongo>
PORT=3000
MONGO_URI: la URI de tu base de datos MongoDB (si usas MongoDB local o una solución como MongoDB Atlas).
PORT: el puerto en el que deseas que tu servidor corra (usualmente el puerto 3000 o 5000).
Inicia la aplicación:

bash
Copiar código
npm start
Accede a la API desde tu navegador o herramientas como Postman:

La API estará corriendo en http://localhost:5000/.
Puedes acceder a la documentación de Swagger en http://localhost:5000/api-docs/.
Uso
Endpoints disponibles:
Crear una nueva tarea

Método: POST /tasks
Cuerpo de la solicitud:
json
Copiar código
{
  "title": "Mi nueva tarea",
  "description": "Descripción de la tarea"
}
Respuesta exitosa:
json
Copiar código
{
  "_id": "1234567890",
  "title": "Mi nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false
}
Obtener todas las tareas

Método: GET /tasks
Parámetros opcionales: completed (puede ser true o false para filtrar tareas por estado de completado).
Ejemplo de solicitud: GET /tasks?completed=true
Respuesta exitosa:
json
Copiar código
[
  {
    "_id": "1234567890",
    "title": "Mi nueva tarea",
    "description": "Descripción de la tarea",
    "completed": true
  }
]
Obtener una tarea por ID

Método: GET /tasks/:id
Ejemplo de solicitud: GET /tasks/1234567890
Respuesta exitosa:
json
Copiar código
{
  "_id": "1234567890",
  "title": "Mi nueva tarea",
  "description": "Descripción de la tarea",
  "completed": false
}
Actualizar una tarea

Método: PATCH /tasks/:id
Cuerpo de la solicitud:
json
Copiar código
{
  "completed": true
}
Respuesta exitosa:
json
Copiar código
{
  "_id": "1234567890",
  "title": "Mi nueva tarea",
  "description": "Descripción de la tarea",
  "completed": true
}
Eliminar una tarea

Método: DELETE /tasks/:id
Respuesta exitosa:
json
Copiar código
{
  "message": "Tarea eliminada exitosamente"
}
Documentación de la API
La documentación interactiva de la API está disponible a través de Swagger UI. Puedes acceder a ella en:

bash
Copiar código
http://localhost:5000/api-docs/
Pruebas
Para ejecutar las pruebas automáticas de la API, sigue estos pasos:

Instala las dependencias necesarias para las pruebas:

bash
Copiar código
npm install --save-dev jest supertest
Ejecuta las pruebas:

bash
Copiar código
npm test
Las pruebas se ejecutarán y te mostrarán los resultados en la terminal.



