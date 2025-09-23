# Teste-Onfly

## Conector n8n - True Random Number Generator

Este repositório contém o código-fonte e a configuração de infraestrutura para um conector personalizado do n8n. O conector, chamado "Random", possui uma única operação, "True Random Number Generator", que busca um número inteiro aleatório a partir da API pública do Random.org.

## Pré-requisitos Técnicos

Antes de iniciar, garanta que você tem os seguintes softwares instalados na sua máquina:

* **Docker e Docker Compose:** Essencial para executar o ambiente do n8n e do banco de dados. A forma mais fácil é instalar o [Docker Desktop](https://www.docker.com/products/docker-desktop/).
* **Node.js e npm:** Necessário para instalar as dependências e compilar o código do conector. Recomenda-se a versão 22 (LTS).

## Como Executar o Projeto

Siga os passos abaixo para compilar o conector e iniciar todo o ambiente localmente.

### 1. Preparar o Conector

Primeiro, precisamos compilar o código-fonte do conector de TypeScript para JavaScript.

Abra um terminal e navegue até a pasta `nodes-n8n`:
```bash
# Exemplo: cd C:\caminho\para\o\projeto\nodes-n8n
cd nodes-n8n
```
Dentro desta pasta, execute os seguintes comandos em sequência:

```bash
# Instala as dependências de desenvolvimento (typescript, shx, etc.)
npm install

# Compila o código. Este comando cria uma pasta 'dist' com o JavaScript final.
npm run build
```
Após a conclusão, confirme que a pasta dist foi criada com sucesso dentro de nodes-n8n.

### 2. Iniciar o Ambiente n8n com Docker

Agora que o conector está compilado, podemos iniciar os serviços do n8n e do Postgres.

Navegue até a pasta infra-n8n:

```bash
# Se estiver na pasta anterior, pode usar: cd ../infra-n8n
cd ../infra-n8n
```
Execute o seguinte comando para iniciar os containers em segundo plano:

```bash
docker-compose up -d
```
Aguarde de 1 a 2 minutos para que o banco de dados e a aplicação n8n sejam totalmente inicializados.

### 3. Testar o Conector

- Acesse a interface do n8n no seu navegador: http://localhost:5678

- Na primeira vez que aceder, o n8n pedirá para criar uma conta de administrador. Crie a sua conta.

- Crie um novo workflow.

- Clique no + para adicionar um nó e, na barra de busca, procure por "True Random Number Generator".

- O conector deve aparecer com um ícone de dois dados vermelhos. Adicione-o ao seu workflow.

- Configure os campos "Valor Mínimo" e "Valor Máximo" e clique em "Execute Node".

- Verifique o resultado na aba "Output".

### Limpando o Ambiente

Quando terminar os testes, você pode parar e remover os containers e a rede com o seguinte comando (execute de dentro da pasta infra-n8n):

```bash
docker-compose down
```

Para remover também os volumes (apagando permanentemente os dados do banco e o login do n8n), use:

```bash
docker-compose down -v
```