import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';
import { loginMock, userMock } from './mocks/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Ao fazer o login', () => { 
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })
 
  it('Retorna uma string com o token quando inseridos dados corretos', async () => {
    const { username, password } = loginMock
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ username, password } );
 
    expect(chaiHttpResponse.status).to.equal(200);
    expect(chaiHttpResponse.body.message).to.be.a.string;
  })

  it('Retorna um erro caso o email ou password sejam inválidos', async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ username, password: '123Seenha' } )
 
    expect(chaiHttpResponse.status).to.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('usuário ou senha inválidos');
  });

  it('Retorna um erro caso a senha seja menor que 8 caracteres', async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ username, password: '123nha' } );
 
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('password must be at least 8 characters long');
  });

  it('Retorna um erro caso não possua pelo menos 1 letra maiúscula na senha', async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ username, password: '123senha' } );
 
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('password must contain at least one uppercase letter and one number');
  });

  it('Retorna um erro caso algum campo não seja passado',async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({ username, password: '' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});