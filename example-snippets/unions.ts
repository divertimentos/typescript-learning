console.clear();

function printId(id: number | string) {
  console.log(`This is your identification: ${id} (type: ${typeof id}).`);
}

// printId("Comitê Revolucionário Ultrajovem");
// printId(42);

function unionsRestrictions(name: string | number) {
  return name.length;
}

unionsRestrictions("Lúthien Tinúviel");
