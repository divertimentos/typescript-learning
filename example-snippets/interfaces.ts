console.clear();

interface IGoatProfile {
  goatStatus?: boolean;
}

interface IPlayerProfile extends IGoatProfile {
  name: string;
  age: number;
  teams: string[];
  jerseyNumber: number[] | number;
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
