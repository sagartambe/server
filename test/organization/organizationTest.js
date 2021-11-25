const supertest = require('supertest');
const app = require('../../app');
const headers = {
  access_token: ''
};
const orgInfo = {
  name: `Test ${new Date().valueOf()}`,
  id: 0
}

describe('GET /organization', () => {
  it('responds return access token', (done) =>  {
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
        headers.access_token = response.body.token;
        if (err) return done(err);
        return done();
      });
  });
  it('should respond with 200', (done) =>  {
    supertest(app)
      .get('/organization')
      .set('Accept', 'application/json')
      .set('Authorization', headers.access_token)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        return done();
      });
  });
});

describe('POST /organization', () => {
  it('should create organization', (done) =>  {
    const payload = {
      name: orgInfo.name
    };
    supertest(app)
      .post('/organization/create')
      .send(payload)
      .set('Accept', 'application/json')
      .set('Authorization', headers.access_token)
      .expect(200)
      .end((err, response) => {
        orgInfo.id = response.body.id
        if (err) return done(err);
        return done();
      });
  });
  it('should create organization', (done) =>  {
    const payload = {
      name: `${orgInfo.name}-update`,
      id: orgInfo.id
    };
    supertest(app)
      .post('/organization/update')
      .send(payload)
      .set('Accept', 'application/json')
      .set('Authorization', headers.access_token)
      .expect(200)
      .end((err, response) => {
        if (err) return done(err);
        return done();
      });
  });
});
