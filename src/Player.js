import React, { useState, useEffect } from "react";
import audio from "./music/lofi.mp3";
import MusicButton from "./buttons/MusicButton";
import StopAudioButton from "./buttons/StopAudioButton";

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        if (playing) {
            audio.volume = 0.05;
            audio.loop = true
            audio.play();
        } else {
            audio.pause(); }
        },
        [audio, playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);
    return [playing, toggle];
};

const Player = ({ url = audio }) => {
    const [playing, toggle] = useAudio(url);

    return (
        <div className='player'>
            {playing
                ? <MusicButton onClick={toggle} />
                : <StopAudioButton onClick={toggle} /> }
        </div>
    );
};

export default Player;