import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Transaction from '../database/models/Transaction';

import { Response } from 'superagent';
import { transactionMock, allTransactionsMock } from './mocks/transactionMock';
import { userLoginMock } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao fazer buscar por todas as transações', () => { 
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Transaction, "findAll")
      .resolves(allTransactionsMock as Transaction[]);
  });

  afterEach(()=>{
    (Transaction.findAll as sinon.SinonStub).restore();
  })
 
  it('Retorna um array caso a busca seja válida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/transaction')
      .set('Authorization', `${userLoginMock.token}`)
 
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body).to.be.a('array');
  })
});