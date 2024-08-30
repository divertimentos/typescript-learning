console.clear();

type Point = {
  x: number;
  y: number;
  message: string;
};

function printCoord(point: Point) {
  console.log(`The coordinate's x value is ${point.x}.`);
  console.log(`The coordinate's y value is ${point.y}.`);
  console.log(`The message is: ${point.message}!`);
}

const infos = {
  x: 42,
  y: 23,
  message: "De amor nadie se muere",
};

printCoord(infos);
