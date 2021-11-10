import {Char} from "../lib/char";

let IndentChar: Char;

chrome.storage.onChanged.addListener(changes => {
    IndentChar = changes.indentChar.newValue
})


chrome.storage.sync.get("indentChar", (items) => {
    IndentChar = items.indentChar

    document.addEventListener("keydown", event => {
        const isTab = event.key === "Tab"

        if (!isTab) {
            return
        }

        const activeElementIsTextArea = document.activeElement instanceof HTMLTextAreaElement

        if (!activeElementIsTextArea) {
            return
        }

        const textArea = document.activeElement as HTMLTextAreaElement

        event.preventDefault()

        const selectionHasRange = textArea.selectionStart !== textArea.selectionEnd

        if (selectionHasRange) {
            return
        } else {
            insertIndent(textArea, IndentChar)
        }

        textArea.dispatchEvent(new Event("change"))
    })
})

function insertIndent(textArea: HTMLTextAreaElement, indentCharType: Char): void {
    const cursorPosition = textArea.selectionStart
    const beforeSelection = textArea.value.slice(0, cursorPosition)
    const afterSelection = textArea.value.slice(cursorPosition)

    const indent = (() => {
        switch (indentCharType){
            case Char.X2Spaces:
                return "  "
            case Char.X4Spaces:
                return "    "
            case Char.TabChar:
                return "\t"
        }
    })()

    textArea.value = beforeSelection + indent + afterSelection
    textArea.selectionStart = cursorPosition + indent.length
    textArea.selectionEnd = cursorPosition + indent.length
}