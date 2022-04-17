import Head from "next/head";
import SpinWheel from "./../components/spin-wheel/spin-wheel";

export default function Home() {
  const spin_wheel_numbers = [0,1,2,3,4,5,6,7,8,9];
  return (
    <div className="container">
      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
        }
        main {
          padding: 1rem;
          flex: 1;
          display: flex;
        }
        .spin-wheel {
          display: flex;
          flex: 3;
        }
        .sidebar {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .purchase-button-container {
          display: flex;
          flex-direction: column;
        }
        .purchase-button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        :root {
          --wheel-font: "Lato", "Quicksand", sans-serif;
          --wheel-size: 30vw;
          --wheel-slice-spacing: 2vw;
          --wheel-border-size: 2px;
          --wheel-color: #a3e7a9;
          --neutral-color: white;
          --PI: 3.14159265358979;
          --nb-item: 0;
          --item-nb: 0;
          --selected-item: 0;
          --nb-turn: 5;
          --spinning-duration: 4s;
          --reset-duration: 0s;
          --wheel-item-color: white;
        }
      `}</style>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="spin-wheel">
          <SpinWheel items={spin_wheel_numbers} />
        </div>
        <div className="sidebar">
          {/* TODO: add API Token input */}
          <div className="trade-params">
            {/* TODO: add buttons from 0-9. Check Matches/Differs contract type in DTrader */}
          </div>
          <div className="purchase-button-container">
            {/* TODO: style buttons */}
            <button className="purchase-button">Matches</button>
            <button className="purchase-button">Differs</button>
          </div>
        </div>
      </main>
    </div>
  );
}
