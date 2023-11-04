import type { Component } from "solid-js";
import { createEffect, onCleanup, onMount } from "solid-js";

import { useYouTubeSupportInited } from "./YouTubeSupportContext.tsx";

type Props = {
  url: string;
  className?: string;
  _index: number;
  _increment: number;
  onEnd: () => void;
};
const YouTubePlayer: Component<Props> = (props) => {
  let wrapperRef: HTMLDivElement | undefined = undefined;
  let player: YT.Player | undefined = undefined;
  const [isYouTubeReady] = useYouTubeSupportInited()!;
  onMount(() => {
    if (!wrapperRef) return;
    const tag = document.createElement("div");
    tag.id = `__yt_player`;
    wrapperRef.append(tag);
  });
  createEffect(async () => {
    console.log("index", props._index, props._increment);
    if (player) {
      player.loadVideoById(props.url);
      return;
    }
    await isYouTubeReady;
    player = new window.YT.Player("__yt_player", {
      videoId: props.url,
      playerVars: { autoplay: 1, fs: 0, modestbranding: 1 },
      events: {
        onStateChange: (e) => {
          console.log(e.data);
          if (e.data === 0) {
            console.log("end");
            props.onEnd();
          }
          //0 - ended
        },
      },
    }) as YT.Player;
  }, [props.url, props._index, props._increment]);
  onCleanup(() => {
    player?.destroy();
  });
  return <div class={props.className} ref={wrapperRef} id={"terst"} />;
};

export { YouTubePlayer };
