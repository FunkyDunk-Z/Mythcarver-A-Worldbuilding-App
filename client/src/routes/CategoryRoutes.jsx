import { Routes, Route } from 'react-router-dom'

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
      <Route index element={<Codex pageName="codex" />} />
      <Route path="campaigns" element={<Campaigns pageName="camaigns" />} />
      <Route path="characters" element={<Characters pageName="characters" />} />
      <Route path="factions" element={<Factions pageName="factions" />} />
      <Route path="locations" element={<Locations pageName="locations" />} />
      <Route path="nations" element={<Nations pageName="nations" />} />
      <Route path="species" element={<Species pageName="species" />} />
    </Routes>
  )
}
