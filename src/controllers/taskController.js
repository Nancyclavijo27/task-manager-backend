const Task = require('../models/Task');
const { body, validationResult } = require('express-validator');

// Crear una nueva tarea
// Crear una nueva tarea con validación
const createTask = async (req, res) => {
  // Validaciones
  await body('title').notEmpty().withMessage('El título es obligatorio').run(req);
  await body('description').optional().isLength({ max: 500 }).withMessage('La descripción no debe exceder los 500 caracteres').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todas las tareas (con filtro opcional por estado)
const getTasks = async (req, res, next) => {
  try {
    const { completed } = req.query; // Recibir el filtro desde el query string
    let filter = {};

    if (completed !== undefined) {
      if (completed !== 'true' && completed !== 'false') {
        return res.status(400).json({ message: 'El parámetro "completed" debe ser "true" o "false"' });
      }
      filter.completed = completed === 'true';
    }

    const tasks = await Task.find(filter); // Buscar tareas con el filtro
    res.status(200).json(tasks); // Enviar tareas filtradas
  } catch (error) {
    next(error); // Pasar al middleware de manejo de errores
  }
};



// Obtener una tarea por ID
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
