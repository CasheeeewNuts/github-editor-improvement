type Items = Record<string, unknown>

interface Storage<T extends Items> {
    query<K extends keyof T>(keys: K[]): Promise<{
        [P in K]: T[P]
    }>
    save(items: Partial<T>): Promise<void>
}

function ChromeStorage<T extends Items>() {
    const storage: Storage<T> = {
        query<K extends keyof T>(keys: K[]): Promise<{
            [P in K]: T[P]
        }> {
            return new Promise((resolve, reject) => {
                chrome.storage.sync.get(keys, items => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError)
                    }

                    resolve(items as {
                        [P in K]: T[P]
                    })
                })
            })
        },
        save(items: Partial<T>): Promise<void> {
            return new Promise(((resolve, reject) => {
                chrome.storage.sync.set(items, () => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError)
                    }

                    resolve()
                })
            }))
        }
    }

    return storage
}

export default ChromeStorage