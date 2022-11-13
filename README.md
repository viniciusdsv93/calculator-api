## API com Node, Typescript, Express, MariaDB aplicando TDD, Clean Archtecture e SOLID principles para conversão e cálculo de expressões matemáticas

### Construído com

-   Node
-   Typescript
-   Express
-   MariaDB

API desenvolvida com Node, Express e Typescript.

Por meio da API, são disponibilizados recursos para as operações de conversão e cálculo de expressões matemáticas e persistência dos dados da requisição no banco de dados e também para listagem de todas as requisições persistidas, com seus resultados.

<!-- Foi realizada a documentação via Swagger, conforme a imagem acima, que pode ser acessada
pelo endpoint "/api-docs". -->

Por meio do endpoint "/calculate", utilizando-se o método HTTP POST, o usuário deve encaminhar no corpo da requisição obrigatoriamente um campo "mathExpression", caso contrário é retornada uma resposta com status code 400, BAD REQUEST, por motivo de ausência de campo obrigatório ("Missing Param: mathExpression").

Caso seja fornecida uma expressão matemática no campo, esta é repassada pelo controller ao calculateMathExpressionUseCase, que realizará a operação, gerará um ID único, e chamará o calculateMathExpressionRepository para persistência no banco de dados.

Em caso de sucesso, é retornada uma resposta ao usuário com status code 201, CREATED, com os dados da operação, incluindo a expressão matemática enviada, o resultado após o cálculo e a data de realização.

Na hipótese de ocorrência de algum erro, é retornada uma resposta de status code 500, INTERNAL SERVER ERROR, com a stack de onde houve o erro.

Por fim, também foi disponibilizado o endpoint "/results", via método HTTP GET, que retornará a listagem com todos os resultados cadastrados no banco de dados. A lista retornada contém objetos com as seguintes propriedades: id, mathExpression, result, date. 

### Aplicação do TDD (Test-Drive-Development)

Para construção da API foi aplicado o TDD, realizando testes unitários para garantir as funcionalidades dos componentes do sistema, sendo que os arquivos de testes foram alocados próximos dos arquivos de suas implementações.

É possível executar o comando "npm run test:ci" para executar todos os testes e ao final verificar o percentual de cobertura de testes da aplicação inteira.

### Aplicação da Clean Archtecture

Para estruturação das camadas da API, foram aplicados os princípios da Clean Archtecture desenvolvida por Robert Martin a fim de segregar os componentes em camadas com o intuito de reduzir o acoplamento entre elas.

Na camada mais interna, há o diretório "domain", onde está a modelagem da entidade referente ao resultado a ser persistido no banco de dados ("/domai/models/mathResult.ts"), exportado pela interface MathResultModel.

No mesmo diretório "domain", na subpasta "useCases", há a definição das interfaces dos casos de uso, responsáveis por realizar operações com as entidades na camada de domínio.

Na camada acima, dentro da pasta "data", em "useCases", há a implementação das interfaces dos casos de uso, sendo um para a efetiva realização da operação matemática e sua persistência no banco de dados, e outro para a obtenção da listagem de operações persistidas.

Ainda em "data", há a pasta "protocols", onde estão definidas as interfaces dos repositórios, ou seja, das classes responsáveis pela persistência e manipulação do banco de dados.

Após a camada de casos de uso, há a camada de "presentation", onde se situam os "controllers", que intermediam as requisições e respostas vindas do exterior da aplicação, delegando as operações e retornando uma resposta ao usuário.

Nesta camada, há a pasta "presentation", e a subpasta "controllers", onde constam os controladores responsáveis por validar os campos obrigatórios da requisição, caso houver, delegar as atividades aos respectivos casos de uso acima, e formatar a resposta para o usuário em caso de sucesso ou de falha.

Mais externamente, há a camada de "infra", onde se situam os componentes de mais "baixo-nível" da aplicação.

É nesta camada ("/infra/db/mariadb") onde foi implementado o banco de dados MariaDB para implementação das interfaces dos repositórios.

Por último, há a camada principal ("main"), onde está configurada a aplicação e são instanciadas e injetadas as dependências das implementações das outras camadas.

Há também a implementação de "adapters" para adaptar requisições e respostas do formato do framework "Express" para um formato menos específico, que será encaminhado para as camadas mais internas da aplicação, evidenciando que o framework utilizado não é conhecido pelas camadas e mais "alto-nível".

Nesta camada, é configurada a classe de inicialização da aplicação, utilizando o framework "Express", localizada em "/main/config/app.ts", sendo as rotas definidas na pasta "routes".

### Aplicação dos SOLID principles

Os SOLID principles consistem em práticas consolidadas no âmbito da programação orientada a objetos visando a construção de aplicações com menor acoplamento e maior coerência.

No caso desta aplicação, foram aplicados em maior grau os princípios Single Responsability, Liskov Substitution e Dependency Inversion.

O princípio Single Responsability defende que cada classe possua apenas uma razão para ser modificada, ou seja, que possua uma única responsabilidade, e foi com base nisso que se optou por dividir cada funcionalidade da aplicação em um caso de uso distinto, que, se for o caso.

No caso da persistência, essa responsabilidade ficou apenas com os repositórios, de modo que quando necessário os casos de uso apenas chamarão a implementação dos repositórios, que cuidarão da persistência e acesso ao banco de dados.

Dessa forma se reduz o acoplamento e facilita a manutenibilidade do sistema.

Quanto aos princípios Liskov Substitution e Dependency Inversion, ambos buscam alcançar um menor desacoplamento entre componentes da aplicação, isso porque o primeiro defende que seja possível trocar implementações de mais baixo-nível sem que isso comprometa a funcionalidade mais alto-nível, enquanto que o segundo recomenda que os componentes de mais alto-nível dependam apenas da abstração de componentes de baixo-nível, e não de suas implementações.

No caso, as classes dos controllers e useCases possuem dependências, que são injetadas por seus construtores, sempre como interfaces.

Dessa forma, é possível alterar a implementação destas interfaces no momento de injetar a dependência sem que isso comprometa a funcionalidade dos componentes de mais alto-nível, já que todas as implementações obrigatoriamente seguirão a definição da interface, reduzindo acoplamento. 

## Execução

<!-- Foi realizado o deploy da aplicação em cloud na plataforma Heroku, por meio do link:
https://reservas-hotel-api.herokuapp.com/api-docs/ -->

Para executar a aplicação localmente, é preciso primeiro iniciar o container docker com a
instância do MariaDB, onde são persistidos os dados.

Para isso é preciso, com o docker em funcionamento, executar no terminal o comando "docker run --name calculator-mariadb -p 3306:3306 --env MARIADB_USER=root --env MARIADB_PASSWORD=password --env MARIADB_ROOT_PASSWORD=password --env MARIADB_DATABASE=calculator-mariadb -d mariadb:latest".

Após, será necessário executar "docker start calculator-mariadb" no terminal para iniciar o container.

Após, é preciso executar "npm install" para instalar todas as dependências.

Para executar a aplicação em modo de produção, é preciso executar "npm run build" para
executar a transpilação do projeto de Typescript para Javascript, e então executar "npm
start".

## Autor

-   GitHub - Vinícius dos Santos Verissimo (https://github.com/viniciusdsv93)
