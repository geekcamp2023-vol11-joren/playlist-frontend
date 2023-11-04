import "./App.css";
import { Route } from "./router/Route.tsx";
import { PlayerPage } from "./pages/player-page.tsx";
import { IndexPage } from "./pages/index-page.tsx";
import { PostPage } from "./pages/post-page.tsx";

function App() {
  return (
    <>
      <Route path={/^\/?$/} component={IndexPage} />
      <Route path={/^\/post\/[0-9a-fA-F-]{36}\/$/} component={PostPage} />
      <Route path={/^\/player\/[0-9a-fA-F-]{36}\/$/} component={PlayerPage} />
    </>
  );
}

export default App;
