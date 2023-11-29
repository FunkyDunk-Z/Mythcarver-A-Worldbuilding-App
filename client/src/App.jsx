import './Global.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Layout
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

// Authentication
import LoginForm from './components/forms/LoginForm'
import ForgotPasswordForm from './components/forms/ForgotPasswordForm'
import SignUpForm from './components/forms/SignUpForm'

// Pages
import LoadingPage from './pages/LoadingPage'
import Dashboard from './pages/Dashboard'
import Codex from './pages/Codex'
import MyAccount from './pages/MyAccount'

// Routes
import CategoryRoutes from './routes/CategoryRoutes'

// Components
import NotFound from './components/utils/NotFound'

function App() {
  const { isLoading, user } = useAuthContext()

  function LoadingComponent({ component }) {
    const url = window.location.href.split('/')[3]

    const authUrl =
      url === 'login' || url === 'sign-up' || url === 'forgot-password'

    if (isLoading) {
      return <LoadingPage />
    }

    if (!user && !authUrl) {
      return <Navigate to={'/login'} />
    }

    if (user && authUrl) {
      return <Navigate to={'/'} />
    }

    return component
  }

  return (
    <div className="container root">
      <Header pageName="header" />
      <Routes>
        <Route
          path="/"
          element={
            <LoadingComponent
              component={<Dashboard pageName={'dashboard'} />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <LoadingComponent component={<LoginForm pageName={'form'} />} />
          }
        />
        <Route
          path="/sign-up"
          element={
            <LoadingComponent component={<SignUpForm pageName={'form'} />} />
          }
        />
        <Route
          path="/forgot-password"
          element={
            <LoadingComponent
              component={<ForgotPasswordForm pageName={'form'} />}
            />
          }
        />
        <Route
          path="/codex/*"
          element={<LoadingComponent component={<CategoryRoutes />} />}
        />
        <Route
          path="/my-account"
          element={
            <LoadingComponent
              component={<MyAccount pageName={'myAccount'} />}
            />
          }
        />
        <Route
          path="*"
          element={
            <LoadingComponent component={<NotFound pageName={'notFound'} />} />
          }
        />
      </Routes>
      <Footer pageName="footer" />
    </div>
  )
}

export default App
