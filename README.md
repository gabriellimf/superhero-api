## Requisitos para rodar o projeto
- Node v18 ou superior
- NestJs CLI
- PostgreSQL
- MongoDB Local ou Cluster configurado no MongoDB Atlas
- Preencher o .env com base no .env.example

## Instalação

```bash
$ npm install
```

## Rodando o aplicataivo

```bash
# este comando cria os schemas necessários
$ npm run migrate

# este comando popula o banco de dados com o sample
$ npm run seed

# este comando faz o build da aplicação
$ npm run build

# este comando inicia a aplicação em modo de produção
$ npm run start:prod
```

## Test

```bash
# rodar os testes
$ npm run test
```

## Documentação
- A documentação dessa API está acessível ao iniciar a aplicação e acessar a rota: localhost:3000/api

### Endpoints que podem ser melhor visualizados no Swagger:
`/superhero`
`/superpower`
`/hero-attribute`
`/battle`
`/users`
`/auth/login`

### Como implementar a aplicação em um serviço em nuvem: Heroku

### Passo 1: Configurar MongoDB Atlas
1. **Criar um Cluster:**
   - Clique em "Build a Cluster".
   - Escolha as configurações.
   - Clique em "Create Cluster".

2. **Configurar Usuário do Banco de Dados:**
   - Após o cluster ser criado, clique em "Database Access" no menu à esquerda.
   - Clique em "Add New Database User".
   - Crie um novo usuário com um nome de usuário e senha.

3. **Configurar Regras de Rede:**
   - Clique em "Network Access" no menu à esquerda.
   - Clique em "Add IP Address".
   - Adicione seu endereço IP atual ou permita acesso de qualquer IP (0.0.0.0/0) para fins de desenvolvimento. Para produção, é recomendado restringir a um conjunto específico de IPs.

4. **Obter a String de Conexão:**
   - Clique em "Clusters" no menu à esquerda.
   - Clique no botão "Connect" ao lado do seu cluster.
   - Selecione "Connect your application".
   - Copie a string de conexão fornecida, que será semelhante a esta:
     ```
     mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     ```

### Passo 2: Configurar o Projeto NestJS para o Heroku

1. **Crie um arquivo `Procfile`:**
   - No diretório raiz do seu projeto NestJS, crie um arquivo chamado `Procfile` com o seguinte conteúdo:
     ```plaintext
     web: npm run start:prod
     ```

2. **Adicionar Variáveis de Ambiente:**
   - Crie um arquivo `.env` no diretório raiz do seu projeto e adicione as variáveis de ambiente, incluindo a string de conexão do MongoDB Atlas:
     ```plaintext
     MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     JWT_SECRET=your_jwt_secret
     ```

### Passo 3: Deploy no Heroku

