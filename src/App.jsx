import { Routes, Route, Outlet, Link } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./views/Home";
import NoMatch from "./views/NoMatch";
import Entertainment from "./views/Entertainment";
import Blog from "./views/Blog";
export default function App() {
  return (
    <div>


      {/* Routes nest inside one another. Nested route paths build upon
            parent route paths, and nested route elements render inside
            parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/blog/:id" element={<Blog />} />

          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

