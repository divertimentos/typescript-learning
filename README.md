# Typescript Learning

O TypeScript é um superset do JavaScript, o que significa que ele possui todas as features do JS, mais as suas próprias. Especificamente, o que o TS adiciona é uma lógica de tipos.

Seria o TypeScript um PropTypes glorificado? Não, porque, no JS, parâmetro é parâmetro; já no React, parâmetro é prop. É uma questão semântica que afeta a definição do TS em si.

- O objetivo do TS é ser um typechecker (checador de tipos), 100% compatível com ecossistemas JavaScript

# Parte 1/2: TypeScript for JavaScript Programmers

- A única adição que o TS faz sobre o JS é seu sistema de tipos. Seu objetivo é diminuir a quantidade de bugs checando a consistência dos tipos ao longo do código

## Types by Inference

- O TS reconhece e respeita quando o JS gera tipos por inferência, como no exemplo abaixo:

```typescript
let helloWorld = "Oibebe!"; // O TS assume que o tipo da variável é 'string'.
```

## Defining Types

- Uma das formas mais simples de definir tipos em TS é através de uma `interface`. Abaixo, exemplifico o modo inferencial e o modo usando uma interface:

```javascript
// inferencial
const user = {
  name: "Hayes",
  id: 0,
};
```

```typescript
// interface
interface User {
  name: string;
  id: number;
}
```

Em seguida, basta atribuir a interface à `const` na qual você deseja fixar, ao mesmo tempo, suas propriedades e seus tipos:

```typescript
const user: User = {
  name: "Hayes",
  id: 0,
};
```

# Parte 2/2: The TypeScript Handbook
