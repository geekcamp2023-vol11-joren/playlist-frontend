import "./App.css";
import { Route } from "./router/Route.tsx";
import { PlayerPage } from "./pages/player-page.tsx";
import { IndexPage } from "./pages/index-page.tsx";
import { PostPage } from "./pages/post-page.tsx";
import {YouTubeContextProvider} from "./components/YouTubeSupportContext.tsx";
import {YouTubeSupport} from "./components/YouTubeSupport.tsx";

function App() {
  return (
    <YouTubeContextProvider>
      <Route path={/^\/?$/} component={IndexPage}/>
      <Route path={/^\/post\/[0-9a-fA-F-]{36}\/$/} component={PostPage}/>
      <Route path={/^\/player\/(?<roomId>[0-9a-fA-F-]{36})\/$/} component={PlayerPage}/>
      
      <YouTubeSupport/>
    </YouTubeContextProvider>
  );
}

export default App;
