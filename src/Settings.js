import ReactSlider from "react-slider";
import './css/Settings.css'
import SettingsContext from "./SettingsContext";
import {useContext} from "react";

function Settings() {
    const settingsContext = useContext(SettingsContext)
    return (
        <div style={{textAlign: 'left'}}>
            <label>Work minutes: {settingsContext.workMinutes}</label>
            <ReactSlider
                className={'slider work'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsContext.workMinutes}
                onChange = {
                    newValue => settingsContext.setWorkMinutes(newValue)
                }
                min={1}
                max={120}
            />
            <label>Break minutes: {settingsContext.breakMinutes}</label>
            <ReactSlider
                className={'slider break'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsContext.breakMinutes}
                onChange = {
                    newValue => settingsContext.setBreakMinutes(newValue)
                }
                min={1}
                max={120}
            />
        </div>
    );
}

export default Settings;