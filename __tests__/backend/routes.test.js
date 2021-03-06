const request = require('supertest');
const { URI, secret } = require('../../server/controllers/testPSQL');
const CryptoJS = require('crypto-js');
const app = require('../../__mocks__/backendMockServer');

const sampleURI = CryptoJS.AES.encrypt(URI, secret).toString();

let server;

beforeAll((done) => {
  server = app.listen(3001)
  done();
})

afterAll((done) => {
  server.close(done)
})

describe('Route integration', () => {
  describe('/', () => {
    describe('GET -> Homepage', () => {
      it('responds with 200 status and text/html content type', (done) => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .end(done);
      });
    });
  })

  describe('/app', () => {
    describe('GET -> app page', () => {
      it('responds with 200 status and text/html content type', (done) => {
        return request(server)
          .get('/app')
          .expect('Content-Type', /text\/html/)
          .expect(200)
          .end(done);
      });
    });
  })

  describe('/graphql', () => {
    describe('GET -> graphql playground', () => {
      it('responds with 200 status and application/json content type AFTER successful POST to /psql', (done) => {
        return request(server)
          .post('/psql')
          .send({ psqlURI: sampleURI })
          .expect(200)
            .expect('Content-Type', /application\/json/)
            .end(() => {
              request(server)
              .get('/graphql')
              .expect('Content-Type', /application\/json/)
              .expect(200)
              .end(() => {
                return done();
              })
            })
      });
    });
  })

  describe('/psql', () => {
    describe('POST -> postgres uri', () => {
      it('responds with 200 status and application/json content type with psqlURI passed in req body', (done) => {
        return request(server)
          .post('/psql')
          .send({ psqlURI: sampleURI })
          .expect('Content-type', /application\/json/)
          .expect(200)
          .end(done)
      })

      it('responds with 200 status and application/json content type with sample passed in req body', (done) => {
        return request(server)
          .post('/psql')
          .send({ sample: true })
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .end(done)
      })
      
      it('properties dbName, schema, advice, and d3Data are in body of response', (done) => {
        return request(server)
          .post('/psql')
          .send({ psqlURI: sampleURI })
          .expect(200)
          .expect('Content-Type', /application\/json/)
          .then(({ body }) => {
            expect(body).toHaveProperty('dbName');
            expect(body).toHaveProperty('schema');
            expect(body).toHaveProperty('advice');
            expect(body).toHaveProperty('d3Data');
            return done();
          })
      })  

      it('responds with \'psql\' as dbName', (done) => {
          return request(server)
            .post('/psql')
            .send({ psqlURI: sampleURI })
            .expect(200)
            .expect('Content-Type', /application\/json/)
            .then(({ body }) => {
              expect(body.dbName).toEqual('psql');
              return done();
            })
        })

      
        it('responds to invalid request with 400 status and error message in body', (done) => {
          return request(server)
            .post('/psql')
            .send({ psqlURI: 'not a URI' })
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .then(({ body }) => {
              expect(body).toHaveProperty('err');
              return done();
            })
        })
    })
  })

}) 