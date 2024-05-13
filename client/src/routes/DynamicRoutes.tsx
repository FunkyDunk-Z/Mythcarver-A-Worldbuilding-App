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
      {activeCodex?.categories.map((el, i) => (
        // Categories
        <Route
          key={i}
          path={`/${el.categoryUrl}/*`}
          index
          element={
            <DynamicCategory docs={el.docs} categoryName={el.categoryName} />
          }
        />
      ))}
      {activeCodex?.categories.map((el, i) =>
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
