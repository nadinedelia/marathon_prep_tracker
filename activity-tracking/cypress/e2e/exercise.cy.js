describe('Exercise API', () => {
  let id;

  it('Add a new exercise', () => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:5300/exercises/add',
      body: {
        username: 'testuser',
        exerciseType: 'Running',
        description: 'Running 5km',
        duration: 30,
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise added!');
      id = response.body._id; 
    });
  });

  it('Retrieve all exercises', () => {
    cy.request('http://localhost:5300/exercises').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length.greaterThan(0);
    });
  });

  it('Retrieve an exercise by ID', () => {
    cy.request(`http://localhost:5300/exercises/${id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body._id).to.eq(id);
    });
  });

  it('Update an exercise by ID', () => {
    cy.request({
      method: 'PUT',
      url: `http://localhost:5300/exercises/update/${id}`,
      body: {
        username: 'updateduser',
        description: 'Updated description',
        duration: 35,
        date: new Date()
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise updated!');
    });
  });

  it('Delete an exercise by ID', () => {
    cy.request('DELETE', `http://localhost:5300/exercises/${id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('Exercise deleted.');
    });
  });
});
