export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}
interface Profile {
  firstName: string;
  lastName: string;
  bio: string;
  description: string;
};

export interface User {
  _id?: string;
  userName: string;
  email: string;
  profile: Profile;
  role: Array<string>;
  password: string;
};
