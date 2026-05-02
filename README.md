# 👟 API de Gerenciamento de Calçados

Esta é uma API RESTful desenvolvida com Node.js, Express e TypeScript para o gerenciamento de um estoque de calçados. A aplicação utiliza o padrão de arquitetura Controller-Repository e integra-se com um banco de dados através do ORM Prisma.

## 🛠️ Tecnologias Utilizadas

* **Node.js** com **Express** (Roteamento e Servidor Web)
* **TypeScript** (Tipagem estática)
* **Prisma ORM** (Modelagem e manipulação do banco de dados)

## 🏗️ Estrutura do Projeto

A lógica da aplicação está dividida em três camadas principais:
* **Rotas (`routes.ts`)**: Define os endpoints da API e mapeia as requisições HTTP para os controladores apropriados.
* **Controladores (`CalcadosController.ts`)**: Gerencia a lógica de requisição e resposta (HTTP), realizando validações de parâmetros e do corpo da requisição.
* **Repositório (`CalcadoRepositorie.ts`)**: Isola a lógica de acesso a dados, utilizando os métodos do Prisma Client (`create`, `findMany`, `aggregate`, `update`, `delete`) para interagir com o banco de dados.

---

## 🚀 Endpoints da API

Abaixo estão detalhadas todas as rotas disponíveis na aplicação. O prefixo base para todas as requisições é `/calcados`.

### 1. Criar um novo calçado
* **Rota:** `POST /calcados`
* **Descrição:** Adiciona um novo modelo de calçado ao estoque.
* **Corpo da Requisição (JSON):**
    ```json
    {
      "nome_produto": "Tênis Esportivo",
      "cor": "Preto",
      "marca": "Nike",
      "tamanho": 42,
      "preco": 299.90,
      "quantidade_em_estoque": 50
    }
    ```
* **Respostas:**
    * `201 Created`: Produto adicionado com sucesso.
    * `400 Bad Request`: Retornado caso falte algum dado obrigatório.
    * `500 Internal Server Error`: Erro interno no servidor.

### 2. Listar todos os calçados
* **Rota:** `GET /calcados`
* **Descrição:** Retorna um array contendo todos os calçados cadastrados no banco de dados.
* **Respostas:**
    * `200 OK`: Retorna a lista de produtos.
    * `404 Not Found`: Retornado caso nenhum produto tenha sido adicionado ainda.

### 3. Buscar calçados por tamanho
* **Rota:** `GET /calcados/tamanho/:tamanho`
* **Descrição:** Filtra e retorna calçados com base na numeração informada na URL.
* **Respostas:**
    * `200 OK`: Retorna os produtos encontrados com o tamanho correspondente.
    * `400 Bad Request`: O tamanho fornecido não é um número válido.
    * `404 Not Found`: Nenhum calçado encontrado com o tamanho especificado.

### 4. Buscar calçados por marca
* **Rota:** `GET /calcados/marca/:marca`
* **Descrição:** Filtra o estoque retornando apenas os calçados de uma marca específica informada na URL.
* **Respostas:**
    * `200 OK`: Retorna a lista de calçados da marca.
    * `400 Bad Request`: Marca não fornecida na requisição.
    * `404 Not Found`: Nenhum calçado da marca solicitada foi encontrado.

### 5. Consultar estoque total
* **Rota:** `GET /calcados/estoque/total`
* **Descrição:** Calcula e retorna a soma total de todos os pares de calçados disponíveis no estoque.
* **Respostas:**
    * `200 OK`: Retorna a contagem total no seguinte formato:
      ```json
      {
        "message": "Contagem de estoque realizada com sucesso.",
        "total_pares_em_estoque": 150
      }
      ```

### 6. Atualizar informações de um calçado
* **Rota:** `PUT /calcados/:id`
* **Descrição:** Atualiza os dados de um calçado existente com base no seu `id`.
* **Respostas:**
    * `200 OK`: Produto atualizado com sucesso.
    * `400 Bad Request`: ID do produto inválido (não numérico).
    * `500 Internal Server Error`: Erro ao atualizar o produto.

### 7. Deletar um calçado
* **Rota:** `DELETE /calcados/:id`
* **Descrição:** Remove um calçado do banco de dados permanentemente utilizando o seu `id`.
* **Respostas:**
    * `200 OK`: Produto deletado com sucesso.
    * `400 Bad Request`: ID do produto inválido.
    * `500 Internal Server Error`: Erro ao deletar o produto.