type Storage<T extends Record<string, unknown>> = {
    query: (keys: (keyof T)[]) => Promise<Record<keyof T, T[keyof T]>>
    save: (items: Partial<T>) => Promise<void>
}

function useChromeStorage<T extends Record<string, unknown>>() {
    const storage: Storage<T> = {
        query: key => {
            return new Promise(resolve => {
                chrome.storage.sync.get(key, item => {
                    resolve(item as any)
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