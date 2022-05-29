import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./buttons/PlayButton";
import PauseButton from "./buttons/PauseButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./SettingsContext";
import Tasks from "./Tasks";
import ReloadButton from "./buttons/ReloadButton";
import SettingsButton from "./buttons/SettingsButton";

function Timer() {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function reloadTime() {
        if (modeRef.current === 'work') {
            secondsLeftRef.current = settingsInfo.workMinutes * 60;
            setSecondsLeft(secondsLeftRef.current)
            return;
        }

        if (modeRef.current === 'break') {
            secondsLeftRef.current = settingsInfo.breakMinutes * 60;
            setSecondsLeft(secondsLeftRef.current);
        }
    }

    useEffect(() => {

        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        },100);

        return () => clearInterval(interval);
    }, [settingsInfo]);

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div className={'main_content'}>
            <div className={'timer'}>
                <CircularProgressbar
                    value={percentage}
                    text={minutes + ':' + seconds}
                    styles={buildStyles({
                        textColor:'#ffffff',
                        pathColor:mode === 'work' ? '#d57fde' : '#62b7d9',
                        trailColor:'rgb(238,215,255)',
                    })} />
                <div className='timer_buttons'>
                    <ReloadButton onClick={reloadTime}/>
                    {isPaused
                        ? <PlayButton onClick={() => { setIsPaused(false);
                            isPausedRef.current = false;}} />
                        : <PauseButton onClick={() => { setIsPaused(true); isPausedRef.current = true;}} />}
                </div>
            </div>

            <div className='right_content'>
                <Tasks/>
                <div className='settings_buttons'>
                    <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />
                </div>
            </div>
        </div>
    );
}

export default Timer;