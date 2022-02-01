import { Link } from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import stylesUrl from "../styles/index.css";

export let meta: MetaFunction = () => {
  return {
    title: "Remix: So great, it's funny!",
    description: "Remix journey app. Learn Remix!",
  };
};

export let links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function Index() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Journey!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="tictactoe">Play Tic Tac Toe</Link>
            </li>
            <li>
              <Link to="shop">Check out our shop</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
