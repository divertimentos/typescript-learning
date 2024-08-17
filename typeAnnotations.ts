interface User {
  name: string;
  id: number;
}

function deleteUser(user: User) {
  return user;
}

// function addUser(): User {
//   //...
// }

console.log(
  deleteUser({
    name: "Hayley Williams",
    id: 1,
  }),
);
