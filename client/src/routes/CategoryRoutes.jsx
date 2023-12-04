import { Routes, Route } from 'react-router-dom'
import NotFound from '../components/utils/NotFound'

import Codex from '../pages/Codex'
import Campaigns from '../pages/categories/Campaigns'
import Characters from '../pages/categories/Characters'
import Factions from '../pages/categories/Factions'
import Locations from '../pages/categories/Locations'
import Nations from '../pages/categories/Nations'
import Species from '../pages/categories/Species'

export default function CategoryRoutes() {
  return (
    <Routes>
      <Route index element={<Codex />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/factions" element={<Factions />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/nations" element={<Nations />} />
      <Route path="/species" element={<Species />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}
