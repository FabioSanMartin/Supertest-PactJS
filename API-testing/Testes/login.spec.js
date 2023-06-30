const request = require('supertest')

describe('User Login', () => {
    it('(HealthCheck) Should get access token', () => {
      request('http://localhost:3000/api')
      .post('/login')
      .send({
        "username": "admin",
        "password": "admin"
      }) 
      .set('Accept', 'application/json')
      .then(response =>{
        expect(response.statusCode).toEqual(201)
        expect(response.body.accessToken).not.toBe(undefined)
      })

    });
});