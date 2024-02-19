import { Routes, Route } from "react-router-dom";

import PageNotFound from "../pages/PageNotFound";

import Codex from "../pages/codex/Codex";

// categories
import Bestairy from "../pages/codex/categories/Bestairy";
import Campaigns from "../pages/codex/categories/Campaigns";
import Characters from "../pages/codex/categories/Characters";
import Factions from "../pages/codex/categories/Factions";
import Items from "../pages/codex/categories/Items";
import Locations from "../pages/codex/categories/Locations";
import Lore from "../pages/codex/categories/Lore";
import Nations from "../pages/codex/categories/Nations";
import Species from "../pages/codex/categories/Species";
import Traits from "../pages/codex/categories/Traits";

export default function CodexRoutes() {
  return (
    <Routes>
      <Route index element={<Codex />} />
      <Route path="/bestairy" element={<Bestairy />} />
      <Route path="/campaigns" element={<Campaigns />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/factions" element={<Factions />} />
      <Route path="/items" element={<Items />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/history-and-lore" element={<Lore />} />
      <Route path="/nations" element={<Nations />} />
      <Route path="/species" element={<Species />} />
      <Route path="/traits" element={<Traits />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}
