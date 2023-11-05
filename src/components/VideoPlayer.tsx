import type { Component } from "solid-js";
import { createMemo } from "solid-js";

import type { MemoItem } from "../@types/player";
import { NicovideoPlayer } from "./NicovideoPlayer.tsx";
import { YouTubePlayer } from "./YouTubePlayer.tsx";

type PlayerWrapperProps = {
  _index: number;
  _increment: number;
  url?: MemoItem;
  onEnd?: () => void;
  className?: string;
  hideMessage?: boolean;
  autoPlay?: boolean;
};

const PlayerWrapper: Component<PlayerWrapperProps> = (props) => {
  const url = createMemo(
    () => {
      console.log(props.url);
      return props.url?.item?.url;
    },
    undefined,
    { equals: false },
  );
  return (
    <>
      {!url() && !props.hideMessage && <span>動画を追加してください...</span>}
      {props.url?.item?.type === "youtube" && (
        <YouTubePlayer
          _index={props._index}
          _increment={props._increment}
          url={url()!}
          onEnd={props.onEnd}
          className={props.className}
          autoPlay={props.autoPlay ?? true}
        />
      )}
      {props.url?.item?.type === "nicovideo" && (
        <NicovideoPlayer
          _index={props._index}
          _increment={props._increment}
          url={url()!}
          onEnd={props.onEnd}
          className={props.className}
          autoPlay={props.autoPlay ?? true}
        />
      )}
    </>
  );
};

export { PlayerWrapper };
