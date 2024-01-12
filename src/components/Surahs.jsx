import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import logo from '../assets/logo1.png'

import './Surahs.css'

function Surahs() {
    const surahsApi = 'https://api.alquran.cloud/v1/surah'
    const [surahs, setSurahs] = useState([])
    const {surahId} = useParams()

    const [search, setSearch] = useState('')

    useEffect(()=>{
        fetch(surahsApi)
        .then(res => res.json())
        .then(info => setSurahs(info.data))
    },[])

    console.log(search);
  return (
    <>
        <div className="header">
            <Link to={'/'}>
                <div className="logo">
                    <img src={logo} alt="" />
                    <h2>AL QURAN</h2>
                </div>
            </Link>
            <div className="search">
                <input onChange={e =>{setSearch(e.target.value)}} placeholder={'Search Surah'} type="text" />
                <button><i class="fa-regular fa-magnifying-glass"></i></button>
            </div>
        </div>
        <div className="allSurah">
            {surahs
            .filter(item => {
                return search.toLowerCase() === '' ? item : item.englishName.toLowerCase().includes(search);
            })
            .map((surah, index) =>{
            return(
                    <Link to={`/surah/${surah.number}`} key={index}>
                        <div className="surah" key={index}>
                            <h3>{surah.englishName}</h3>
                            <h3>{surah.name}</h3>
                            <p>Ayahs: {surah.numberOfAyahs}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    </>
  )
}

export default Surahs