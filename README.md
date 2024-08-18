<!--toc:start-->
- [TypeScript Learning](#typescript-learning)
- [Parte 1/2: TypeScript for JavaScript Programmers](#parte-12-typescript-for-javascript-programmers)
  - [Types by Inference](#types-by-inference)
  - [Defining Types](#defining-types)
  - [Composing Types](#composing-types)
    - [Unions](#unions)
    - [Literals](#literals)
    - [_generics_](#generics)
    - [Parâmetros _x_ Argumentos](#parâmetros-x-argumentos)
    - [Structural Type System (aka Duck Typing)](#structural-type-system-aka-duck-typing)
- [Parte (2/2): The TypeScript Handbook](#parte-22-the-typescript-handbook)
  - [The Basics](#the-basics)
  - [Static Type-Checking](#static-type-checking)
  - [Non-exception failures](#non-exception-failures)
  - [Types for Tooling](#types-for-tooling)
  - [Explicit Types](#explicit-types)
  - [Strictness](#strictness)
    - [`noImplicitAny`](#noimplicitany)
    - [`strictNullChecks`](#strictnullchecks)
- [Bibliografia](#bibliografia)
<!--toc:end-->

# TypeScript Learning

![ts banner (source: unknown)](https://github.com/divertimentos/typescript-learning/blob/main/media/ts-banner.jpeg)

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

Ao criar funções, podemos fazer type annotations:

```typescript
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  // ...
}
```

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

### _generics_

**_generics_** possibilitam que atribuamos tipos a valores em variáveis. Sendo menos genérico na explicação (_no pun intended_), podemos restringir um array de conter qualquer tipo, para que contenha tipos que esperamos:

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

Usando **generics**, podemos declarar nossos próprios tipos, como esse Backpack:

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

Esta acima espera qualquer tipo e retorna qualquer tipo.

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

Mas, antes, para entender 100% o conceito de **_generics_**, é necessário não confundir parâmetros e argumentos.

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

Voltando aos _generics_, se queremos definir uma função que retorne o `.length` de um array de determinado `Type`, precisamos impor alguma restrição para que o compilador reconheça o método.

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

A função acima espera como argumento um `Type` cujo valor seja enumerável, pois ela espera como retorno `Array<Type>`. Isso expica por que o compilador aceita o método `.length`. Abaixo outro exemplo do funcionamento dos _generics_, agora usando uma classe.

```typescript
class Victarion<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Victarion<number>(42);
const stringBox = new Victarion<string>("oibebe");
const booleanBox = new Victarion<boolean>(true);

numberBox.getValue(); // 42
stringBox.getValue(); // oibebe
booleanBox.getValue(); // true
```

### Structural Type System (aka Duck Typing)

O TypeScript é adepto do Duck Typing, conceito que diz que se você nada como um pato, nada como um pato, anda como um pato e grasna como um pato, **então você é um pato**. No Duck Typing, se dois objetos possuem o mesmo formato, logo eles são do mesmo tipo.

```typescript
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26 };

logPoint(point); // "12, 26"
```

No exemplo acima, o compilador do TS aceita o parâmetro `p`, que recebe a interface `Point`, pois suas duas propriedades manifestadas através dos argumentos `x` e `y` são do tipo `number`. O duck typing do TS aceita o shape da interface mesmo se ela corresponder a um subconjunto o argumento passado para a função, desde que haja match perfeito:

```typescript
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
logPoint(rect); // logs "33, 3"

const color = { hex: "#187ABF" };
logPoint(color); // xxx erro de missing properties xxx
```

# Parte (2/2): The TypeScript Handbook

## The Basics

- A vantagem do TS sobre o JS é tornar o código mais previsível antes da compilação, no que tange a tipos.

Segundo a documentação oficial, "'tipar' é descrever quais valores podem ser passados para determinada função e quais podem quebrá-la". **Como o JS faz tipagem dinâmica, só é possível descobrir se uma função quebra quando ela quebra**. A vantagem do TS, então, é assegurar a checagem de tipos pré-compilação, através da **tipagem estática**.

## Static Type-Checking

- A checagem de tipos estática é uma ferramenta na escrita de código que se alia aos testes, no sentido de evitar bugs que podemos não ter a sorte de prever ou testemunhar. Erros como o abaixo,

```typescript
message.toLowerCase(); // ✅ --> "hello"

message(); // ❌ --> "This expression is not callable. Type 'String' has no call signatures"
```

em que não sabemos se `message` é uma função, ou mesmo se ela possui o método `toLowerCase()` antes de testarmos na prática.

## Non-exception failures

Um ponto fraco da tipagem estática é não poder prever se uma propriedade existe em um objeto antes de chamá-la. O TS retorna um `undefined` e segue em frente:

```javascript
const user = {
  name: "Morgoth",
  age: 6500,
};

user.location; // returns undefined
```

Já o TS fica bravo:

```typescript
const user = {
  name: "Morgoth",
  age: 6500,
};

user.location; // ❌ --> "Property 'location' does not exist on type '{name: string; age: number;}.'"
```

Reconhecidamente, o fato do JS ignorar erros como esse é uma de suas grandes features e também um de seus Calcanhares de Aquiles. No entanto, o checador de tipos do TS é capaz de encontrar typos (erros de digitação) e também erros de lógica.

```typescript
function flipCoin() {
  return Math.random < 0.5; // ❌ --> Operator '<' cannot be applied to types '() => number' and 'number';
}
```

## Types for Tooling

O TS pode nos ajudar a prevenir erros antes mesmo deles serem escritos. O type-checker nos informa quais são as propriedades possíveis de objetos. Isso é o que os desenvolvedores costumam chamar de o 'tooling do TypeScript'. O seu LSP também faz outras ✨ magias ✨, como quick fixes, refatorações, organização inteligente de código, features de navegação, localização de referências. Quem já utiliza o LSP do TS no VSCode, por exmeplo, tem acesso a algumas dessas features do TS, mesmo que esteja programando dm JavaScript (ou JSX etc.).

```typescript
function greet(person, date) {
  console.log(`Hello, ${person}. Today is ${date}!`);
}

greet("Brendan"); // ❌ --> Expected 2 arguments, but got 1.
```

O TS mostrou esse erro antes mesmo de eu rodar o código. Assim que retornei meu Vim do Insert Mode pro Normal Mode, o checador demonstrou seu poder.

**Agradeça ao TypeScript por existir**.

## Explicit Types

Quando explicitamos os tipos fazendo _type annotations_, estamos usando a feature mais básica do TS, que é dizer para uma função quais tipos de valores ela aceita e retorna. No caso da função `greet()`, munida de tipos ela fica assim:

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello, ${person}. Today is ${date.toDateString()}!`);
}

## Erased Types

Quando usamos o `tsc` para compilar código TS, ele transpila para JS. Nesse processo, boa parte do código TS é apagado e transformado em JS, mas de uma forma que atenda à estrita redução de redundâncias que um código estaticamente tipado requer.

## Downleveling

O transpilador do TS é setado para automaticamente converter o seu código em uma versão do JS que seja o mais compatível possível, ou seja, ES3. Para setar o `tsc` para outra versão do ECMAScript, você pode usar o argumento `--target`: `tsc --target es2015 hello.ts`.

```

## Strictness

É possível configurar a "rigorosidade" (_strictness_) do compilador do TS a fim de que ele atenda aos interesses de diferentes tipos de programador. Você pode ser meramente alguém em busca de uma experiência _opt-in_ de tipagem conforme necessário for, com os benefícios do tooling que a linguagem oferece. E esse perfil de usuário de TS é o mais comum. Conforme dor necessário, você pode ir fazendo um "_dial-in_" nas features através do `tsconfig.json`. Duas configurações de _dial-in_ são as mais importantes, `noImplicitAny` e `strictNullChecks`.

### `noImplicitAny`

Quando não usamos tipos, o TS pode setar `any`, o que corresponderia a basicamente usar JS. Habilitando essa opção, o TS fica mais estrito e vai insistir que você identifique os tipos das variáveis declaradas, a fim de evitar erros e bugs comuns do JavaScript.

### `strictNullChecks`

Essa flag faz o compilador insistir que você trate variáveis com valores `null` ou `undefined`, o que é uma excelente decisão, especialmente se você vem diretamente do JS.

## Everyday Tyipes

# Bibliografia

- [Literal Types in TS](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Parameter](https://developer.mozilla.org/en-US/docs/Glossary/Parameter)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
