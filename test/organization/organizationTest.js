const { before } = require('mocha');
const supertest = require('supertest');
const app = require('../../app');
const cognito = require('../../services/cognito')
const headers = {
  access_token: ''
};
const orgInfo = {
  name: `Test ${new Date().valueOf()}`,
  id: 0
}

before(async () => {
  const payload = {
    email: "test.user",
    password: "password"
  };
  const signIn = await cognito.signIn("test.user", "password");
  headers.access_token = signIn.token;
})

describe('GET /organization', () => {
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

describe('Create POST /organization', () => {
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
  it('should throw authorization error 401 while creating organization', (done) =>  {
    const payload = {
      name: orgInfo.name
    };
    supertest(app)
      .post('/organization/create')
      .send(payload)
      .set('Accept', 'application/json')
      .expect(401)
      .end((err, response) => {
        if (err) return done(err);
        return done();
    });
  });
});

describe('Update POST /organization', () => {
  it('should update organization', (done) =>  {
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

describe('Delete POST /organization', () => {
  it('should Delete organization', (done) =>  {
    const payload = {
      id: orgInfo.id
    };
    supertest(app)
      .post('/organization/delete')
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