1. **Instalar o Heroku CLI:**
   - Se você ainda não tem o Heroku CLI instalado, instale-o seguindo as instruções em [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. **Faça login no Heroku:**
   - No terminal, execute:
     ```bash
     heroku login
     ```

3. **Crie um Novo Aplicativo no Heroku:**
   - No terminal, navegue até o diretório raiz do projeto NestJS e execute:
     ```bash
     heroku create superhero-api
     ```

4. **Adicionar Variáveis de Ambiente ao Heroku:**
   - Configure as variáveis de ambiente no Heroku para incluir a string de conexão do MongoDB Atlas e outras variáveis necessárias:
     ```bash
     heroku config:set MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
     heroku config:set JWT_SECRET=your_jwt_secret
     ```

5. **Deploy do Projeto no Heroku:**
   - Adicione o repositório remoto do Heroku ao seu repositório Git existente:
  ```
  git remote add heroku https://git.heroku.com/superhero-api.git
  ```
  - Faça push do código para o Heroku:
  ```
  git push heroku master
  ```

## Como implantar o serviço em Docker:
- Antes de começar, você precisa ter o Docker e o Docker Compose instalados em sua máquina. As instruções dependem do sistema operacional que você está usando.

### Dockerfile 

1. Crie um arquivo chamado Dockerfile na raiz do projeto
2. Defina a imagem a ser utilizada para construir a aplicação
3. Defina o diretório de trabalho dentro do contêiner. Todos os comandos serão executados nessa pasta
4. Copie os arquivos package.json para o diretório de atual no docker
5. Execute o comando `npm install` para instalar as dependências do projeto, definidas no package.json
6. Copie todos os arquivos e diretórios do diretório atual local para o diretório de trabalho no contêiner
7. Executa o comando de build da aplicação que compila o código para uma versão que pode ser usada em produção
8. Informe ao Docker em qual porta o contâiner vai escutar
9. Defina o comando padrão a ser executado quando o docker é iniciado. 

Exemplo:
```
FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
```

### docker-compose.yml
2. **`services:`**: Define os serviços que vão ser gerenciados pelo compose

3. **Dentro de `app`:**
   - **`container_name: nestjs_app`**: Define o nome do docker
   - **`build:`**: Define as configurações para construir a imagem do docker a partir do Dockerfile
   - **`ports:`**: Mapeia a porta do docker para a porta selecionada
   - **`volumes:`**: Monta volumes no docker
   - **`environment:`**: Define as variáveis de ambiente necessárias para a aplicação

4. **Dentro de `db`:**
   - **`image: postgres`**: Usa a imagem oficial do PostgreSQL
   - **`container_name: postgres_db`**: Define o nome do contêiner do banco de dados
   - **`environment:`**: Configura o PostgreSQL com as variáveis de ambiente
   - **`ports:`**: Mapeia a porta 5432 do docker para a mesma porta local
   - **`volumes:`**: Mantem os dados do PostgreSQL em um volume

5. **Dentro de `mongo`:**
   - **`image: mongo`**: Usa a imagem oficial do MongoDB.
   - **`container_name: mongo_db`**: Define o nome do docker
   - **`environment:`**: Configura o MongoDB com as variáveis de ambiente
   - **`ports:`**: Mapeia a porta 27017 do docker para a mesma porta local
   - **`volumes:`**: Mantem os dados do MongoDB em um volume

Exemplo citado:

```
services:
  app:
    container_name: nestjs_app
    build:
      context: .
    ports:
      - "3000:3000"
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules
    environment:
      - TYPEORM_CONNECTION=${TYPEORM_CONNECTION}
      - TYPEORM_HOST=${TYPEORM_HOST}
      - TYPEORM_PORT=${TYPEORM_PORT}
      - TYPEORM_USERNAME=${TYPEORM_USERNAME}
      - TYPEORM_PASSWORD=${TYPEORM_PASSWORD}
      - TYPEORM_DATABASE=${TYPEORM_DATABASE}
      - JWT_SECRET=${JWT_SECRET}
      - MONGO_URI=${MONGO_URI}
    depends_on:
      - db
      - mongo

  db:
    image: postgres
    container_name: postgres_db
    environment:
      POSTGRES_DB: ${TYPEORM_DATABASE}
      POSTGRES_USER: ${TYPEORM_USERNAME}
      POSTGRES_PASSWORD: ${TYPEORM_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  mongo:
    image: mongo
    container_name: mongo_db
    environment:
      MONGO_INITDB_DATABASE: superheroApiLogs
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

volumes:
  postgres_data:
  mongo_data:
```

## Como configurar o projeto com integração contínua

- O ideal quando vamos trabalhar com integração contínua em um framework tão bem estruturado e completo quanto o NestJs, é seguir o padrão indicado em sua documentação.
Dito isso, a base dessas instruções podem ser encontradas em [CI/CD integration](https://docs.nestjs.com/devtools/ci-cd-integration).

1. Devemos configurar o nosso main.ts que contem nosso bootrstap file para usar a `GraphPublisher` class exportada de `@nestjs/devtools-integration`. Podemos usar o exemplo da documentação para nos auxiliar com isso, implementando a classe em nosso já existente arquivo.
```
async function bootstrap() {
  const logger = new Logger('bootstrap');
  const shouldPublishGraph = process.env.PUBLISH_GRAPH === "true";

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    preview: shouldPublishGraph,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('SuperHero API')
    .setDescription('API for managing superheroes and their attributes.')
    .setVersion('1.0')
    .addTag('superhero')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (shouldPublishGraph) {
    await app.init();

    const publishOptions = {
      apiKey: process.env.DEVTOOLS_API_KEY,
      repository: process.env.REPOSITORY_NAME,
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      sha: process.env.COMMIT_SHA,
      target: process.env.TARGET_SHA,
      trigger: process.env.GITHUB_BASE_REF ? 'pull' : 'push',
      branch: process.env.BRANCH_NAME,
    };

    const graphPublisher = new GraphPublisher(app);
    await graphPublisher.publish(publishOptions);

    await app.close();
    logger.log('Dependency graph published successfully');
  } else {
    await app.listen(3000);
    logger.log('Application listening on port 3000');
  }
}

bootstrap();

```

- Adicionei o GraphPublisher e a lógica para verificar se a variável de ambiente PUBLISH_GRAPH está configurada para "true". Isso determina se o gráfico deve ser publicado (durante o workflow de CI/CD).

2. Vamos criar um novo GitHub Workflow, basta criar um diretório `.github/workflows` na raiz do nosso projeto.

3. Podemos criar uma arquivo com qualquer nome, nesse caso vamos usar o nome recomendado na doc para melhor entendimento: `publish-graph.yml`

4. Definimos o nosso workflow do GitHub Actions para integrar com o Devtools do NestJs:
```
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - '*'

```
Nessa primeira parte, basicamente especificamos o trigger pro workflow ser acionado.

```
jobs:
  publish:
    if: github.actor != 'dependabot[bot]'
    name: Publish Dependency Graph
    runs-on: ubuntu-latest
```
Aqui definimos os jobs a serem executados e colocamos uma condição para evitar execuções automáticas do bot do NestJs.

```
steps:
  - uses: actions/checkout@v3
  - uses: actions/setup-node@v3
    with:
      node-version: '18'
      cache: 'npm'
  - name: Install dependencies
    run: npm ci
  - name: Setup Environment (PR)
    if: ${{ github.event_name == 'pull_request' }}
    shell: bash
    run: |
      echo "COMMIT_SHA=${{ github.event.pull_request.head.sha }}" >> $GITHUB_ENV
  - name: Setup Environment (Push)
    if: ${{ github.event_name == 'push' }}
    shell: bash
    run: |
      echo "COMMIT_SHA=$GITHUB_SHA" >> $GITHUB_ENV
  - name: Publish Dependency Graph
    run: PUBLISH_GRAPH=true npm run start
    env:
      DEVTOOLS_API_KEY: ${{ secrets.DEVTOOLS_API_KEY }}
      REPOSITORY_NAME: ${{ github.repository }}
      BRANCH_NAME: ${{ github.ref_name }}
      TARGET_SHA: ${{ github.event.pull_request.base.sha }}
```

Neste passo fazemos o checkout do código do repositório, permitindo que ele seja utilizado nos próximos passos. Configuramos o ambiente com a versão especificada do Node.js.
Instalamos as dependências do projeto, utilizando npm ci que é ideal para builds.
Depois, configuramos variáveis de ambiente específicas para pull requests e pushes. Definimos a variável COMMIT_SHA que é usada para rastrear o commit específico sendo construído ou testado.
Depois, executa o comando para iniciar a aplicação com a variável de ambiente PUBLISH_GRAPH definida como true, o que ativa a publicação. As variáveis de ambiente adicionais aqui são configuradas para uso pelo processo de publish graphy.

Idealmente, as variáveis de ambiente devem estar configuradas no GitHub Secrets.

Este workflow será executado para cada solicitação pull direcionada ao branch main OU caso haja um commit direto para o branch main. O que é essencial aqui é que forneçamos as variáveis ​​de ambiente necessárias para nossa classe GraphPublisher (para ser executada).

Por último, vamos até o main.ts de novo e lembre-se de atualizar o publishOptions com o DEVTOOLS_API_KEY se ainda não estiver definido. No nosso caso, criariamos uma variavel de ambiente no .env para isso.

Com esses passos, nossa integração está pronta.