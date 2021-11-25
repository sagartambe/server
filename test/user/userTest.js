const supertest = require('supertest');
const app = require('../../app');
const headers = {
  Authorization: ''
}

describe('POST /user', () => {
  it('responds with token', (done) =>  {
    const payload = {
      email: "email3@mydomain.com",
      password: "password"
    };
    supertest(app)
      .post('/user/signin')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, response) => {
        headers.Authorization = response.body.token;
        if (err) return done(err);
        return done();
      });
  });
  it('respond with 412', (done) =>  {
    const payload = {
      email: "email3@mydomain",
      password: "password"
    };
    supertest(app)
      .post('/user/signin')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(412, done);
  });
  it('not respond with token', (done) =>  {
    const payload = {
      email: "test@mydomain.com",
      password: "password"
    };
    supertest(app)
      .post('/user/signin')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500, done);
  });
});
