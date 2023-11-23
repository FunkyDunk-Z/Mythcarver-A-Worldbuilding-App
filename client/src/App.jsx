import './Global.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Pages
import Home from './pages/Home'
import Codex from './pages/Codex'

function App() {
  const docHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', docHeight)
  docHeight()

  return (
    <>
      <div className="container root">
        <BrowserRouter>
          <Header pageName="header" />
          <Routes>
            <Route path="/" element={<Home pageName="home" />} />
            <Route path="/codex" element={<Codex pageName="codex" />} />
          </Routes>
          <Footer pageName="footer" />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
