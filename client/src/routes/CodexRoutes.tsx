import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// import Codex from '../pages/codex/Codex'
import Dashboard from '../pages/Dashboard'

// categories
// import DynamicCategory from '../pages/codex/DynamicCategory'
// import DynamicDocument from '../pages/codex/DynamicDocument'

// import CharacterRoutes from './CharacterRoutes'
import DynamicRoutes from './DynamicRoutes'

export default function CodexRoutes() {
  const { activeCodex } = useCodexContext()

  // use category name as the path .toLowercase
  // pass the docs to the dynamic page, docs are an array of objectids(strings)

  return (
    <>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        {activeCodex?.categories.map((el, i) => (
          <Route
            key={i}
            path={`/${el.categoryName}/*`}
            element={<DynamicRoutes />}
          />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
