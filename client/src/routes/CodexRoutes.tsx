import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

import Dashboard from '../pages/Dashboard'

// categories
import DynamicCategory from '../pages/codex/DynamicCategory'
// import DynamicRoutes from './DynamicRoutes'

export default function CodexRoutes() {
  const { activeCodex } = useCodexContext()

  return (
    <>
      <Routes>
        <Route path="/" index element={<Dashboard />} />
        {activeCodex?.categories.map((el, i) => (
          <Route
            key={i}
            path={`/${el.categoryName}/*`}
            element={
              // <DynamicRoutes />
              <DynamicCategory docs={el.docs} categoryName={el.categoryName} />
            }
          />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
