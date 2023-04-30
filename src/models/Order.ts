import Title from './Title';
type Order = {
  name: string;
  description: string;
  owner: string;
  product: string;
  totalPrice: number;
  title: Array<Title>;
  status: string;
};

export default Order;
