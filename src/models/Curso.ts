import Grid from './Grid';

type Curso = {
  _id: string;
  title: string;
  description: string;
  bio: string;
  price: number;
  grid: Array<Grid>;
};

export default Curso;
