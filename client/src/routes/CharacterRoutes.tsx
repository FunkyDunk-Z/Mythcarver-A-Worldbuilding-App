import { Routes, Route } from 'react-router-dom'

import PageNotFound from '../pages/PageNotFound'

import Sidebar from '../components/layout/Sidebar'

import Characters from '../pages/codex/categories/characters/Characters'
import CharacterSheet from '../pages/codex/categories/characters/CharacterSheet'
import CreateCharacter from '../pages/codex/categories/characters/CreateCharacter'

export default function CreateCharacterRoutes() {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route index element={<Characters />} />
        <Route
          path="/create/player-character"
          element={<CreateCharacter selectType="Player" />}
        />
        <Route
          path="/create/npc"
          element={<CreateCharacter selectType="Npc" />}
        />
        <Route path=":id" element={<CharacterSheet />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}
