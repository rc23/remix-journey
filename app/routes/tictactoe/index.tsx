import type { LoaderFunction, LinksFunction } from "remix";
import { useLoaderData, useCatch } from "remix";
import stylesUrl from "../../styles/tictactoe.css";
import TicTacToe from "~/components/tictactoe/Tictactoe";

export type LoaderData = { board: Array<string>; isPlayerOneTurn: boolean };

export let loader: LoaderFunction = async () => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let isPlayerOneTurn = true;
  let data: LoaderData = { board, isPlayerOneTurn };
  return data;
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function TictactoeIndexRoute() {
  let data = useLoaderData<LoaderData>();

  return <TicTacToe {...data} />;
}

export function CatchBoundary() {
  let caught = useCatch();

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
