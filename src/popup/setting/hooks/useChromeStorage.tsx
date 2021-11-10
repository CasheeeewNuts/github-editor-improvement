// const useChromeStorage = () => {
//     const storage = {}
//     storage.query
//
// }
import type chrome from "chrome";

type Storage<T> = {
    query: (key: keyof T) => Promise<Record<keyof T, T[keyof T]>>
    save: (items: Partial<T>) => Promise<void>
}

function useChromeStorage<T>() {
    const storage: Storage<T> = {
        query: key => {
            return new Promise(resolve => {
                chrome.storage.sync.get(key, item => {
                    resolve(item)
                })
            })
        },
        save: newItems => {
            return new Promise(resolve => {
                chrome.storage.sync.set(newItems, () => {
                    resolve()
                })
            })
        }
    }

    return storage
}

export default useChromeStorage