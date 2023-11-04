import {useYouTubeSupportInited} from "./YouTubeSupportContext.tsx";
import {Component, createEffect, onCleanup, onMount} from "solid-js";

type Props = {
  url: string;
  className?: string;
  _index: number;
  onEnd: () => void;
}
const YouTubePlayer: Component<Props> = (props) => {
  console.log("index",props._index);
  let wrapperRef: HTMLDivElement;
  let player: Window.YT.Player;
  const [isYouTubeReady] = useYouTubeSupportInited()??[()=>false];
  if (!isYouTubeReady()) return <></>;
  onMount(()=>{
    if (!wrapperRef) return;
    const tag = document.createElement("div");
    tag.id = `__yt_player`;
    wrapperRef.append(tag);
  })
  createEffect(()=>{
    player?.destroy();
    player = new window.YT.Player("__yt_player", {
      videoId: props.url,
      playerVars: {autoplay:1,fs:0,modestbranding:1},
      events: {
        onStateChange: (e) => {
          console.log(e.data);
          if (e.data === 0) {
            console.log("end")
            props.onEnd();
          }
          //0 - ended
        },
      },
    });
  },props.url);
  onCleanup(()=>{
    player.destroy();
  })
  return <div class={props.className} ref={wrapperRef} id={"terst"} />;
}

export {YouTubePlayer}