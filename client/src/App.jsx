import './Global.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Authentication

// Pages
import Home from './pages/Home'
import Codex from './pages/Codex'

// Components
import Loading from './components/utils/Loading'

function App() {
  // Set screen height for mobile
  const docHeight = () => {
    const doc = document.documentElement
    doc.style.setProperty('--doc-height', `${window.innerHeight}px`)
  }
  window.addEventListener('resize', docHeight)
  docHeight()

  // Page Authentication
  const { user, isLoading } = useAuthContext()

  function LoadingComponent({ component }) {
    const url = window.location.href.split('/')[3]

    const authUrl = url === '' || url === 'sign-up' || url === 'forgot-password'

    if (isLoading) {
      return <Loading />
    }

    if (!user && !authUrl) {
      return <Navigate to={'/'} />
    }

    if (user && authUrl) {
      return <Navigate to={'/codex'} />
    }

    return component
  }

  return (
    <>
      <div className="container root">
        <BrowserRouter>
          <Header pageName="header" />
          <Routes>
            <Route
              path="/"
              element={<LoadingComponent component={<Home />} />}
            />
            <Route
              path="/codex"
              element={<LoadingComponent component={<Codex />} />}
            />
          </Routes>
          <Footer pageName="footer" />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
