import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// Pages
import Dashboard from '../pages/Dashboard'
import DynamicCategory from '../pages/codex/DynamicCategory'
import DynamicDocument from '../pages/codex/DynamicDocument'
import DynamicCreateDocument from '../pages/codex/DynamicCreateDocument'

export default function DynamicRoutes() {
  const { currentCodex } = useCodexContext()
  const categories = currentCodex?.categories.map((el) => el)

  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      {categories?.map((el, i) => (
        // Categories
        <Route
          key={i}
          path={`/${el.categoryUrl}/*`}
          index
          element={<DynamicCategory category={el} />}
        />
      ))}
      {categories?.map((el, i) => (
        // Create Doc
        <Route
          key={i}
          path={`/${el.categoryUrl}/create`}
          index
          element={<DynamicCreateDocument />}
        />
      ))}
      {categories?.map((el, i) =>
        // Documents
        el.docs.map((doc, j) => (
          <Route
            key={`${i}-${j}`}
            path={`/${el.categoryUrl}/${doc.docId}`}
            element={
              <DynamicDocument categoryUrl={el.categoryUrl} docId={doc.docId} />
            }
          />
        ))
      )}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}
