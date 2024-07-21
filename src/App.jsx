import { Routes, Route, Outlet, Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import Entertainment from "./views/Entertainment";
import Blog from "./views/Blog";
import EditorPanel from "./views/EditorPanel";

export const BASEURL = "https://my-testapi.tinatettherbalpos.com";
// export const BASEURL="http://localhost:5600"
export default function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/category/:category" element={<Entertainment />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/editor" element={<EditorPanel />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}
