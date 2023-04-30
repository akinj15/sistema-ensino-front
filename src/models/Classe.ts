import Grid from './Grid';

type Classe = {
  _id?: string;
  classeName: string;
  description: string;
  curso: Array<string>;
  price: number;
  grid: Array<Grid>;
  students: Array<string>;
};

export default Classe;
