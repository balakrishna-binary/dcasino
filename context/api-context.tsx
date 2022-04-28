import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

export const APIContext = React.createContext<any>(null);

const APIProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    const [response, setResponse] = React.useState({});

    const app_id = 1089;
    const deriv_api_url = "wss://ws.binaryws.com/websockets/v3";
    const token = "ml7cArIMjMJCR28";

    React.useEffect(() => {
        const api_socket = new W3CWebSocket(`${deriv_api_url}?app_id=${app_id}`);

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

    return <APIContext.Provider value={{ response }}>{children}</APIContext.Provider>;
};

export default APIProvider;
