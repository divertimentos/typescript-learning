console.clear();

function printCoord(point: { x: number; y: number }) {
  console.log(`The coordinate's x value is ${point.x}.`);
  console.log(`The coordinate's r value is ${point.y}.`);
}

const route = {
  x: 42,
  y: 23,
};

// printCoord(route);

function getProfile(name: string, religion?: string) {
  if (religion && religion.length > 1) {
    return console.log(`My name is ${name} and my religion is ${religion}`);
  }

  return console.log(`My name is ${name} and perhaps I am an atheist.`);
}

// getProfile("Tolkien", "Christianism");
// getProfile("Richard Dawkins");
