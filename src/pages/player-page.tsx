import type { Component } from "solid-js";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";

import type { TAPIRespoonse } from "../@types/api";
import type { TMovieItem, TPlaylist } from "../@types/playlist";
import { Playlist } from "../components/playlist/playlist.tsx";
import { QrCode } from "../components/QRCode/index.tsx";
import { YouTubePlayer } from "../components/YouTubePlayer.tsx";

type MemoItem = {
  item: TMovieItem;
  index: number;
  increment: number;
};

export const PlayerPage: Component<{ path?: RegExpMatchArray }> = (params) => {
  const roomId = params.path?.groups?.roomId;
  if (!roomId) {
    throw new Error("roomId is not found");
  }
  const [playlist, setPlaylist] = createSignal<TPlaylist>([], {
    equals: false,
  });
  const [index, setIndex] = createSignal(-1);
  const [increment, setIncrement] = createSignal(0);

  const [socket] = createSignal(
    new WebSocket(
      `wss://joren-playlist-backend.deno.dev/ws/v1/room/${roomId}/`,
    ),
  );
  const _setIndex = (val: number): number => setIndex(val);

  const onMessage = (e: MessageEvent<string>): void => {
    const data = JSON.parse(e.data) as TAPIRespoonse;
    if (data.type === "playlist") {
      setPlaylist([...data.data]);
      if (data.data.length <= index()) {
        _setIndex(0);
      } else if (data.data.length === 0) {
        _setIndex(-1);
      } else if (index() < 0 && data.data.length > 0) {
        _setIndex(0);
      }
    }
  };
  onMount(() => {
    socket().addEventListener("message", onMessage);
  });
  onCleanup(() => {
    socket().removeEventListener("message", onMessage);
    socket().close();
  });
  const url = createMemo<MemoItem>(
    () => {
      return {
        item: playlist()[index()],
        index: index(),
        increment: increment(),
      };
    },
    {
      item: playlist()[index()],
      index: index(),
      increment: increment(),
    },
    { equals: (pv: MemoItem, nv: MemoItem) => pv.index === nv.index },
  );
  const onVideoEnd = (): void => {
    setIndex((pv) => (pv + 1) % playlist().length);
    setIncrement((pv) => pv + 1);
  };
  return (
    <div>
      {index() >= 0 && (
        <YouTubePlayer
          _index={index()}
          _increment={increment()}
          url={url().item.url}
          onEnd={onVideoEnd}
        />
      )}
      <Playlist playlist={playlist()} currentIndex={index()} />
      <QrCode roomId={roomId} />
    </div>
  );
};
