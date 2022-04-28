import Head from "next/head";
import React from "react";
import LastDigitPrediction from "../components/last-digit-prediction";
import SpinWheel from "../components/spin-wheel/spin-wheel";

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
  const [selected_digit, setSelectedDigit] = React.useState(0);
  const [should_spin, setSpin] = React.useState(false);
  const [last_digit, setLastDigit] = React.useState<number>(0);

  const mockPurchaseAPI = async (
    type: "matches" | "differs"
  ): Promise<{ last_digit: number; result: "won" | "lost" }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const last_digit = randomIntFromInterval(0, 9);
        if (type === "matches") {
          resolve({
            last_digit,
            result: selected_digit === last_digit ? "won" : "lost",
          });
        } else if (type === "differs") {
          resolve({
            last_digit,
            result: selected_digit !== last_digit ? "won" : "lost",
          });
        }
      }, 2000);
    });
  };

  const purchase = async (type: "matches" | "differs") => {
    setSpin(true);
    const response = await mockPurchaseAPI(type);
    setSpin(false);

    setTimeout(() => {
      setLastDigit(response.last_digit);
      setSpin(true);
      setTimeout(() => {
        setSpin(false);

        alert(
          `${response.result === "won" ? "Won" : "Lost"}. Last digit is ${
            response.last_digit
          }.`
        );
      }, 2000);
    });
  };

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
          max-width: 240px;
        }
        .purchase-button-container {
          display: flex;
          flex-direction: column;
        }
        .purchase-button {
          width: 100%;
          padding: 10px;
          margin-top: 10px;
          color: white;
          border-radius: 4px;
          border: 0;
          outline: 0;
          cursor: pointer;
        }
        .matches-button {
          background: #4bb4b3;
        }
        .differs-button {
          background: #ec3f3f;
        }
        .api-token {
          padding: 10px;
          margin: 10px 2px;
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
          <SpinWheel should_spin={should_spin} result_number={last_digit} />
        </div>
        <div className="sidebar">
          <input className="api-token" placeholder="API Token"></input>
          <div className="trade-params">
            <LastDigitPrediction
              selected_digit={selected_digit}
              onChange={setSelectedDigit}
            />
          </div>
          <div className="purchase-button-container">
            <button
              className="purchase-button matches-button"
              onClick={() => purchase("matches")}
            >
              Matches
            </button>
            <button
              className="purchase-button differs-button"
              onClick={() => purchase("differs")}
            >
              Differs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
