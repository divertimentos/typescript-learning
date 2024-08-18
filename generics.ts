console.clear();

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

// class Victarion<T> {
//   private value: T;
//
//   constructor(value: T) {
//     this.value = value;
//   }
//
//   getValue(): T {
//     return this.value;
//   }
// }
//
// const numberBox = new Victarion<number>(42);
// const stringBox = new Victarion<string>("oibebe");
// const booleanBox = new Victarion<boolean>(true);
//
// console.log(numberBox.getValue()); // 42
// console.log(stringBox.getValue()); // oibebe
// console.log(booleanBox.getValue()); // true

// Devemos usar:
// function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
//   console.log(arg.length);
//
//   return arg;
// }
//
// console.log(loggingIdentity<string>(["oi", "oibebe", "sorria", "detonautas"]));
