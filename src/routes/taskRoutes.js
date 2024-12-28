const express = require('express');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Crea una nueva tarea
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *               description:
 *                 type: string
 *                 description: Descripción de la tarea
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 */
router.post('/', createTask);


/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Devuelve la lista de tareas
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Filtrar tareas por estado de completado
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID de la tarea
 *                   title:
 *                     type: string
 *                     description: Título de la tarea
 *                   description:
 *                     type: string
 *                     description: Descripción de la tarea
 *       400:
 *         description: Error en los parámetros
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Devuelve una tarea por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID de la tarea
 *                 title:
 *                   type: string
 *                   description: Título de la tarea
 *                 description:
 *                   type: string
 *                   description: Descripción de la tarea
 *       404:
 *         description: Tarea no encontrada
 */
router.get('/:id', getTaskById);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Actualiza una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: El título de la tarea
 *               description:
 *                 type: string
 *                 description: La descripción de la tarea
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 */
router.put('/:id', updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Elimina una tarea
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */
router.delete('/:id', deleteTask);

module.exports = router;
