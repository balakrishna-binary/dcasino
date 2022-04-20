import React from "react";
import SpinWheel from "../components/spin-wheel";
import { APIContext } from "../context/api-context";

export default function Home() {
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
    const { response } = React.useContext(APIContext);

    console.log(response);
    return (
        <>
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
            <div className="spin-wheel">
                <SpinWheel items={spin_wheel_emojis} />
            </div>
            {/* <div className="sidebar"> */}
            {/* TODO: add API Token input */}
            {/* <div className="trade-params"> */}
            {/* TODO: add buttons from 0-9. Check Matches/Differs contract type in DTrader */}
            {/* </div> */}
            {/* <div className="purchase-button-container">
                    {/* TODO: style buttons */}
            {/* <button className="purchase-button">Matches</button>
                <button className="purchase-button">Differs</button> */}
            {/* </div> */}
            {/* </div> */}
        </>
    );
}
