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