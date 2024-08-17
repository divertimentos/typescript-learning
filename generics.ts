// interface Backpack<Type> {
//   add: (obj: Type) => void;
//   get: () => Type;
// }

// Hello World of Generics

// function that returns what is passed to it is an identity function
function identity(arg: number): number {
  return arg;
}

// descrevendo a função usando um 'any';
function anyIdentity(arg: any): any {
  return arg;
}

// Em vez de esperar qualquer coisa como retorno,
// podemos capturar o argumento de tal forma que
// possamos denotar o que será retornado.

// Usaremos um 'type variable', que é um tipo especial de variável
// que funciona com tipos em vez de funcionar com valores

function genericsIdentity<Type>(arg: Type): Type {
  return arg;
}

// Existem duas formas de chamar essa função
// 1) passando todos os argumentos, incluindo o argumento de tipo:

let output = genericsIdentity<string>("myString");

// Aqui, explicitamente setamos Type para ser string
// como um dos argumentos da chamada da função,
// usando <>

// 2) a segunda forma é usando inferência, o que é mais comum:

let secondOutput = genericsIdentity("myString");
