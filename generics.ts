console.clear();

interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

// Hello World of Generics

function getLength(arg: string): number {
  return arg.length;
}

// console.log(getLength("oibebe"));

// class UserAccount {
//   name: string;
//   id: number;
//
//   constructor(name: string, id: number) {
//     this.name = name;
//     this.id = id;
//   }
// }

class Box<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(42);
const stringBox = new Box<string>("oibebe");
const booleanBox = new Box<boolean>(true);

console.log(numberBox.getValue()); // 42
console.log(stringBox.getValue()); // oibebe
console.log(booleanBox.getValue()); // true
