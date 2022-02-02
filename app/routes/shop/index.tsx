import { useCatch, useLoaderData } from 'remix';
import Shop from '~/components/shop/Shop';
import stylesUrl from '../../styles/shop.css';
import type { LinksFunction, LoaderFunction } from 'remix';

export type Order = {
  orderId: number;
  userId: number;
  date: number;
  products: string[];
};

export type Prices = {
  soda: number;
  popcorn: number;
  bundle: number;
};

export type LoaderData = { orders: Array<Order>; prices: Prices };

export const loader: LoaderFunction = async () => {
  const orders = [
    {
      orderId: 1,
      userId: 123,
      date: 1643702630386,
      products: ['soda', 'popcorn', 'soda'],
    },
    {
      orderId: 2,
      userId: 456,
      date: 1643702630387,
      products: ['soda', 'popcorn', 'soda'],
    },
    {
      orderId: 3,
      userId: 789,
      date: 1643702630388,
      products: ['soda', 'popcorn', 'soda'],
    },
    {
      orderId: 4,
      userId: 123,
      date: 1643702630389,
      products: ['soda'],
    },
  ];
  const prices = {
    soda: 2,
    popcorn: 7.5,
    bundle: 9,
  };
  const data: LoaderData = { orders, prices };

  return data;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function ShopRoute() {
  const data = useLoaderData<LoaderData>();

  return <Shop {...data} />;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="error-container">
        <p>There are no board to display.</p>
      </div>
    );
  }
  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div className="error-container">I did a whoopsies.</div>;
}
