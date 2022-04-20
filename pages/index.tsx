import React from "react";
import Head from "next/head";
import APIProvider from "../context/api-context";
import Home from "./Home";

export default function Main() {
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
                    --wheel-slice-spacing: 1px;
                    --wheel-border-size: 1px;
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
                <title>DCasino</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <APIProvider>
                    <Home />
                </APIProvider>
            </main>
        </div>
    );
}
