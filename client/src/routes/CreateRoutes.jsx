import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/utils/NotFound'
import CreateCharacter from '../pages/categories/create/CreateCharacter'
import CreateSpecies from '../pages/categories/create/CreateSpecies'

export default function CategoryRoutes() {
  return (
    <Routes>
      <Route index />
      <Route path="/character" element={<CreateCharacter />} />
      <Route path="/species" element={<CreateSpecies />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}
