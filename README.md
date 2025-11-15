# Desafio Auvo: Automação de Testes Web com Playwright

Este repositório contém uma Prova de Conceito (POC) de automação de testes web para o site SauceDemo, como parte do desafio técnico da Auvo.

O projeto utiliza Playwright e JavaScript para validar o fluxo completo de compra de ponta a ponta (E2E) e testes de componentes, seguindo a arquitetura Page Object Model (POM).

## 🛠️ **Tecnologias Utilizadas**

<img width:25 height:18 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" /> Framework de Teste: Playwright.

<img width:25 height:18 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" /> Linguagem: JavaScript.

<img width:25 height:18 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" /> Gestor de Pacotes: npm.

📂 Arquitetura: Page Object Model (POM).

## 🚀 **Configuração e Setup**

***Para executar este projeto localmente, siga os passos abaixo.***

**Pré-requisitos**

<img width:25 height:18 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" /> Node.js (versão 18 ou superior)

<img width:25 height:18 src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original.svg" /> npm (geralmente instalado com o Node.js)

## **Passos de Instalação**

Clone o repositório:

*git clone https://github.com/itaylor333/auvo-challenge-playwright.git*

Navegue até o diretório:

*cd nome-da-pasta-do-projeto*

Instale as dependências do Playwright:

*npm install*

Instale os navegadores do Playwright:

*npx playwright install*

## 🏁 **Execução dos Testes**

### O projeto está configurado para executar os testes de várias formas.

**1 - Executar todos os testes (Modo Headless)**
Este é o comando padrão para execução em pipeline ou para verificar todos os testes.
*npx playwright test*

**2 - Executar os testes em Modo Interativo (UI)**
O Playwright UI Mode é excelente para depurar e ver a execução passo a passo.
*npx playwright test --ui*

**3 - Ver o Relatório de Testes**
Após a execução (do comando 1), um relatório HTML é gerado. Use este comando para o abrir no seu navegador:
*npx playwright show-report*

## 🏗️ **Estrutura do Projeto**
**O projeto segue a arquitetura Page Object Model (POM) para garantir manutenibilidade e robustez.**

```

/
├── pages/                # Classes Page Object (POM)
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── ProductDetailsPage.js
│   ├── CartPage.js
│   ├── CheckoutStepOnePage.js
│   ├── CheckoutStepTwoPage.js
│   └── CheckoutCompletePage.js
│
├── tests/                # Ficheiros de especificação de teste
│   ├── login.spec.js     # Testes de unidade/componente para o Login
│   ├── products.spec.js  # Testes de unidade/componente para Produtos (filtro, etc.)
│   └── e2e-flow.spec.js  # Teste E2E do fluxo de compra completo
│
└── playwright.config.js  # Ficheiro de configuração do Playwright

```

## 📝 **Suposições e Decisões de Design**

Durante o desenvolvimento, algumas decisões foram tomadas para cumprir os requisitos do desafio:

Arquitetura POM: Todos os seletores (locators) e métodos de interação com a página estão encapsulados nas classes do diretório /pages. Os ficheiros /tests contêm apenas a lógica de asserção (o expect) e a orquestração dos testes.

Estratégia de Seletores: Foi dada prioridade total ao uso de seletores data-test (ex: [data-test="username"]), pois são os mais robustos e resilientes a mudanças na UI.

Cobertura (Passo 2 - Pesquisa): O site não possui um campo de "pesquisa" de produtos. Para cumprir este requisito, foi implementado um teste no products.spec.js que valida a funcionalidade de Filtro/Ordenação (ex: "Price (high to low)"), que é a funcionalidade equivalente.

Sincronização: Em vez de usar esperas forçadas (waitForTimeout), foram usadas asserções de estado do Playwright (ex: await expect(this.cartBadge).toHaveText('1')) para garantir que a UI estava atualizada antes de o teste prosseguir.

##  **Separação dos Testes:** 

O desafio foi dividido em:

Testes de Componente (login.spec.js, products.spec.js): Testam funcionalidades isoladas (login falha, filtro funciona, etc.).

Teste E2E (e2e-flow.spec.js): Valida o "caminho feliz" do fluxo de compra completo, conforme descrito nos 5 passos do desafio.