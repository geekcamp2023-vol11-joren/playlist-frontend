import {
  createContext,
  useContext,
  JSX,
  Component,
  onMount,
  onCleanup,
} from "solid-js";

const YouTubeSupportContext = createContext<[Promise<void>]>();

const YouTubeContextProvider: Component<{ children: JSX.Element }> = (
  props,
) => {
  onMount(() => {
    if (document.getElementById("__yt_script")) return;
    const tag = document.createElement("script");
    tag.id = "__yt_script";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
  });
  onCleanup(() => {
    document.getElementById("__yt_script")?.remove();
  });
  const promise = new Promise<void>((resolve) => {
    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };
  });
  return (
    <YouTubeSupportContext.Provider value={[promise]}>
      {props.children}
    </YouTubeSupportContext.Provider>
  );
};

export function useYouTubeSupportInited() {
  return useContext(YouTubeSupportContext);
}

export { YouTubeSupportContext, YouTubeContextProvider };
