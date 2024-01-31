import { Routes, Route } from 'react-router-dom'

import NotFound from '../components/utils/NotFound'
import MyAccount from '../pages/MyAccount'
import UpdateAccountForm from '../components/forms/UpdateAccountForm'

export default function CategoryRoutes() {
  return (
    <Routes>
      <Route index element={<MyAccount />} />
      <Route path="/update" element={<UpdateAccountForm />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}
