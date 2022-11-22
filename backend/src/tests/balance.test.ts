import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Account from '../database/models/Account';

import { Response } from 'superagent';
import { balanceMock, balanceReturnMock } from './mocks/accountMock';
import { userLoginMock } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao buscar pelo balance', () => { 
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Account, "findOne")
      .resolves(balanceMock as Account);
  });

  afterEach(()=>{
    (Account.findOne as sinon.SinonStub).restore();
  })

  it('Retorna o balance correto caso o token seja válido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/balance')
      .set('Authorization', `${userLoginMock.token}`)
  
  
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.a('object');
  })
 
  it('Retorna erro caso não seja passado o token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/balance')

 
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Token não encontrado');
  })

it('Retorna erro caso não seja passado o token', async () => {
  chaiHttpResponse = await chai
    .request(app)
    .get('/balance')
    .set('Authorization', `error ${userLoginMock.token}`)


  expect(chaiHttpResponse.status).to.equal(401);
  expect(chaiHttpResponse.body.message).to.be.equal('Token inválido');
})
})