import type { Component } from "solid-js";
import { createEffect, onCleanup, onMount } from "solid-js";

import Styles from "./YouTubePlayer.module.scss";
import { useYouTubeSupportInited } from "./YouTubeSupportContext.tsx";

type Props = {
  url: string;
  className?: string;
  _index?: number;
  _increment?: number;
  onEnd?: () => void;
  muted?: boolean;
  autoPlay: boolean;
};
const YouTubePlayer: Component<Props> = (props) => {
  let wrapperRef: HTMLDivElement | undefined = undefined;
  let player: YT.Player | undefined = undefined;
  const [isYouTubeReady] = useYouTubeSupportInited()!;
  onMount(() => {
    if (!wrapperRef) return;
    const tag = document.createElement("div");
    tag.id = `__yt_player`;
    tag.className = Styles.iframe;
    wrapperRef.append(tag);
  });
  createEffect(async () => {
    console.log(props._index, props._increment, props.url, player);
    if (player) {
      player.loadVideoById(props.url);
      return;
    }
    await isYouTubeReady;
    console.log("create player", props.url);
    player = new window.YT.Player("__yt_player", {
      videoId: props.url,
      playerVars: {
        autoplay: props.autoPlay ? 1 : 0,
        fs: 0,
        modestbranding: 1,
      },
      events: {
        onStateChange: (e) => {
          if (e.data === 0) {
            props.onEnd?.();
          }
        },
      },
    }) as YT.Player;
  });
  onCleanup(() => {
    player?.destroy();
  });
  return <div class={props.className} ref={wrapperRef} id={"terst"} />;
};

export { YouTubePlayer };
