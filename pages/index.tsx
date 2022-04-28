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
    // const [response, setResponse] = React.useState({});
    const [stake, setStake] = React.useState(0);
    const [balance, setBalance] = React.useState(0);
    const [status, setStatus] = React.useState("pending");
    const [selected_emoji_index, setSelectedEmojiIndex] = React.useState(null);
    const [should_spin, setSpin] = React.useState(false);
    const [last_digit, setLastDigit] = React.useState<number>(0);

    React.useEffect(() => {
        api_socket.onopen = () => {
            api_socket.send(JSON.stringify({ authorize: token }));
        };

        api_socket.onmessage = (msg) => {
            var data = JSON.parse(msg.data);
            if (data.error !== undefined) {
                console.log(data.error.message);
            } else if (data.msg_type == "authorize") {
                console.log(data);
                setBalance(data.authorize.balance);
            } else if (data.msg_type == "proposal") {
                console.log(data);
                api_socket.send(
                    JSON.stringify({
                        buy: data.proposal.id,
                        subscribe: 1,
                        price: stake,
                    })
                );
            } else if (
                data.msg_type == "proposal_open_contract" &&
                data.proposal_open_contract.status != "open"
            ) {
                console.log(data);
                setStatus(data.proposal_open_contract.status);
                setLastDigit(
                    Number(data.proposal_open_contract.sell_spot_display_value.substr(-1))
                );
            } else {
                console.log(data);
            }
        };

        return () => api_socket.close();
    }, []);

    const openContract = (prediction: string, stake: number) => {
        api_socket.send(
            JSON.stringify({
                proposal: 1,
                amount: stake,
                barrier: prediction,
                basis: "payout",
                contract_type: "DIGITMATCH",
                currency: "USD",
                duration: 3,
                duration_unit: "t",
                symbol: "R_10",
            })
        );
    };

    const purchaseAPI = async (): Promise<{ last_digit: number; result: "won" | "lost" }> => {
        return new Promise((resolve) => {
            openContract(selected_emoji_index.toString(), stake);
            setTimeout(() => {
                resolve({
                    last_digit: last_digit,
                    result: status === "won" ? status : "lost",
                });
            }, 6000);
        });
    };

    const purchase = async () => {
        setSpin(true);
        const response = await purchaseAPI();
        if (status === "pending") setLastDigit(Math.floor(Math.random() * 10));
        if (response.result === "won") alert("You won!!!!");
        else alert("You lost! :(");
        // setStatus(response.result);
        setSpin(false);
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
                /* The Modal (background) */
                .modal {
                    display: block; /* Hidden by default */
                    position: fixed; /* Stay in place */
                    z-index: 1; /* Sit on top */
                    padding-top: 100px; /* Location of the box */
                    left: 0;
                    top: 0;
                    width: 100%; /* Full width */
                    height: 100%; /* Full height */
                    overflow: auto; /* Enable scroll if needed */
                    background-color: rgb(0, 0, 0); /* Fallback color */
                    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
                }

                /* Modal Content */
                .modal-content {
                    position: relative;
                    background-color: #fefefe;
                    margin: auto;
                    padding: 0;
                    border: 1px solid #888;
                    width: 80%;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    -webkit-animation-name: animatetop;
                    -webkit-animation-duration: 0.4s;
                    animation-name: animatetop;
                    animation-duration: 0.4s;
                }

                /* Add Animation */
                @-webkit-keyframes animatetop {
                    from {
                        top: -300px;
                        opacity: 0;
                    }
                    to {
                        top: 0;
                        opacity: 1;
                    }
                }

                @keyframes animatetop {
                    from {
                        top: -300px;
                        opacity: 0;
                    }
                    to {
                        top: 0;
                        opacity: 1;
                    }
                }

                /* The Close Button */
                .close {
                    color: white;
                    float: right;
                    font-size: 28px;
                    font-weight: bold;
                }

                .close:hover,
                .close:focus {
                    color: #000;
                    text-decoration: none;
                    cursor: pointer;
                }

                .modal-header {
                    padding: 2px 16px;
                    background-color: #5cb85c;
                    color: white;
                }

                .modal-body {
                    padding: 2px 16px;
                }

                .modal-footer {
                    padding: 2px 16px;
                    background-color: #5cb85c;
                    color: white;
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
                <title>Spin Wheel</title>
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
                    <input
                        className="api-token"
                        placeholder="Stake"
                        type="number"
                        onChange={(e) => setStake(Number(e.target.value))}
                    ></input>
                    <div className="trade-params">
                        <EmojitPrediction
                            selected_emoji={spin_wheel_emojis[selected_emoji_index]}
                            onChange={setSelectedEmojiIndex}
                            items={spin_wheel_emojis}
                        />
                    </div>
                    <div className="purchase-button-container">
                        <button className="purchase-button" onClick={() => purchase()}>
                            Spin
                        </button>
                    </div>
                </div>
                {/* {status !== "pending" && (
                    <div id="myModal" className="modal">
                        <div className="modal-content">
                            <div className="modal-body">
                                {status === "won" ? <p>You won!</p> : <p>You lost</p>}
                            </div>
                        </div>
                    </div>
                )} */}
            </main>
        </div>
    );
}
