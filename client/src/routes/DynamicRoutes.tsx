import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// Pages
import Dashboard from '../pages/Dashboard'
import CreateCodex from '../pages/codex/CreateCodex'
import DynamicCategory from '../pages/codex/DynamicCategory'
import DynamicDocument from '../pages/codex/DynamicDocument'
import DynamicCreateDocument from '../pages/codex/DynamicCreateDocument'

export default function DynamicRoutes() {
  const { activeCodex } = useCodexContext()

  return (
    <Routes>
      <Route path="/" index element={<Dashboard />} />
      <Route path="/create-codex" element={<CreateCodex />} />
      {activeCodex?.categories.map((el, i) => (
        // Categories
        <Route
          key={i}
          path={`/${el.categoryUrl}/*`}
          index
          element={<DynamicCategory category={el} />}
        />
      ))}
      {activeCodex?.categories.map((el, i) => (
        // Create Doc
        <Route
          key={i}
          path={`/${el.categoryUrl}/create`}
          index
          element={<DynamicCreateDocument />}
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
