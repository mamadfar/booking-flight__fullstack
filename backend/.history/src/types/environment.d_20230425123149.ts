export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: Number;
        }
    }
}