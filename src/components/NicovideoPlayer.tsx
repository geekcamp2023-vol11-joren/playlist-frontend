import type { Component } from "solid-js";
import { onCleanup, onMount } from "solid-js";

import type { NicoMessage } from "../@types/nicovideo";

type Props = {
  url: string;
  className?: string;
  _index?: number;
  _increment?: number;
  onEnd?: () => void;
  autoPlay: boolean;
};

const NicovideoPlayer: Component<Props> = (props) => {
  let iframe: HTMLIFrameElement | undefined = undefined;

  const controls = {
    play: () => {
      iframe?.contentWindow?.postMessage(
        {
          eventName: "play",
          sourceConnectorType: 1,
          playerId: "1",
        },
        "https://embed.nicovideo.jp",
      );
    },
    pause: () => {
      iframe?.contentWindow?.postMessage(
        {
          eventName: "pause",
          sourceConnectorType: 1,
          playerId: "1",
        },
        "https://embed.nicovideo.jp",
      );
    },
    seek: (time: number) => {
      iframe?.contentWindow?.postMessage(
        {
          eventName: "seek",
          data: {
            time,
          },
          sourceConnectorType: 1,
          playerId: "1",
        },
        "https://embed.nicovideo.jp",
      );
    },
  };

  const nicoApiHandler = (e: MessageEvent<NicoMessage>): void => {
    if (e.origin === "https://embed.nicovideo.jp") {
      console.log(e);
      if (e.data.eventName === "loadComplete") {
        props.autoPlay && controls.play();
      } else if (e.data.eventName === "statusChange") {
        if (e.data.data.playerStatus === 4) {
          props.onEnd?.();
        }
      }
    }
  };
  onMount(() => {
    window.addEventListener("message", nicoApiHandler);
  });
  onCleanup(() => {
    window.removeEventListener("message", nicoApiHandler);
  });

  return (
    <iframe
      ref={iframe}
      src={`https://embed.nicovideo.jp/watch/${props.url}?jsapi=1&playerId=1`}
      width={1920}
      height={1080}
      class={props.className}
    />
  );
};

export { NicovideoPlayer };
