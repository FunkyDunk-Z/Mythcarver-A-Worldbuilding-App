import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'

// Hooks
import { useAuthContext } from './hooks/useAuthContext'
import { useAuthFetch } from './hooks/useAuthFetch'

// Style
import './Global.css'

// Authentication
import LoginPage from './pages/auth/LoginPage'
import SignUpPage from './pages/auth/SignUpPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Routes
import CodexRoutes from './routes/CodexRoutes'

// Errors
import PageNotFound from './pages/PageNotFound'
import PageUnderConstruction from './pages/PageUnderConstruction'

// Pages
import LoadingPage from './pages/LoadingPage'
import Dashboard from './pages/Dashboard'
import MyAccount from './pages/MyAccount'
// import TurnTracker from "./pages/TurnTracker";

function App() {
  const { user, isLoading } = useAuthContext()
  const { authFetch } = useAuthFetch()
  const navigate = useNavigate()
  const userCodexNames = user?.codex.map((el) => {
    return el?.codexName
  })

  //---------- Check if logged in ----------
  useEffect(() => {
    authFetch({
      url: 'users/is-logged-in',
      credentials: true,
      authType: 'isLoggedIn',
      requestType: 'POST',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //---------- Check for current codex -----------
  useEffect(() => {
    const url = window.location.href
      .split('/')[3]
      .split('-')
      .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
      .join(' ')

    if (userCodexNames) {
      const allowedUrls = [...userCodexNames, 'My Account', 'Turn Tracker']

      if (allowedUrls.includes(url)) {
        const codexExists = user?.codex.find(
          (codex) => codex?.codexName === url
        )

        if (codexExists) {
          localStorage.setItem('currentCodexId', codexExists._id)
        }
      } else {
        navigate('/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //---------- Authorised Navigation ----------
  function LoadingComponent({ component }: { component: React.JSX.Element }) {
    const url = window.location.href.split('/')[3]

    const authUrl =
      url === 'login' || url === 'sign-up' || url === 'forgot-password'

    if (isLoading) {
      return <LoadingPage />
    }

    if (user && authUrl) {
      return <Navigate to={'/'} replace={true} />
    }

    if (!user && !authUrl) {
      return <Navigate to={'/login'} replace={true} />
    }

    return component
  }

  return (
    <>
      <div className="wrapper global">
        <Header />
        <Routes>
          <Route
            path="/"
            element={<LoadingComponent component={<Dashboard />} />}
          />
          <Route
            path="/login"
            element={<LoadingComponent component={<LoginPage />} />}
          />
          <Route
            path="/sign-up"
            element={<LoadingComponent component={<SignUpPage />} />}
          />
          <Route
            path="/forgot-password"
            element={<LoadingComponent component={<ForgotPasswordPage />} />}
          />
          <Route
            path="/my-account"
            element={<LoadingComponent component={<MyAccount />} />}
          />
          <Route
            path="/turn-tracker"
            element={<LoadingComponent component={<PageUnderConstruction />} />}
          />
          {user ? (
            <Route
              path=":id/*"
              element={<LoadingComponent component={<CodexRoutes />} />}
            />
          ) : (
            ''
          )}
          <Route
            path="*"
            element={<LoadingComponent component={<PageNotFound />} />}
          />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
