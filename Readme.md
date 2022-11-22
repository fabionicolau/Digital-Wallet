# Boas-vindas ao repositório do projeto `Desafio NG.CASH`!

<details>
  <summary><strong>Proposta</strong></summary><br />

  Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

  No backend, devem ser implementadas rotas para login, cadastro, conferência de saldo disponível, transfências entre contas e busca por data e/ou entrada e saída de valores.

  No frontend, devem ser implementadas telas para login, cadastro e uma tela com seção para realização das transferências, bem como uma tabela com todas as transferências realizadas. Também deve ser possível filtrar por data e/ou entrada e saída de valores.

</details>

<details>
  <summary><strong>Realização</strong></summary><br />
  
  * Projeto `individual`;
  * Foram utilizados `6` dias para realização do projeto;

</details>

<details>
  <summary><strong>Configuração</strong></summary><br />

  * Para rodar o projeto, é necessário ter o `docker` e o `docker-compose` instalados;
  * `npm install` para instalar as dependências;
  * `npm run db:reset` para resetar o banco de dados;
  * `npm run compose:up` na raiz do projeto para rodar o container;

  <h4>Backend:</h4>

  * `npm install` na pasta 'backend' para instalar as dependências;
  * `npm run dev` na pasta 'back end' se quiser rodar o servidor em modo de desenvolvimento;
  * O projeto está configurado para rodar na porta `http://localhost:3001/`.  
  * Uma documentação do projeto em backend está disponível em <a href='https://documenter.getpostman.com/view/21539124/2s8YmSrL7v' target='_blank'>`https://documenter.getpostman.com/view/21539124/2s8YmSrL7v`</a>.

  <h4>Frontend:</h4>

  * `npm install` na pasta 'frontend' para instalar as dependências;
  * `npm start` na pasta 'frontend' se quiser rodar o projeto em modo de desenvolvimento;
  * A estilização foi feita para ser um aplicativo de celular na resolução 360x640.
  * O projeto está configurado para rodar na porta `http://localhost:3000/`.

  <h4>Testes:</h4>

  * `npm run test` na pasta 'backend' para rodar os testes.

  <h4>Banco de dados:</h4>

  * Alguns usuários, contas e transações já foram criadas nos seeders.
  
  <h5>Exemplos:</h5>

  * username: Fabio
  * password: 123Senha

  * username: Joao
  * password: 123Senha

</details>

<details>
  <summary><strong>Tecnologias utilizadas</strong></summary>

  <h4>Geral:</h4>

  <ul>
    <li>Docker</li>
    <li>Docker Compose</li>
  </ul>

  <h4>Backend:</h4>

  <ul>
    <li>Node.js</li>
    <li>TypeScript</li>
    <li>Express</li>
    <li>Sequelize</li>
    <li>PostgreSQL</li>
    <li>JWT</li>
    <li>BCrypt</li>
    <li>Postman</li>
  </ul>

  <h4>Frontend:</h4>

  <ul>
    <li>React</li>
    <li>Context</li>
    <li>Styled Components</li>
  </ul>

  <h4>Testes:</h4>

  <ul>
    <li>Chai</li>
    <li>chaiHttp</li>
    <li>Sinon</li>
    <li>Mocha</li>
  </ul>

</details>

<details>
  <summary><strong>Melhorias</strong></summary>

  - Implementar testes unitários;

</details>
