// function greet(person, date) {
//   console.log(`Hello, ${person}. Today is ${date}!`);
// }

function greetWithTypeAnnotation(person: string, date: Date) {
  console.log(`Hello, ${person}. Today is ${date.toDateString()}!`);
}

greetWithTypeAnnotation("Galadriel", new Date());
