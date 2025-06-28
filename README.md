# 🌱 Jogo de Reciclagem - Separe o Lixo!

Um jogo educativo simples e minimalista sobre reciclagem e separação de lixo.

## 📋 Sobre o Jogo

Este é um jogo de arrastar e soltar onde o objetivo é separar corretamente diferentes tipos de lixo nas lixeiras apropriadas. O jogo foi desenvolvido para ensinar sobre reciclagem de forma divertida e interativa.

## 🎮 Como Jogar

1. **Objetivo**: Arraste os itens de lixo que aparecem na tela para a lixeira correta
2. **Tempo**: Você tem 60 segundos para pontuar o máximo possível
3. **Pontuação**: 
   - +10 pontos para cada acerto
   - -5 pontos para cada erro
4. **Lixeiras**:
   - 🗂️ **Azul (Papel)**: Papel, jornal, papelão, caixas
   - 🥤 **Vermelha (Plástico)**: Garrafas PET, embalagens plásticas, sacolas
   - 🍾 **Verde (Vidro)**: Garrafas de vidro, potes, taças
   - 🥫 **Amarela (Metal)**: Latas, ferramentas, moedas
   - 🍎 **Marrom (Orgânico)**: Restos de comida, frutas, folhas

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura da página
- **CSS3**: Estilização e layout responsivo
- **JavaScript**: Lógica do jogo e interatividade
- **Drag and Drop API**: Para a funcionalidade de arrastar e soltar
- **Touch Events**: Suporte para dispositivos móveis

## 📁 Estrutura dos Arquivos

```
jogo_reciclagem/
├── index.html      # Página principal do jogo
├── style.css       # Estilos e layout
├── script.js       # Lógica do jogo
└── README.md       # Este arquivo
```

## 🚀 Como Executar

1. Baixe todos os arquivos para uma pasta
2. Abra o arquivo `index.html` em qualquer navegador web moderno
3. O jogo iniciará automaticamente após alguns segundos

## 📱 Compatibilidade

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móveis (touch screen)
- ✅ Layout responsivo para diferentes tamanhos de tela

## 🎯 Características do Jogo

### Mecânicas
- **Spawn automático**: Novos itens aparecem a cada 2 segundos
- **Timer regressivo**: 60 segundos de duração
- **Feedback visual**: Mensagens de acerto/erro
- **Tela de game over**: Mostra pontuação final
- **Botão reiniciar**: Para jogar novamente

### Design
- **Interface minimalista**: Foco na jogabilidade
- **Cores intuitivas**: Lixeiras com cores padrão de reciclagem
- **Emojis**: Representação visual clara dos itens
- **Animações suaves**: Transições e efeitos hover

### Educativo
- **Tipos de reciclagem**: Ensina as 5 categorias principais
- **Itens variados**: Diferentes exemplos de cada categoria
- **Feedback imediato**: Reforço positivo/negativo instantâneo

## 🔧 Personalização

### Dificuldade
Para tornar o jogo mais fácil ou difícil, você pode modificar no arquivo `script.js`:

```javascript
// Configurações do jogo (linha 2-5)
const GAME_DURATION = 60;        // Duração em segundos
const SPAWN_INTERVAL = 2000;     // Intervalo entre itens (ms)
const POINTS_CORRECT = 10;       // Pontos por acerto
const POINTS_INCORRECT = -5;     // Pontos por erro
```

### Novos Itens
Para adicionar novos tipos de lixo, edite o objeto `trashTypes` no arquivo `script.js`:

```javascript
const trashTypes = {
    papel: [
        { emoji: '📄', name: 'Papel' },
        // Adicione novos itens aqui
    ],
    // ... outras categorias
};
```

## 📚 Conceitos de Programação Demonstrados

Este jogo é uma excelente base para aprender:

1. **Manipulação do DOM**: Criação e remoção dinâmica de elementos
2. **Event Listeners**: Eventos de mouse e touch
3. **Timers**: setInterval e setTimeout
4. **Arrays e Objetos**: Estruturas de dados para organizar informações
5. **Funções**: Modularização do código
6. **CSS Flexbox**: Layout responsivo
7. **Drag and Drop API**: Interação avançada do usuário
8. **Responsive Design**: Adaptação para diferentes dispositivos

## 🌟 Possíveis Melhorias

- Sistema de níveis com dificuldade crescente
- Sons e efeitos sonoros
- Animações mais elaboradas
- Sistema de conquistas/badges
- Modo multiplayer
- Estatísticas detalhadas
- Diferentes temas visuais

---

**Desenvolvido como exemplo educativo de jogo web sobre sustentabilidade e reciclagem.**

