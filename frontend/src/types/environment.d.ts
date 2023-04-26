export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_USERNAME: string;
            REACT_APP_PASSWORD: string;
        }
    }
}
