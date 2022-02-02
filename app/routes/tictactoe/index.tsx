import { useCatch, useLoaderData } from 'remix';
import TicTacToe from '~/components/tictactoe/Tictactoe';
import stylesUrl from '../../styles/tictactoe.css';
import type { LinksFunction, LoaderFunction } from 'remix';

export type LoaderData = { board: Array<string>; isPlayerOneTurn: boolean };

export const loader: LoaderFunction = async () => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const isPlayerOneTurn = true;
  const data: LoaderData = { board, isPlayerOneTurn };

  return data;
};

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: stylesUrl }];
};

export default function TictactoeIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return <TicTacToe {...data} />;
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
