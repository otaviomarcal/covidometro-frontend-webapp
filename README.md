# Covidômetro - Frontend WebApp

O **Covidômetro** é uma aplicação web que permite aos usuários visualizarem dados da pandemia de COVID-19, como o número de casos confirmados, mortes, e taxas de fatalidade em diferentes países.A interface é construída em **Vue 3**, **TypeScript** e **SCSS**, usando **Vite** como bundler.

## Funcionalidades Principais

- Exibição de dados relacionados à COVID-19 por país até a data de **16/04/2020** (Que a API disponibiliza).
- Busca por países. (Suporte para nomes em português com tradução para inglês ao fazer a busca).
- Filtros para ordenar a lista de países por nome ou número de mortes (crescente e decrescente).
- Dados buscados de uma API pública da COVID-19. (https://covid-api.com/api/)

## Requisitos

- Node.js >= 22.x
- Yarn >= 1.x

## Instalação

### Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/covidometro-frontend-webapp.git
cd covidometro-frontend-webapp
```

### Instalar Dependências

```bash
yarn install
```

## Configuração do Projeto

A configuração do projeto usa **Vite** e **Vue 3**.

### Compilar e Rodar no Modo de Desenvolvimento

Esta configurado no **_package.json_** para rodar na porta 3000

```bash
yarn dev
```

### Teste (Vitest)

```bash
yarn test
```


### Compilar para Produção

```bash
yarn build
```

### Linting com [ESLint](https://eslint.org/)

```bash
yarn lint
```
