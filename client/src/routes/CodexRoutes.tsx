import { Routes, Route } from 'react-router-dom'

import PageNotFound from '../pages/PageNotFound'

import Codex from '../pages/codex/Codex'

// categories
import Bestairy from '../pages/codex/categories/bestairy/Bestairy'
import Campaigns from '../pages/codex/categories/campaigns/Campaigns'
import Factions from '../pages/codex/categories/factions/Factions'
import Items from '../pages/codex/categories/items/Items'
import Locations from '../pages/codex/categories/locations/Locations'
import Lore from '../pages/codex/categories/lore/Lore'
import Nations from '../pages/codex/categories/nations/Nations'
import Species from '../pages/codex/categories/species/Species'
import Traits from '../pages/codex/categories/traits/Traits'

import CharacterRoutes from './CharacterRoutes'

export default function CodexRoutes() {
  return (
    <>
      <Routes>
        <Route index element={<Codex />} />
        <Route path="/bestairy" element={<Bestairy />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/characters/*" element={<CharacterRoutes />} />
        <Route path="/factions" element={<Factions />} />
        <Route path="/items" element={<Items />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/history-and-lore" element={<Lore />} />
        <Route path="/nations" element={<Nations />} />
        <Route path="/species" element={<Species />} />
        <Route path="/traits" element={<Traits />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
