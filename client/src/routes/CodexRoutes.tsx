import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// import Codex from '../pages/codex/Codex'
import Dashboard from '../pages/Dashboard'

// categories
import DynamicCategory from '../pages/codex/DynamicCategory'
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
  const { codex } = useCodexContext()

  // use category name as the path .toLowercase
  // pass the docs to the dynamic page, docs are an array of objectids(strings)

  return (
    <>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        {codex?.categories.map((el, i) => (
          <Route
            key={i}
            path={`/${el.categoryName}`}
            element={<DynamicCategory categoryId={el._id} />}
          />
        ))}
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
