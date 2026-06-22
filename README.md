# 📱 Pokédex

> Trabalho Acadêmico desenvolvido com **React Native** + **Expo**

---

## 📖 Sobre o Projeto

Aplicativo mobile de Pokédex desenvolvido como trabalho acadêmico, permitindo visualizar uma lista de Pokémons e consultar os detalhes de cada um. O app consome a [PokéAPI](https://pokeapi.co/) e foi construído com React Native usando Expo.

---

## 🚀 Tecnologias

- [React Native](https://reactnative.dev/) `0.81.5`
- [Expo](https://expo.dev/) `~54.0.34`
- [TypeScript](https://www.typescriptlang.org/) `~5.9.2`
- [React Navigation (Stack)](https://reactnavigation.org/) `^7`
- [Expo Google Fonts](https://github.com/expo/google-fonts) — Science Gothic & Press Start 2P

---

## 📂 Estrutura do Projeto

```
Pokedex/
├── assets/                  # Imagens e recursos estáticos
├── src/
│   └── app/
│       └── screens/
│           ├── pokemon.tsx          # Tela principal — lista de Pokémons
│           └── pokemonDetails.tsx   # Tela de detalhes do Pokémon
├── App.tsx                  # Configuração de rotas e navegação
├── index.ts                 # Entry point
├── app.json                 # Configurações do Expo
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [Expo CLI](https://docs.expo.dev/get-started/installation/) instalado globalmente
- Expo Go instalado no celular (ou emulador configurado)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/NezyMZ/Pokedex.git

# Acesse a pasta
cd Pokedex

# Instale as dependências
npm install
```

### Executando

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios

# Rodar no navegador
npm run web
```

---

## 📱 Telas

| Tela | Descrição |
|------|-----------|
| **Pokédex** | Lista todos os Pokémons disponíveis via PokéAPI |
| **Detalhes** | Exibe informações detalhadas do Pokémon selecionado |

---

## 🎨 Design

- Tema vermelho Pokémon (`#C62828` / `#D32F2F`)
- Fonte **Science Gothic Bold** nos cabeçalhos
- Fonte **Press Start 2P** para elementos decorativos

---

## 📦 Principais Dependências

| Pacote | Versão |
|--------|--------|
| expo | ~54.0.34 |
| react-native | 0.81.5 |
| @react-navigation/stack | ^7.10.3 |
| react-native-gesture-handler | ~2.28.0 |
| @expo-google-fonts/science-gothic | ^0.4.0 |
| @expo-google-fonts/press-start-2p | ^0.4.1 |

---

## 👤 Autor

**NezyMZ** — [GitHub](https://github.com/NezyMZ)
**NikolasGuerra** — [GitHub](https://github.com/NikolasGuerra)
**AlmirAcacio** — [GitHub](https://github.com/AlmirAcacio)

---

## 📄 Licença

Este projeto é de uso acadêmico.
