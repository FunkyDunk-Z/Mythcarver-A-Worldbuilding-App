import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// import Codex from '../pages/codex/Codex'
import Dashboard from '../pages/Dashboard'

// categories
import DynamicCategory from '../pages/codex/DynamicCategory'

// import CharacterRoutes from './CharacterRoutes'

export default function CodexRoutes() {
  const { codex } = useCodexContext()

  // use category name as the path .toLowercase
  // pass the docs to the dynamic page, docs are an array of objectids(strings)

  return (
    <>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        {codex?.categories.map((el, i) => {
          return (
            <Route
              key={i}
              path={`/${el.categoryName}`}
              element={
                <DynamicCategory
                  docs={el.docs}
                  categoryName={el.categoryName}
                />
              }
            />
          )
        })}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
