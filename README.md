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

## 🧠 Decisões Arquiteturais e Implementação

Para garantir um código limpo, escalável e de fácil manutenção, o projeto foi estruturado utilizando o padrão **Controller-Repository**. Abaixo detalho as decisões tomadas em cada etapa do desenvolvimento:

### 1. Identificação das Funções
As funções foram identificadas a partir da necessidade de um CRUD completo para o gerenciamento de estoque, somadas a regras de negócio específicas:
* **CRUD Básico:** Foram implementadas funções para criar (`createCalcado`), listar todos (`getAllCalcado`), atualizar (`updateCalcado`) e deletar (`deleteCalcado`).
* **Regras de Negócio (Filtros e Métricas):** Identificou-se a necessidade de buscar produtos por características específicas (tamanho e marca). Além disso, foi criada a função `getTotalEstoque` para fornecer uma visão gerencial de quantos pares existem no total, utilizando as funções de agregação do banco de dados.

### 2. Decisões de Arquitetura e Bibliotecas
* **Separação de Responsabilidades:** A escolha de separar as Rotas, os Controladores e os Repositórios serve para isolar a lógica de negócio da lógica de acesso a dados. Se no futuro o banco de dados mudar, apenas o Repositório precisará ser reescrito, mantendo os Controladores intactos.
* **Prisma ORM:** Escolhido pela excelente integração com TypeScript, garantindo segurança de tipagem (Type Safety) e facilitando consultas complexas (como a agregação `_sum` para o estoque).

### 3. O que cada etapa do código faz (Fluxo de Requisição)
O fluxo de dados da aplicação segue um padrão rigoroso em todas as rotas implementadas:

1. **Rotas (`routes.ts`):** Intercepta a requisição HTTP (GET, POST, PUT, DELETE) e direciona para o controlador correspondente.
2. **Controladores (`CalcadosController.ts`):** 
   * **Extração:** Coleta os dados do corpo da requisição (`req.body`) ou dos parâmetros da URL (`req.params`).
   * **Validação:** Verifica se os dados obrigatórios foram enviados (ex: barrar a criação de calçados sem preço ou cor) e se os formatos estão corretos (ex: garantir que `id` e `tamanho` sejam números usando `parseInt`).
   * **Chamada e Resposta:** Invoca o Repositório e, ao receber a resposta do banco, formata o retorno para o cliente usando os códigos de status HTTP apropriados (`200`, `201`, `400`, `404`, `500`).
3. **Repositórios (`CalcadoRepositorie.ts`):** Recebe os dados já validados pelo controlador e executa a query direta no banco de dados utilizando os métodos do Prisma (`create`, `findMany`, `update`, `delete`, `aggregate`), retornando o resultado bruto para o controlador.

## 🤖 Uso de Inteligência Artificial no Desenvolvimento

Durante o desenvolvimento deste projeto, ferramentas de Inteligência Artificial (como ChatGPT/Gemini) foram utilizadas de forma estratégica como assistentes de estudo e apoio ao desenvolvimento. O uso se concentrou nas seguintes frentes:

*   **Compreensão Arquitetural:** A IA foi utilizada para discutir e consolidar o entendimento sobre as vantagens de separar a aplicação em **Controller** e **Repository**, garantindo que a implementação fizesse sentido do ponto de vista de boas práticas e manutenibilidade.
*   **Apoio na Codificação:** Em momentos pontuais onde houve dificuldade com a sintaxe de certas funções ou na estruturação de queries mais complexas (como a contagem total de estoque via Prisma), a IA auxiliou na melhoria e otimização do código escrito.
*   **Estruturação da Documentação:** A formatação final e a organização clara e profissional deste próprio `README` contaram com o auxílio da IA para garantir que a comunicação das decisões técnicas fosse precisa e bem estruturada.

O principal objetivo do uso de IA neste projeto foi **educacional**, atuando como um tutor interativo para acelerar o aprendizado, validar conceitos e garantir a entrega de um código limpo e dentro dos padrões de mercado.