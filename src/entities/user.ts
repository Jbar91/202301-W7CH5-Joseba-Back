export type User = {
  id: string;
  email: string;
  passwd: string;
  name: string;
  surname: string;
  friends: User[];
  enemies: User[];
};
