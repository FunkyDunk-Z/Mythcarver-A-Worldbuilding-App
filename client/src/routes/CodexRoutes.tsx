import { Routes, Route } from "react-router-dom";

import PageNotFound from "../pages/PageNotFound";
import PageUnderConstruction from "../pages/PageUnderConstruction";

import Codex from "../pages/codex/Codex";

// categories
// import Bestairy from "../pages/codex/categories/Bestairy";
// import Campaigns from "../pages/codex/categories/Campaigns";
import Characters from "../pages/codex/categories/Characters";
// import Factions from "../pages/codex/categories/Factions";
// import Items from "../pages/codex/categories/Items";
// import Locations from "../pages/codex/categories/Locations";
// import Lore from "../pages/codex/categories/Lore";
// import Nations from "../pages/codex/categories/Nations";
// import Species from "../pages/codex/categories/Species";
// import Traits from "../pages/codex/categories/Traits";

export default function CodexRoutes() {
  return (
    <Routes>
      <Route index element={<Codex />} />
      <Route path="/bestairy" element={<PageUnderConstruction />} />
      <Route path="/campaigns" element={<PageUnderConstruction />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/factions" element={<PageUnderConstruction />} />
      <Route path="/items" element={<PageUnderConstruction />} />
      <Route path="/locations" element={<PageUnderConstruction />} />
      <Route path="/history-and-lore" element={<PageUnderConstruction />} />
      <Route path="/nations" element={<PageUnderConstruction />} />
      <Route path="/species" element={<PageUnderConstruction />} />
      <Route path="/traits" element={<PageUnderConstruction />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
