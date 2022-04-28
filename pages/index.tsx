import Head from "next/head";
import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import EmojitPrediction from "../components/emoji-prediction";
import SpinWheel from "../components/spin-wheel/spin-wheel";

const spin_wheel_emojis = [
    "0x1F61C",
    "0x1F680",
    "0x1F6A5",
    "0x1F6C0",
    "0x1F63B",
    "0x270C",
    "0x1F30F",
    "0x1F355",
    "0x1F389",
    "0x1F338",
];

const app_id = 1089;
const deriv_api_url = "wss://ws.binaryws.com/websockets/v3";
const token = "ml7cArIMjMJCR28";

const api_socket = new W3CWebSocket(`${deriv_api_url}?app_id=${app_id}`);

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function Home() {
    const [response, setResponse] = React.useState({});
    const [selected_emoji, setSelectedEmoji] = React.useState(null);
    const [should_spin, setSpin] = React.useState(false);
    const [last_digit, setLastDigit] = React.useState<number>(0);

    React.useEffect(() => {
        api_socket.onopen = (e) => {
            api_socket.send(JSON.stringify({ authorize: token }));
        };

        api_socket.onmessage = (msg) => {
            var data = JSON.parse(msg.data);
            if (data.error !== undefined) {
                console.log(data.error.message);
                // api_socket.close();
            } else {
                console.log(data);
            }
        };

        return () => api_socket.close();
    }, []);

    const mockPurchaseAPI = async (): Promise<{ last_digit: number; result: "won" | "lost" }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const last_digit = randomIntFromInterval(0, 9);
                resolve({
                    last_digit,
                    result: selected_emoji === "0x1F30F" ? "won" : "lost",
                });
            }, 2000);
        });
    };

    const purchase = async () => {
        setSpin(true);
        const response = await mockPurchaseAPI();
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
                    flex-direction: column;
                    align-items: center;
                }
                .spin-wheel {
                    display: flex;
                    flex: 3;
                }
                .selector {
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                    max-width: 310px;
                }
                .purchase-button-container {
                    display: flex;
                    flex-direction: column;
                }
                .purchase-button {
                    width: 100%;
                    padding: 10px;
                    margin-top: 10px;
                    font-weight: 900;
                    color: white;
                    background: linear-gradient(
                        90deg,
                        rgba(2, 0, 36, 1) 0%,
                        rgba(57, 16, 195, 1) 12%,
                        rgba(196, 18, 18, 1) 48%,
                        rgba(13, 230, 113, 1) 91%,
                        rgba(0, 212, 255, 1) 100%
                    );
                    border-radius: 4px;
                    border: 0;
                    outline: 0;
                    cursor: pointer;
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
                    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
                        Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
                    <SpinWheel
                        should_spin={should_spin}
                        result_number={last_digit}
                        items={spin_wheel_emojis}
                    />
                </div>
                <div className="selector">
                    <input className="api-token" placeholder="API Token"></input>
                    <div className="trade-params">
                        <EmojitPrediction
                            selected_emoji={selected_emoji}
                            onChange={setSelectedEmoji}
                            items={spin_wheel_emojis}
                        />
                    </div>
                    <div className="purchase-button-container">
                        <button className="purchase-button" onClick={() => purchase()}>
                            Spin
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
