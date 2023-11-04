import {onCleanup, onMount} from "solid-js";
import {useYouTubeSupportInited} from "./YouTubeSupportContext.tsx";

const YouTubeSupport = () => {
  const params = useYouTubeSupportInited();
  onMount(() => {
    if (document.getElementById("__yt_script")) return;
    const tag = document.createElement("script");
    tag.id = "__yt_script";
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    window.onYouTubeIframeAPIReady = () => {
      params?.[1](true);
    };
  });
  onCleanup(()=>{
    document.getElementById("__yt_script")?.remove();
  })
  return <></>;
}

export {YouTubeSupport}