<!--toc:start-->
- [TypeScript Learning](#typescript-learning)
- [Parte 1/2: TypeScript for JavaScript Programmers](#parte-12-typescript-for-javascript-programmers)
  - [Tipos por Inferência](#tipos-por-inferência)
  - [Definindo Tipos](#definindo-tipos)
  - [Compondo Tipos](#compondo-tipos)
    - [Unions](#unions)
    - [Literais](#literais)
    - [_Genéricos_](#genéricos)
    - [Parâmetros _x_ Argumentos](#parâmetros-x-argumentos)
    - [Sistemas de Tipos Estrutural (aka Duck Typing)](#sistemas-de-tipos-estrutural-aka-duck-typing)
- [Parte (2/2): The TypeScript Handbook](#parte-22-the-typescript-handbook)
  - [Os Básicos](#os-básicos)
  - [Checagem Estática de Tipos](#checagem-estática-de-tipos)
  - [Non-exception failures](#non-exception-failures)
  - [Tipos para Tooling](#tipos-para-tooling)
  - [Tipos Explícitos](#tipos-explícitos)
  - [Tipos Deletados pós-Compilação](#tipos-deletados-pós-compilação)
  - [Retrocompatibilidade (Downleveling)](#retrocompatibilidade-downleveling)
  - [Rigorosidade (Strictness)](#rigorosidade-strictness)
    - [`noImplicitAny`](#noimplicitany)
    - [`strictNullChecks`](#strictnullchecks)
  - [Tipos do dia a dia](#tipos-do-dia-a-dia)
    - [Tipos primitivos](#tipos-primitivos)
    - [Arrays](#arrays)
    - [Type Annotations em variáveis](#type-annotations-em-variáveis)
    - [Funções](#funções)
      - [Type Annotations nos parâmetros](#type-annotations-nos-parâmetros)
      - [Type annotation no retorno](#type-annotation-no-retorno)
        - [Funções que retornam Promises](#funções-que-retornam-promises)
      - [Funções anônimas](#funções-anônimas)
    - [Tipando objetos](#tipando-objetos)
      - [Propriedades opcionais (`?`)](#propriedades-opcionais)
    - [Union Types](#union-types)
      - [Definição vagamente matemática](#definição-vagamente-matemática)
      - [Trabalhando com Unions](#trabalhando-com-unions)
    - [Aliases para tipos (Type Aliases)](#aliases-para-tipos-type-aliases)
    - [Interfaces](#interfaces)
    - [Type Assertions](#type-assertions)
    - [Enums](#enums)
    - [Primitivos menos comuns](#primitivos-menos-comuns)
- [Projetos de exemplo neste repositório](#projetos-de-exemplo-neste-repositório)
- [Bibliografia](#bibliografia)
<!--toc:end-->

# TypeScript Learning

![ts banner (source: unknown)](https://github.com/divertimentos/typescript-learning/blob/main/media/ts-banner.jpeg)

O TypeScript é um superset do JavaScript, o que significa que ele possui todas as features do JS, mais as suas próprias. Especificamente, o que o TS adiciona é uma lógica de tipos.

Seria o TypeScript um PropTypes glorificado? Não, porque, no JS, parâmetro é parâmetro; já no React, parâmetro é prop. É uma questão semântica que afeta a definição do TS em si.

- O objetivo do TS é ser um typechecker (checador de tipos), 100% compatível com ecossistemas JavaScript

# Parte 1/2: TypeScript for JavaScript Programmers

- A única adição que o TS faz sobre o JS é seu sistema de tipos. Seu objetivo é diminuir a quantidade de bugs checando a consistência dos tipos ao longo do código

## Tipos por Inferência

- O TS reconhece e respeita quando o JS gera tipos por inferência, como no exemplo abaixo:

```typescript
let helloWorld = "Oibebe!"; // O TS assume que o tipo da variável é 'string'.
```

## Definindo Tipos

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

É possível atribuir tipos a métodos de classes também:

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

Ao criar funções, podemos fazer _type annotation_:

```typescript
function deleteUser(user: User) {
  // ...
}

function getAdminUser(): User {
  // ...
}
```

## Compondo Tipos

No TS podemos criar tipos complexos usando _unions_ e _generics_.

### Unions

O _union_ é parecido com o que nas PropTypes chamamos de `oneOf`

```typescript
type MyBool = true | false;
```

No caso acima, no entanto, a variável `MyBool` é do tipo `boolean`. É, cada linguagem vai assumir algumas coisas num certo nível de magia — o que, neste caso, não está errado de forma alguma.

Mas, antes de prosseguir, uma breve contextualização sobre `literals`.

### Literais

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

### _Genéricos_

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

Após ler a seção [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) da documentação oficial do TypeScript, entendi melhor o conceito de _generics_.

Uma função que retorna aquilo que é passado para ela é uma função de identidade:

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

### Sistemas de Tipos Estrutural (aka Duck Typing)

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

## Os Básicos

- A vantagem do TS sobre o JS é tornar o código mais previsível antes da compilação, no que tange a tipos.

Segundo a documentação oficial, "'tipar' é descrever quais valores podem ser passados para determinada função e quais podem quebrá-la". **Como o JS faz tipagem dinâmica, só é possível descobrir se uma função quebra quando ela quebra**. A vantagem do TS, então, é assegurar a checagem de tipos pré-compilação, através da **tipagem estática**.

## Checagem Estática de Tipos

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

## Tipos para Tooling

O TS pode nos ajudar a prevenir erros antes mesmo deles serem escritos. O type-checker nos informa quais são as propriedades possíveis de objetos. Isso é o que os desenvolvedores costumam chamar de o 'tooling do TypeScript'. O seu LSP também faz outras ✨ magias ✨, como quick fixes, refatorações, organização inteligente de código, features de navegação, localização de referências. Quem já utiliza o LSP do TS no VSCode, por exmeplo, tem acesso a algumas dessas features do TS, mesmo que esteja programando dm JavaScript (ou JSX etc.).

```typescript
function greet(person, date) {
  console.log(`Hello, ${person}. Today is ${date}!`);
}

greet("Brendan"); // ❌ --> Expected 2 arguments, but got 1.
```

O TS mostrou esse erro antes mesmo de eu rodar o código. Assim que retornei meu Vim do Insert Mode pro Normal Mode, o checador demonstrou seu poder.

**Agradeça ao TypeScript por existir**.

## Tipos Explícitos

Quando explicitamos os tipos fazendo _type annotations_, estamos usando a feature mais básica do TS, que é dizer para uma função quais tipos de valores ela aceita e retorna. No caso da função `greet()`, munida de tipos ela fica assim:

```typescript
function greet(person: string, date: Date) {
  console.log(`Hello, ${person}. Today is ${date.toDateString()}!`);
}
```

## Tipos Deletados pós-Compilação

Quando usamos o `tsc` para compilar código TS, ele transpila para JS. Nesse processo, boa parte do código TS é apagado e transformado em JS, mas de uma forma que atenda à estrita redução de redundâncias que um código estaticamente tipado requer.

## Retrocompatibilidade (Downleveling)

O transpilador do TS é setado para automaticamente converter o seu código em uma versão do JS que seja o mais compatível possível, ou seja, ES3. Para setar o `tsc` para outra versão do ECMAScript, você pode usar o argumento `--target`: `tsc --target es2015 hello.ts`.

## Rigorosidade (Strictness)

É possível configurar a "rigorosidade" (_strictness_) do compilador do TS a fim de que ele atenda aos interesses de diferentes tipos de programador. Você pode ser meramente alguém em busca de uma experiência _opt-in_ de tipagem conforme necessário for, com os benefícios do tooling que a linguagem oferece. E esse perfil de usuário de TS é o mais comum. Conforme dor necessário, você pode ir fazendo um "_dial-in_" nas features através do `tsconfig.json`. Duas configurações de _dial-in_ são as mais importantes, `noImplicitAny` e `strictNullChecks`.

### `noImplicitAny`

Quando não usamos tipos, o TS pode setar `any`, o que corresponderia a basicamente usar JS. Habilitando essa opção, o TS fica mais estrito e vai insistir que você identifique os tipos das variáveis declaradas, a fim de evitar erros e bugs comuns do JavaScript.

### `strictNullChecks`

Essa flag faz o compilador insistir que você trate variáveis com valores `null` ou `undefined`, o que é uma excelente decisão, especialmente se você vem diretamente do JS.

## Tipos do dia a dia

### Tipos primitivos

- O JS possui três tipos primitivos: `string`, `number` e `boolean`
- Para espcificar um array de números, use `number[]` (ou `Array<number>`)
- Para array de strings, `string[]` (ou `Array<string>`)
- O TS possui também o tipo `any`, que é quando um tipo não estiver especificado.

### Arrays

- Para especificar um array de números como `[1, 2, 3, 4, 5]`, use `number[]`. Eu leio mentalmente isso como "number array" para facilitar a mnemônica. Parra arrays de strings, mesma coisa: `string[]`.

### Type Annotations em variáveis

Simples. Basta tipar após o nome da variável.

```typescript
var hello: string = "world";
let areYouLearning: boolean = true;
const ultimateAnswer: number = 42;
```

O TS assume implicitamente tipos em variáveis, então você não precisa se preocupar com eles na maior parte do tempo.

### Funções

As funções são onde o TypeScript brilha. São elas que você precisa tipar na maior parte do tempo. Entendi por que a galera de ReactJS gosta tanto de TS: é porque no ReactJS tudo é função e no JS tudo é objeto.

#### Type Annotations nos parâmetros

- Tipamos parâmetros para definir o que uma função aceita.

```typescript
function greet(name: string, years: number) {
  return `My name is ${name} and I have ${years} old!`;
}

greet("Galadriel", 5600);
```

#### Type annotation no retorno

```typescript
function getFavoriteNumber(): number {
  return 42;
}
```

Os type annotations em retorno são menos comuns, assim como a tipagem de variável. O TS também costuma inferir essas informações.

##### Funções que retornam Promises

Se a sua função retorna uma Promise, assinale o tipo Promise no retorno.

```typescript
async function fetchNumber(): Promise<number> {
  return 26;
}
```

#### Funções anônimas

O TS vai tentar inferir os tipos nas funções anônimas.

```typescript
const names = ["Glorfindel", "Victarion", "Mitsurugi"];

names.forEach(function (str) {
  console.log(str.toUpperCase());
});

// O TS vai inferir que o parâmetro é do tipo string. Funciona para arrow functions também:

names.forEach((name) => {
  console.log(name.toUpperCase());
});
```

### Tipando objetos

Logo após os tipos primitivos, são os tipos com os quais mais se lida ao usar TypeScript, pois eles correspondem a qualquer valor em JS que possua propriedade.

```typescript
function printCoord(point: { x: number; y: number }) {
  console.log(`The coordinate's x value is ${point.x}.`);
  console.log(`The coordinate's r value is ${point.y}.`);
}

const route = {
  x: 42,
  y: 23,
};

printCoord(route);
```

#### Propriedades opcionais (`?`)

**OBS.: para especificar um tipo opcional, use `?`.**

```typescript
function getProfile(name: string, religion?: string) {
  if (religion && religion.length > 1) {
    return console.log(`My name is ${name} and my religion is ${religion}`);
  }

  return console.log(`My name is ${name} and perhaps I am an atheist.`);
}

getProfile("Tolkien", "Christianism");
getProfile("Richard Dawkins");
```

**OBS.: Em TS, ao usar um parâmetro opcional, primeiro cheque se ele é `undefined`.**

### Union Types

A definição de Unions é combinação de tipos. Então, se você cria um tipo formado por dois ou mais tipos, você tem um Union. Eles representam valores que podem ser de qualquer um desses tipos. Os tipos pertencentes a Unions são chamados de _membros_.

#### Definição vagamente matemática

Eu entendo os Unions num sentido vagamente matemático. União como uma união/intersecção de determinado conjunto mesmo. Se uma função, por exemplo, aceita um parâmetro que pode ser tanto `string` quanto `number`, é porque o tipo esperado dela encontra-se justamente na intersecção entre strings e números.

Essa noção é vaga porque eu não sou matemático. Se essa minha definição fizer sentido, nem que seja mnemônico, vou adotá-la. Se não fizer sentido nenhum, eu apago e tento fixar o conceito de outra forma.

#### Trabalhando com Unions

Seguindo essa definição, o TypeScript só permite uma operação que for comum a todos os membros do union. Portanto, se um union type conter `string | number`, você não pode chamar um `.length` ou um `.toUpperCase()` nele, por exemplo.

Nesse caso, a dica é fazer um "narrowing" (algo como "estreitamento") na função.

```typescript
function welcomePeople(guest: string[] | string) {
  if (Array.isArray(guest)) {
    return console.log(
      `Fala, galera: ${guest.join(" and ")} e o restante do pessoal!`,
    );
  }

  return console.log(`Boas-vindas, ${guest.toUpperCase()}. Mesa para um?`);
}

welcomePeople(["Yavanna", "Manwë", "Oromë"]);
welcomePeople("Círdan");
```

### Aliases para tipos (Type Aliases)

Quando precisar reusar type annotations, use aliases. É a keyword `type`:

```typescript
type Point = {
  x: number;
  y: number;
  message: string;
};

const infos = {
  x: 42,
  y: 23,
  message: "De amor nadie se muere",
};

function printCoord(point: Point) {
  console.log(`The coordinate's x value is ${point.x}.`);
  console.log(`The coordinate's y value is ${point.y}.`);
  console.log(`The message is: ${point.message}!`);
}

printCoord(infos);
```

Os aliases podem ser unions também:

```typescript
type ID = number | string;
```

### Interfaces

Uma interface é umma outra forma de declarar um tipo que é um objeto.

```typescript
interface IPlayerProfile {
  name: string;
  age: number;
  teams: string[];
  jerseyNumber: number[] | number;
  goatStatus: boolean;
}

function playerProfile(infos: IPlayerProfile) {
  const isGoat = infos.goatStatus === true ? "Yeah" : "MJ is the GOAT";

  console.log(
    `
- Name: ${infos.name}
- Age: ${infos.age}
- Teams: ${infos.teams}
- Jersey number: ${infos.jerseyNumber}
- G.O.A.T. status: ${isGoat}
  `,
  );
}

const lebronData = {
  name: "Lebron Raymone James Sr.",
  age: new Date().getFullYear() - 1984,
  teams: ["Cavaliers", "Heat", "Cavaliers", "Lakers"],
  jerseyNumber: [23, 6],
  goatStatus: true,
};

playerProfile(lebronData);
```

A única diferença entre `types` e `interfaces` é que nos types não se pode reabrir um tipo para adicionar novas propriedades. Interfaces podem sempre ser importadas (_extended_).

```typescript
interface Animal {
  name: string;
}

interface Bear extends Animal {
  honey: boolean;
}
```

### Type Assertions

Quando você precisa usar um tipo cujo qual o TS não sabe nada a respeito, você pode fazer _type assertions_. Eles são removidos posteriormente pelo compilador, então o TS não é capaz de checar a nulidade deles caso você cometa um typo.

```typescript
// Sintaxe dos type assertions

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

const myAnotherCantas = <HTMLCanvasElement>(
  document.getElementById("main_canvas")
);
```

### Enums

Descrevem um valor que poderia ser um conjunto/set de possíveis constantes nomeadas. Não estão relacionados a tipos, diferentemente de todas as outras adições que o TS faz no JS — ou seja, os Enums vão para o runtime pós-compilação. É uma feature do TS que foi passada para o JS. É um assunto mais específico que vai ficar de fora destes estudos iniciais. Aqui estamos focando em ficar proficientes em tipos em TS.

### Primitivos menos comuns

Bigint e Symbol. Segunda vez que tangencio o symbol e ainda acho que eles são como magia de bruxo: todos sabem que existe, mas ninguém nunca viu. A primeira vez foi no curso [Just JavaScript](https://github.com/divertimentos/just-javascript?tab=readme-ov-file#symbols) do Dan Abramov.

Segundo a documentação do TS, "O Symbol é um primitivo em JS usado para criar uma referência global única através da função `Symbol()`".

De vez em quando é interessante a experiência de contrariar os ensinamentos sobre culhão e brio do prof. Clóvis de Barros e conseguir entender 0% de uma explicação que você releu 35 vezes.

```typescript
const firstName = Symbol("Melkor");
const lastName = Symbol("Melkor");

if (firstName === lastName) {
  // O TS pistola na hora e eu não faço ideia do porquê.
}
```

Já o `bigint` é um novo tipo primitivo em JS usado para representar números realmente grandes.

# Projetos de exemplo neste repositório

- [TypeScript Sample Project](https://github.com/divertimentos/typescript-learning/tree/main/example-projects/typescript-sample)
- [Notes App](https://github.com/divertimentos/typescript-learning/tree/main/example-projects/notes-app)
- [Bytegrad Tutorial Files](https://github.com/divertimentos/typescript-learning/tree/main/example-projects/bytegrad-typescript-tutorial)

# Bibliografia

- [Literal Types in TS](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)
- [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html)
- [Parameter](https://developer.mozilla.org/en-US/docs/Glossary/Parameter)
- [The TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
