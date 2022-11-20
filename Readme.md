# Boas-vindas ao repositório do projeto `Desafio NG.CASH`!

<details>
  <summary><strong>Proposta</strong></summary><br />

  Estruturar uma aplicação web fullstack, dockerizada, cujo objetivo seja possibilitar que usuários da NG consigam realizar transferências internas entre si.

  No backend, devem ser implementadas rotas para login, cadastro, conferência de saldo disponível, transfências entre contas e busca por data e/ou entrada e saída de valores.

  No frontend, devem ser implementadas telas para login, cadastro e uma tela com seção para realizaçãp das transferências, bem como uma tabela com todas as transferências realizadas. Também deve ser possível filtrar por data e/ou entrada e saída de valores.

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
  * `npm run compose:up` na raiz do projeto para rodar o container;

  - Backend:

  * `npm install` na pasta 'backend' para instalar as dependências;
  * `npm run dev` na pasta 'back end' para rodar o servidor em modo de desenvolvimento;
  * `npm start` nas pasta 'back end' para rodar o servidor em modo de produção;
  * O projeto está configurado para rodar na porta `http://localhost:3001/`.  
  * Uma documentação do projeto em backend está disponível em `https://documenter.getpostman.com/view/21539124/2s8YmSrL7v`.

  - Frontend:

  * `npm install` na pasta 'frontend' para instalar as dependências;
  * `npm start` na pasta 'frontend' para rodar o servidor em modo de desenvolvimento;
  * O projeto está configurado para rodar na porta `http://localhost:3000/`.

</details>

<details>
  <summary>Tecnologias utilizadas</summary>

  - Geral:

  <ul>
    <li>Docker</li>
    <li>Docker Compose</li>
  </ul>

  - Backend:

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

  - Frontend:

  <ul>
    <li>React</li>
    <li>Context</li>
    <li>Styled Components</li>
  </ul>

</details>

<details>
  <summary>Melhorias></summary>

  - Implementar testes unitários;
  - Implementar testes de integração; 

</details>
