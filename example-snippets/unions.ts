console.clear();

function printId(id: number | string) {
  if (typeof id === "string") {
    return console.log(
      `O narrowing foi pra string, então posso usar o .toUpperCase(): ${id.toUpperCase()}`,
    );
  }

  return console.log(`Timeline sem narrowing: ${id}`);
}

function welcomePeople(guest: string[] | string) {
  if (Array.isArray(guest)) {
    return console.log(
      `Fala, galera: ${guest.join(" and ")} e o restante do pessoal!`,
    );
  }

  return console.log(`Boas-vindas, ${guest.toUpperCase()}. Mesa para um?`);
}

printId("Comitê Revolucionário Ultrajovem");
printId(42);

welcomePeople(["Yavanna", "Manwë", "Oromë"]);
welcomePeople("Círdan");
