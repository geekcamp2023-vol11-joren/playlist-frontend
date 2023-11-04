import {createSignal, createContext, useContext, JSX, Component, Accessor, Setter} from "solid-js";

const YouTubeSupportContext = createContext<[Accessor<boolean>,Setter<boolean>]>();

const  YouTubeContextProvider:Component<{children:JSX.Element}> = (props) => {
  const [inited, setInited] = createSignal(false);
  return (
    <YouTubeSupportContext.Provider value={[inited,setInited]}>
      {props.children}
    </YouTubeSupportContext.Provider>
  );
}

export function useYouTubeSupportInited() { return useContext(YouTubeSupportContext); }

export {YouTubeSupportContext, YouTubeContextProvider}