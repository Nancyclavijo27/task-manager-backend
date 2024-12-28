// utils/errorHandler.js

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Imprimir el stack de error en consola (opcional, solo para desarrollo)
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Datos inválidos', errors: err.errors });
    }
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  
    res.status(500).json({ message: 'Error del servidor', error: err.message });
  };
  
  module.exports = errorHandler;
  