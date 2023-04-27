import Profile from './Profile';
type User = {
  _id?: string;
  userName: string;
  email: string;
  profile: Profile;
  role: Array<string>;
  password: string;
};

export default User;
