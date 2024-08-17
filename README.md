<!--toc:start-->

- [TypeScript Learning](#typescript-learning)
- [Parte 1/2: TypeScript for JavaScript Programmers](#parte-12-typescript-for-javascript-programmers)
  - [Types by Inference](#types-by-inference)
  - [Defining Types](#defining-types)
  - [Composing Types](#composing-types)
    - [Unions](#unions)
    - [literals](#literals)
- [Parte 2/2: The TypeScript Handbook](#parte-22-the-typescript-handbook)
- [Bibliografia](#bibliografia)
<!--toc:end-->

# TypeScript Learning

![ts banner (source: unknown)](https://github.com/divertimentos/typescript-learning/blob/main/media/ts-banner.jpeg)
(Source: unknown)

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

É possível atribuir tipos a métodos de Classes também:

```typescript
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1); // passando os parâmetros para a classe conforme os tipos esperados, `string` e `number`
```

(Posso estar errado, mas pareceu redundante o uso do TS para OOP)

Ao criar funções, podemos fazer type annotations:

```typescript
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  // ...
}
```

No segundo exemplo, ficou claro que é como se declara uma função sem parâmetros usando o enforçamento de tipos da interface declarada anteriormente. Só não entendi no que isso será útil.

## Composing Types

No TS podemos criar tipos complexos usando _unions_ e _generics_.

### Unions

O union é parecido com o que nas PropTypes chamamos de `oneOf`

```typescript
type MyBool = true | false;
```

No caso acima, no entanto, a variável `MyBool` é do tipo `boolean`. É, cada linguagem vai assumir algumas coisas num certo nível de magia — no que, neste caso, não está errado de forma alguma.

Mas, antes de prosseguir, uma breve contextualização sobre `literals`.

### literals

Quando você atribui uma string a uma variável usando `let` e, posteriormente, sobre-escrever o valor por outra string, assume-se que a variável é do tipo string — o que é óbvio. No entanto, se você atribuir um valor, por exmeplo "helloWorld" a uma `const` chamada `greeting`, por exemplo (`const greeting = "helloWorld"`), dada a impossibilidade dessa `const` ter seu valor sobre-escrito, seu tipo não é mais `string`, e sim o literal `helloWorld`.

# Parte 2/2: The TypeScript Handbook

# Bibliografia

- [Literal Types in TS](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
