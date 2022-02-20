/**
* Tests para la obtencion de registros de ibc
*/

"use strict";

const request = require('supertest');
const should = require('should');

require('../registrarBabel');
let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IntcImZlY2hhXCI6XCIyMDIxLTEyLTAxVDE5OjQ3OjI4LjE4M1pcIixcImRpblwiOjB9Ig.xiv8HuDBym9Mwdh0V9ncC6u_eb1hK1qIoL92CW0w1y0';
global.server = {};

describe('Iniciando el test', () => {
  before((done) => {
    server = require('../../app');
    done();
  });

  it('>>> Respuesta a GET para obtener lista de registros por rango de fechas: /api/v2/listapcd', (done) => {
    request(server)
      .get('/api/v2/pcd2/listapcd?fecha_inicio=01/01/2020&fecha_fin=28/01/2020')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.property('finalizado');
        res.body.should.be.not.null();
        done();
      });
  });

  it('>>> Respuesta a GET para obtener datos de un registro por ci: /api/v2/pcd/:ci', (done) => {
    request(server)
      .get('/api/v2/pcd/123456')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.have.property('codigo');
        res.body.should.be.not.null();
        done();
      });
  });
});
