declare global {
    namespace NodeJS {
        interface Global {
           sessionsToken: any,
            io: any,
            path_index: any
        }
    }
}
export default global;
