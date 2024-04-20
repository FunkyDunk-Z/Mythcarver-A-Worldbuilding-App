import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { CodexContextProvider } from './context/CodexContect.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AuthContextProvider>
      <CodexContextProvider>
        <App />
      </CodexContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
