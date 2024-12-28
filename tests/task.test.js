const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../src/app');
const connectDB = require('../src/config/db');

let mongoServer;
let server;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Conecta Mongoose al servidor en memoria
  await connectDB(uri);

  server = app.listen(5000);
});

afterAll(async () => {
  try {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
    await mongoose.connection.close();
    await mongoServer.stop();
    server.close();
  } catch (error) {
    console.error('Error cerrando conexiones:', error);
  }
});

describe('Task API Endpoints', () => {
  let taskId;

  it('should create a new task', async () => {
    const task = { title: 'Test Task', description: 'Test Description' };

    const response = await request(server).post('/api/tasks').send(task);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.title).toBe(task.title);
    taskId = response.body._id;
  });

  it('should not create a task with invalid data', async () => {
    const task = { description: 'Missing title' };

    const response = await request(server).post('/api/tasks').send(task);

    expect(response.status).toBe(400);
    expect(response.body.errors[0].msg).toBe('El título es obligatorio');
  });

  it('should fetch all tasks', async () => {
    const response = await request(server).get('/api/tasks');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch a task by ID', async () => {
    const response = await request(server).get(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(taskId);
  });

  it('should return 404 for non-existent task by ID', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const response = await request(server).get(`/api/tasks/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Tarea no encontrada');
  });

  it('should update a task', async () => {
    const updatedTask = { title: 'Updated Task', description: 'Updated Description' };

    const response = await request(server).put(`/api/tasks/${taskId}`).send(updatedTask);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(updatedTask.title);
  });

  it('should delete a task', async () => {
    const response = await request(server).delete(`/api/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Tarea eliminada exitosamente');

    const fetchResponse = await request(server).get(`/api/tasks/${taskId}`);
    expect(fetchResponse.status).toBe(404);
  });
});
