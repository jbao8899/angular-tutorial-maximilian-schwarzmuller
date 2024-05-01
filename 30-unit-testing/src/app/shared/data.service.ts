export class DataService {
    getDetails(): Promise<string> {
        const resultPromise: Promise<string> = new Promise(
            (resolve, reject) => {
                setTimeout(
                    () => {
                        resolve("Data")
                    },
                    1500 // 1.5s
                )
            },
        )
        return resultPromise;
    }
}