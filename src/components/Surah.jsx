import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

import './Surah.css';

function Surah() {
    const [surah, setSurah] = useState({});
    const [surahName, setSurahName] = useState('');
    const { surahId } = useParams();
    const audioRefs = useRef({}); 
    console.log(surahId);

    let sura = `http://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`;

    useEffect(() => {
        fetch(sura)
            .then(res => res.json())
            .then(data => {
                setSurah(data);
                setSurahName(data.data.englishName);
            });
    }, []);

    console.log(surah);
    console.log(surahName);

    const handlePlayButtonClick = (ayahNumber) => {
        // Play the audio when the button is clicked
        if (audioRefs.current[ayahNumber]) {
            audioRefs.current[ayahNumber].play();
        }
    };

    return (
        <div className="suralar">
            <h1 className='surahName'>{surahName}</h1>
            {surah.data &&
                surah.data.ayahs.map((ayah, ayahNum) => (
                    <div key={ayah.number} className="oyat">
                        <div className="details">
                            <button className='play' onClick={() => handlePlayButtonClick(ayah.number)}>
                                <i class="icon fa-regular fa-play"></i>
                            </button>
                            <h2>{surahId} : {ayahNum+1}</h2>
                        </div>
                        <h2>{ayah.text}</h2>
                        <audio ref={(ref) => audioRefs.current[ayah.number] = ref} >
                            <source src={ayah.audio} type="audio/mp3" />
                        </audio>
                    </div>
                ))}
        </div>
    );
}

export default Surah;
