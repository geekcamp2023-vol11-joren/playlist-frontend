import "./App.css";

import type { Component } from "solid-js";

import { YouTubeContextProvider } from "./components/YouTubeSupportContext.tsx";
import { IndexPage } from "./pages/index-page.tsx";
import { PlayerPage } from "./pages/player-page.tsx";
import { PostPage } from "./pages/post-page.tsx";
import { Route } from "./router/Route.tsx";

const App: Component = () => {
  return (
    <YouTubeContextProvider>
      <Route path={/^\/?$/} component={IndexPage} />
      <Route path={/^\/post\/[0-9a-fA-F-]{36}\/$/} component={PostPage} />
      <Route
        path={/^\/player\/(?<roomId>[0-9a-fA-F-]{36})\/$/}
        component={PlayerPage}
      />
    </YouTubeContextProvider>
  );
};

export default App;
