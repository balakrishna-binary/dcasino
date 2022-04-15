import Head from "next/head";

export default function Home() {
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
      `}</style>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="spin-wheel">{/* TODO: add spinwheel */}</div>
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
