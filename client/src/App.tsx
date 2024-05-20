import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuthContext } from './hooks/useAuthContext'
import { useCodexContext } from './hooks/useCodexContext'
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

// Errors
import PageNotFound from './pages/PageNotFound'
import PageUnderConstruction from './pages/PageUnderConstruction'

// Pages
import LoadingPage from './pages/LoadingPage'
import MyAccount from './pages/MyAccount'
import CreateCodex from './pages/codex/CreateCodex'
import DynamicRoutes from './routes/DynamicRoutes'
// import TurnTracker from "./pages/TurnTracker";

function App() {
  const { user, isLoading } = useAuthContext()
  const { currentCodex } = useCodexContext()
  const { authFetch } = useAuthFetch()
  // const [isLoading, setIsLoading] = useState(false)
  // const isLoading = useRef(false)

  //---------- Check if logged in ----------

  useEffect(() => {
    authFetch({
      url: 'users/is-logged-in',
      authType: 'isLoggedIn',
      requestType: 'POST',
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(user)

  //---------- Authorised Navigation ----------
  function LoadingComponent({ component }: { component: React.JSX.Element }) {
    const url = window.location.href.split('/')[3]
    const authUrl =
      url === 'login' || url === 'sign-up' || url === 'forgot-password'

    if (isLoading) {
      return <LoadingPage />
    }

    if (user && authUrl) {
      return <Navigate to={`/${currentCodex?.codexUrl}`} replace={true} />
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
            path={`/${currentCodex?.codexUrl}/*`}
            element={<LoadingComponent component={<DynamicRoutes />} />}
          />
          <Route path="/create-codex" element={<CreateCodex />} />
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
