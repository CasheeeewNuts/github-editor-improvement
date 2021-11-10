import {h} from "preact";
import {useEffect, useState} from "preact/compat";
import {Alert, Snackbar, Stack} from "@mui/material";
import useChromeStorage from "./setting/hooks/useChromeStorage";
import SettingPanel from "./setting/SettingPanel";
import {Char} from "../../lib/char";

enum SyncStatus {
    NotChanged,
    Loading,
    Completed
}

const App = () => {
    const [syncStatus, setSyncStatus] = useState<SyncStatus>(SyncStatus.NotChanged)
    const [indentChar, setIndentChar] = useState<Char>(Char.X2Spaces)
    const storage = useChromeStorage<{ indentChar: Char }>()

    useEffect(() => {
        (async () => {
            const res = await storage.query(["indentChar"])
            setIndentChar(res.indentChar)
        })()
    }, [])

    const handlerFactory = (char: Char) => () => {
        setSyncStatus(SyncStatus.Loading)

        storage.save({indentChar: char}).then(() => {
            setSyncStatus(SyncStatus.Completed)
            setIndentChar(char)
        })
    }

    return (
        <div style={{width: "250px", height: syncStatus == SyncStatus.NotChanged ? "100px" : "200px"}}>
            <div style={{padding: "20px"}}>
                <Stack spacing={2}>
                    <SettingPanel initialChar={indentChar} handlerFactory={handlerFactory}/>
                </Stack>
                {
                    StatusBar(syncStatus, () => setSyncStatus(SyncStatus.NotChanged))
                }
            </div>
        </div>
    )
}

const StatusBar = (status: SyncStatus, onClose: () => void) => {
    switch (status) {
        case SyncStatus.NotChanged:
            return null
        case SyncStatus.Loading:
            return (
                <Snackbar open={true} autoHideDuration={5000} onClose={onClose}>
                    <Alert severity="info">updating indent char...</Alert>
                </Snackbar>
            )
        case SyncStatus.Completed:
            return (
                <Snackbar open={true} autoHideDuration={5000} onClose={onClose}>
                    <Alert severity="success">updated indent char!</Alert>
                </Snackbar>
            )
    }
}

export default App