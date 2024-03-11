import { Routes, Route } from 'react-router-dom'

import PageNotFound from '../pages/PageNotFound'

import Characters from '../pages/codex/categories/characters/Characters'
import CharacterSheet from '../pages/codex/categories/characters/CharacterSheet'
import CreateCharacter from '../pages/codex/categories/characters/CreateCharacter'

export default function CreateCharacterRoutes() {
  return (
    <Routes>
      <Route index element={<Characters />} />
      <Route path="/create" element={<CreateCharacter />} />
      <Route path=":id" element={<CharacterSheet />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  )
}
