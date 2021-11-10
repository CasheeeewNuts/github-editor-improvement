import {Char} from "../lib/char";

chrome.storage.sync.get(["indentChar"]).then((items) => {
    if (!items.indentChar) {
        return chrome.storage.sync.set({indentChar: Char.X2Spaces})
    }
})