import { Routes, Route } from 'react-router-dom'
import { useCodexContext } from '../hooks/useCodexContext'

import PageNotFound from '../pages/PageNotFound'

// categories
import DynamicCategory from '../pages/codex/DynamicCategory'
// import DynamicDocument from '../pages/codex/DynamicDocument'

export default function DynamicRoutes() {
  const { activeCodex } = useCodexContext()

  return (
    <Routes>
      {activeCodex?.categories.map((el, i) => {
        return (
          <Route
            key={i}
            path="/"
            index
            element={
              <DynamicCategory docs={el.docs} categoryName={el.categoryName} />
            }
          />
        )
      })}
      {/* {activeCodex?.categories.map((el) => {
        return el.docs.map((el, i) => {
          return (
            <Route
              key={i}
              path=":id"
              element={<DynamicDocument docId={el.docId} />}
            />
          )
        })
      })} */}
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}
