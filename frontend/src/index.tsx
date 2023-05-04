import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ConfigProvider, theme} from "antd";
import {HelmetProvider} from "react-helmet-async";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <ConfigProvider theme={{
                algorithm: theme.defaultAlgorithm,
                token: {
                    colorPrimary: "#1d91cc",
                    colorBgLayout: "#d4e9f0"
                }
            }}>
                <App/>
            </ConfigProvider>
        </HelmetProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
