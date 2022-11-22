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

describe('Ao fazer registrar', () => { 
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "create")
      .resolves(userMock as User);
  });

  afterEach(()=>{
    (User.create as sinon.SinonStub).restore();
  })
 
  it('Retorna uma string com o token quando inseridos dados corretos', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({ username: "NovoUsuário", password: "123Senha" } );
 
    expect(chaiHttpResponse.status).to.equal(201);
    expect(chaiHttpResponse.body.message).to.be.a.string;
  })

  it('Retorna erro caso tente registrar usuário que já existe', async () => {
    const { username, password } = loginMock
    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({ username, password } );
 
    expect(chaiHttpResponse.status).to.equal(409);
    expect(chaiHttpResponse.body.message).to.be.equal('O ususário já existe');
  })

  it('Retorna um erro caso a senha seja menor que 8 caracteres', async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({ username, password: '123nha' } );
 
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('password must be at least 8 characters long');
  });

  it('Retorna um erro caso não possua pelo menos 1 letra maiúscula na senha', async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({ username, password: '123senha' } );
 
    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('password must contain at least one uppercase letter and one number');
  });

  it('Retorna um erro caso algum campo não seja passado',async () => {
    const { username } = loginMock;
    chaiHttpResponse = await chai
      .request(app)
      .post('/register')
      .send({ username, password: '' });

    expect(chaiHttpResponse.status).to.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });
});