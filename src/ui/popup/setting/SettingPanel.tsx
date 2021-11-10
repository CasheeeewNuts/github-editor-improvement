import {h, FunctionalComponent} from "preact";
import {FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {Char} from "../../../lib/char";



type Props = {
    initialChar: Char,
    handlerFactory: (char: Char) => () => void
}

const SettingPanel: FunctionalComponent<Props> = ({initialChar, handlerFactory}) => {

    return (
        <FormControl component="fieldset">
            <FormControl component="legend">choose indent character</FormControl>
            <RadioGroup aria-label="character" value={initialChar}>
                <FormControlLabel control={<Radio size="small" value={Char.X2Spaces} onChange={handlerFactory(Char.X2Spaces)}/>} label="x2 spaces" />
                <FormControlLabel control={<Radio size="small" value={Char.X4Spaces} onChange={handlerFactory(Char.X4Spaces)}/>} label="x4 spaces" />
                <FormControlLabel control={<Radio size="small" value={Char.TabChar} onChange={handlerFactory(Char.TabChar)}/>} label="\t" />
            </RadioGroup>
        </FormControl>
    )
}

export default SettingPanel