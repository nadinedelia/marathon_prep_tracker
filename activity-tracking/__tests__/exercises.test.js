const request = require('supertest');
const express = require('express');
const app = express();
const Exercise = require('../models/exercise.model');
const exerciseRouter = require('../routes/exercises');

app.use(express.json());
app.use('/exercises', exerciseRouter);

let exerciseId;

describe('Exercise Routes', () => {

  it('should create a new exercise', async () => {
    const res = await request(app)
      .post('/exercises/add')
      .send({
        username: 'test',
        description: 'test description',
        duration: 20,
        date: new Date(),
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Exercise added!');
    exerciseId = res.body._id;  // Store the id of created exercise for later use
  });

  it('should fetch all exercises', async () => {
    const res = await request(app).get('/exercises/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should retrieve an exercise by ID', async () => {
    const res = await request(app).get(`/exercises/${exerciseId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body._id).toEqual(exerciseId);
  });

  it('should update an exercise by ID', async () => {
    const res = await request(app)
      .put(`/exercises/update/${exerciseId}`)
      .send({
        username: 'updated',
        description: 'updated description',
        duration: 30,
        date: new Date(),
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Exercise updated!');
    expect(res.body.exercise.username).toEqual('updated');
  });

  it('should delete an exercise by ID', async () => {
    const res = await request(app).delete(`/exercises/${exerciseId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Exercise deleted.');
  });
});
