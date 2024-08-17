interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// Hello World of Generics

function getLength(arg: string): number {
  return arg.length;
}

// console.log(getLength("oibebe"));
