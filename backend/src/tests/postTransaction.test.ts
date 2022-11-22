import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Transaction from '../database/models/Transaction';

import { Response } from 'superagent';
import { transactionMock } from './mocks/transactionMock';
import { userLoginMock } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao fazer fazer uma transação', () => { 
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Transaction, "create")
      .resolves(transactionMock as Transaction);
  });

  afterEach(()=>{
    (Transaction.create as sinon.SinonStub).restore();
  })
 
  it('Retorna um objeto caso a transação seja válida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/transaction')
      .set('Authorization', `${userLoginMock.token}`)
      .send({ username: "Joao", value: 10 } );
 
    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body).to.be.a('object');
  })

  it('Retorna erro caso o usuário não exista', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/transaction')
      .set('Authorization', `${userLoginMock.token}`)
      .send({ username: 'Usuário inexistente', value: 10 } );
 
    expect(chaiHttpResponse.status).to.equal(404);
    expect(chaiHttpResponse.body.message).to.be.equal('Usuário não encontrado');
  })

  it('Retorna um erro caso tente transferir para si mesmo', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/transaction')
      .set('Authorization', `${userLoginMock.token}`)
      .send({ username: 'Fabio', value: 10 } );
 
    expect(chaiHttpResponse.status).to.equal(409);
    expect(chaiHttpResponse.body.message).to.be.equal('Você não pode transferir para a sua própria conta');
  });

  it('Retorna um erro caso não haja saldo suficiente', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/transaction')
      .set('Authorization', `${userLoginMock.token}`)
      .send({ username: 'Joao', value: 1000000000000000 } );
 
    expect(chaiHttpResponse.status).to.equal(409);
    expect(chaiHttpResponse.body.message).to.be.equal('Saldo insuficiente');
  });
});