import './App.css'
import {Route} from "./router/Route.tsx";
import {PlayerPage} from "./pages/player-page.tsx";

function App() {
  return (
    <>
      <Route path={/\/player\/[0-9a-fA-F-]{36}\//} component={PlayerPage} />
    </>
  )
}

export default App
