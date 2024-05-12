import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// Pages
import Dashboard from '../pages/Dashboard'
import DynamicCategory from '../pages/codex/DynamicCategory'
import DynamicDocument from '../pages/codex/DynamicDocument'

export default function DynamicRoutes() {
  const { activeCodex } = useCodexContext()

  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {activeCodex?.categories.map((el, i) => {
        // Categories
        return (
          <Route
            key={i}
            path={`/${el.categoryName}/*`}
            index
            element={
              <DynamicCategory docs={el.docs} categoryName={el.categoryName} />
            }
          />
        )
      })}

      {activeCodex?.categories.map((category) => {
        // Documents
        return category.docs.map((el, i) => {
          return (
            <Route
              key={i}
              path={`/${category.categoryName}/:id`}
              element={<DynamicDocument docId={el.docId} />}
            />
          )
        })
      })}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}
