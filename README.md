<!--toc:start-->

- [TypeScript Learning](#typescript-learning)
- [Parte 1/2: TypeScript for JavaScript Programmers](#parte-12-typescript-for-javascript-programmers)
  - [Types by Inference](#types-by-inference)
  - [Defining Types](#defining-types)
  - [Composing Types](#composing-types)
    - [Unions](#unions)
    - [Literals](#literals)
    - [Generics](#generics)
    - [Parâmetros _x_ Argumentos](#parâmetros-x-argumentos)
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

No caso acima, no entanto, a variável `MyBool` é do tipo `boolean`. É, cada linguagem vai assumir algumas coisas num certo nível de magia — o que, neste caso, não está errado de forma alguma.

Mas, antes de prosseguir, uma breve contextualização sobre `literals`.

### Literals

Quando você atribui uma string a uma variável usando `let` e, posteriormente, sobre-escreve o valor por outra string, assume-se que a variável é do tipo string — o que é óbvio. No entanto, se você atribui um valor, por exmeplo "helloWorld" a uma `const` chamada `greeting`, por exemplo (`const greeting = "helloWorld"`), dada a impossibilidade dessa `const` ter seu valor sobre-escrito, seu tipo não é mais simplesmente `string`, e sim o literal `helloWorld`.

```typescript
let changingString = "Hello World";
changingString = "Olá Mundo"; // <-- o tipo é 'string'

const constantString = "Hello World"; // <-- o tipo é o literal 'Hello World'
```

Voltando aos unions, utilizando o poder dos literals podemos criar um conjunto/set específico de valores imutáveis esperados:

```typescript
type WindowStates = "open" | "closed" | "hidden" | "minimized" | "restored";
type LockStates = "locked" | "unlocked" | "breached";
type PrimeNumbersUnderTen = 2 | 3 | 5 | 7;
```

Podemos usar unions para dizer a uma função que ela pode receber um parâmetro com mais de um tipo possível:

```typescript
// função normal
function getLength() {
  return obj.length;
}

// funcão tipada
function getLength(obj: string | string[]) {
  return obj.length;
}
```

### Generics

_generics_ possibilitam que atribuamos tipos a valores em variáveis. Sendo menos genérico na explicação (_no pun intended_), podemos restringir um array de conter qualquer tipo, para que contenha tipos que esperamos:

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>; // <-- Este último ficou nebuloso. TODO: escrever um exemplo na prática pra entender
```

Usando genéricos, podemos declarar nossos próprios tipos, como esse Backpack:

```typescript
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}
```

Não entendi de primeira a ideia de criar os próprios tipos. Após ler a seção [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) da documentação oficial do TypeScript, entendi melhor.

Uma função que retorna aquilo que é passado para ela é uma função de identidade

```typescript
function identity(arg: number): number {
  return arg;
}
```

No caso da função acima, ela espera um argumento do tipo `number` e (obviamente) também espera retornar um valor do tipo `number`.

Uma função identidade que seja o mais genérica possível ficaria assim:

```typescript
function anyIdentity(arg: any): any {
  return arg;
}
```

Esta aciam espera qualquer tipo e retorna qualquer tipo.

Em vez de esperar qualquer coisa como retorno, podemos capturar o argumento de tal forma que possamos denotar o que será retornado. Ou seja, define o que é retornar de acordo com o que você espera como argumento. Para isso, podemos usar um 'type variable', que é um tipo especial de variável que funciona com tipos em vez de valores. Exemplo abaixo:

```typescript
function genericsIdentity<Type>(arg: Type): Type {
  return arg;
}
```

No exemplo acima, o`<Type>` antes de `()` diz à função o que ela deve esperar como retorno. Já o `Type` antes de `{}` diz à função o tipo que ela espera no retorno.

Segundo o que entendi, o primeiro e o segundo `Type` são redundantes, pois ambos se referem ao tipo do parâmetro que vai ser passado para a função ao chamá-la.

Sabendo disso, podemos chamar essa função de duas formas:

```typescript
// forma um (sendo explícito):
let output = genericsIdentity<string>("myString");

// forma dois (usando inferência):
let output = genericsIdentity("myString");
```

O jeito explícito de chamar a função informa à função que o argument `arg` será do tipo `string`.

Mas, antes, para entender 100% o conceito de _generics_, é necessário não confundir parâmetros e argumentos.

### Parâmetros _x_ Argumentos

Parâmetros são variáveis nomeadas declaradas como **parte de uma função**. Eles são usados para referenciar argumentos passados para a função. Ou seja, quando passamos valores para uma função no momento de sua chamada, estamos passando argumentos.

- Parâmetros são valores usados como referências abstratas na declaração da função
- Argumentos são a materialização de valores passados para a função no momento da chamada

```typescript
// na declaração, parâmetros (valores referenciáveis):
function exampleFunction(par1, par2) {
  return `${par1}, ${par2}!`;
}

const argument1 = "Hello";
const argument2 = "World";

// na chamada, argumentos (valores reais):
exampleFunction(argument1, argument2);
```

- Parâmetros são os nomes listados na definição/declaração da função;
- Argumentos são os valores reais passados para a função (na chamada);
- Parâmetros são inicializados a partir dos valores fornecidos.

Voltando aos generics, se queremos definir uma função que retorne o `.length` de um array de determinado `Type`, precisamos impor alguma restrição para que o compilador reconheça o método.

```typescript
// Então, em vez de:
function loggingIdentity<Type>(arg: Type): Type {
  console.log(arg.length);

  return arg;
}

// Devemos usar:
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length);

  return arg;
}
```

# Bibliografia

- [Literal Types in TS](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Parameter](https://developer.mozilla.org/en-US/docs/Glossary/Parameter)
