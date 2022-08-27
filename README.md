# Teste-Tunts.Rocks
Teste de programação como requisito avaliativo para vaga de estágio na empresa Tunts.Rock.

Para realização desta aplicação foi realizado o consumo da API REST https://restcountries.com/#api-endpoints-v3-all e criação de arquivo formato .xlsx com dados importados desta API REST. 
## Instalação e execução da aplicação
Execultar na seguinte sequência os comandos no terminal da aplicação:  npm install e npm start

npm install - Para instalação dos pacotes e bibliotecas utilizado na aplicação (axios, ejs, excel4node, express, nodemon, path) conforme definidos no arquivo package.json.

npm start - Para execução da aplicação através do nodemon.

## Rotas
### GET /
Esta rota é responsável por fazer o consumo da API EndPoint V3 https://restcountries.com/v3.1/all, tratar os dados importados do EndPoint de acordo com cada país (name, capital, area e currency) e enviar estes dados para a view engine EJS para renderização na homepage da aplicação.
### GET /excel
Esta rota é responsável por fazer o consumo da API EndPoint V3 https://restcountries.com/v3.1/all, tratar os dados importados do EndPoint de acordo com cada país (name, capital, area e currency) e posteriormente criar uma tabela em arquivo formato .xlsx através da biblioteca excel4node com os dados importados e tratados do EndPoint especificado (Arquivo criado na raiz do da aplicação).
