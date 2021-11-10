import {Char} from "../ui/popup/setting/SettingPanel";

chrome.storage.sync.get(["indentChar"]).then((items) => {
    if (!items.indentChar) {
        return chrome.storage.sync.set({indentChar: Char.X2Spaces})
    }
})