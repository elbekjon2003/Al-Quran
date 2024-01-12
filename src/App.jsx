import React from 'react'
import './App.css'
import Surahs from './components/Surahs'
import { Routes, Route } from 'react-router-dom'
import Surah from './components/Surah'

function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<Surahs/>}></Route>
        <Route path='surah/:surahId' element={<Surah/>}></Route>
      </Routes>
    </main>
  )
}

export default App
