import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// css global
import './Global.css'

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
import MyAccount from './pages/MyAccount'

// Routes
import CategoryRoutes from './routes/CategoryRoutes'
import CreateRoutes from './routes/CreateRoutes'

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
      return <Navigate to={'/login'} replace={true} />
    }

    if (user && authUrl) {
      return <Navigate to={'/'} replace={true} />
    }

    return component
  }

  return (
    <div className="container root">
      <Header pageName="header" />
      <Routes>
        <Route
          path="/"
          element={<LoadingComponent component={<Dashboard />} />}
        />
        <Route
          path="/login"
          element={<LoadingComponent component={<LoginForm />} />}
        />
        <Route
          path="/sign-up"
          element={<LoadingComponent component={<SignUpForm />} />}
        />
        <Route
          path="/forgot-password"
          element={<LoadingComponent component={<ForgotPasswordForm />} />}
        />
        {user
          ? user.codex.map((el, i) => (
              <Route
                key={i}
                path={`/codex/:${el._id}/*`}
                element={<LoadingComponent component={<CategoryRoutes />} />}
              />
            ))
          : ''}
        <Route
          path="/create/*"
          element={<LoadingComponent component={<CreateRoutes />} />}
        />
        <Route
          path="/my-account"
          element={<LoadingComponent component={<MyAccount />} />}
        />
        <Route
          path="*"
          element={<LoadingComponent component={<NotFound />} />}
        />
      </Routes>
      <Footer pageName="footer" />
    </div>
  )
}

export default App
