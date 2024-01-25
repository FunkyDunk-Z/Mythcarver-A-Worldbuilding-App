import { Routes, Route } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

import NotFound from '../components/utils/NotFound'
import MyAccount from '../pages/MyAccount'
import UpdateAccountForm from '../components/forms/UpdateAccountForm'

export default function CategoryRoutes() {
  const { user } = useAuthContext()
  return (
    <Routes>
      <Route index element={<MyAccount />} />
      <Route path="/update" element={<UpdateAccountForm user={user} />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}
