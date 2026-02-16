# Financial Transaction Manager

Uma aplicação web moderna para gerenciamento de transações financeiras, desenvolvida com Vue 3, TypeScript e Vite.

🔗 **Demo Online:** [https://sidneidarochasilva.github.io/financial-transaction-manager/](https://sidneidarochasilva.github.io/financial-transaction-manager/)

## 🚀 Como Executar

Pré-requisitos: Node.js (versão 18+ recomendada) e npm/yarn/pnpm.

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Rodar servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse `http://localhost:5173` (ou a porta indicada no terminal).

3. **Build para produção:**
   ```bash
   npm run build
   ```

4. **Visualizar build localmente:**
   ```bash
   npm run preview
   ```

## 🛠️ Decisões Técnicas


### 🎨 Arquitetura de Estilos e Design System

Uma das principais decisões arquiteturais foi a separação clara entre a **Aplicação** e o **Design System**.

#### Design System (CSS Puro/Scoped vs Tailwind)
Os componentes base localizados em `src/design-system` (Botões, Inputs, Modals, Cards) foram estilizados utilizando **CSS Scoped** e variáveis CSS nativas, em vez de depender estritamente do Tailwind CSS.

**Por que essa decisão?**
- **Portabilidade:** Ao simular uma biblioteca de componentes externa, o uso de CSS puro garante que esses componentes possam ser consumidos por qualquer projeto, independentemente de ele utilizar Tailwind, Bootstrap ou nenhuma biblioteca de estilos.
- **Desempenho e Isolamento:** Em bibliotecas de componentes externas, o uso de CSS pré-processado ou nativo muitas vezes oferece um desempenho superior e menor *overhead* de processamento no build final do consumidor, além de evitar conflitos de especificidade ou configurações de `tailwind.config.js` divergentes entre a lib e a aplicação host.
- **Manutenibilidade:** Mantém o "Core" visual desacoplado de dependências de utilitários, garantindo que o visual base da marca permaneça consistente.

#### Aplicação (Tailwind CSS)
Para a camada de aplicação (`src/components`, layouts, páginas), utilizamos **Tailwind CSS**.
- **Agilidade:** Permite prototipagem e construção de layouts complexos (Grid/Flexbox) de forma extremamente rápida.
- **Responsividade:** Facilita a criação de interfaces adaptáveis (Mobile/Desktop) com classes utilitárias (`md:`, `lg:`).

### 🏗️ Organização do Código

A arquitetura do projeto segue o padrão de fluxo de dados **Service > Store > View**:

1. **View (Componentes):** Responsável apenas pela apresentação e interação com o usuário. A View **não** acessa os Services diretamente; ela interage exclusivamente com a Store para buscar dados ou disparar ações.
2. **Store (`src/stores/`):** Gerencia o estado global e a lógica de negócios da aplicação. A Store é a única camada a comunicar-se com os Services.
3. **Service (`src/services/`):** Camada de infraestrutura responsável pela comunicação com APIs externas ou persistência de dados.

Estrutura de diretórios principal:
- `src/design-system/`: Componentes visuais "burros" (Dumb Components) e reutilizáveis.
- `src/components/`: Componentes de negócio (Smart Components) que integram o Design System.
- `src/types/`: Definições de tipos TypeScript compartilhados.

### ⚡ Performance e Otimização

#### Renderização de Listas Longas (30.000+ itens)
Para garantir uma experiência fluida mesmo com grandes volumes de dados (requisito de 30.000 transações), implementamos uma estratégia de **Virtual Scrolling (Windowing)** no componente `TransactionList`.

**Como funciona:**
- Em vez de renderizar todos os 30.000 nós no DOM simultaneamente (o que travaria o navegador), renderizamos apenas os itens visíveis na viewport (+ um pequeno buffer).
- Um container com altura total calculada (`totalItems * itemHeight`) mantém a barra de rolagem correta.
- Os itens são posicionados via `transform: translateY` conforme o usuário rola a página.
- **Resultado:** O DOM mantém uma contagem constante e baixa de elementos (ex: ~20 itens), garantindo scroll a **60fps** e baixo consumo de memória, independentemente do tamanho da lista.

### ✨ Funcionalidades e UX

- **Dashboard:** Visão geral com Cards de resumo e Gráfico visual.
- **Lista de Transações:** Scroll virtual (ou paginado) para performance em listas longas.
- **Validação de Formulários:** Feedback visual imediato e validação de tipos (ex: datas, valores monetários).
- **Máscaras de Input:** Campo de valor com formatação monetária automática (R$) para melhor usabilidade.
- **Responsividade:** Layout adaptável para dispositivos móveis e desktop.
