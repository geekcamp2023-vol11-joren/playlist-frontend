import type { Component } from "solid-js";
import { createMemo, createSignal, onCleanup, onMount } from "solid-js";

import type { TAPIRespoonse } from "../@types/api";
import type { MemoItem } from "../@types/player";
import type { TPlaylist } from "../@types/playlist";
import { Playlist } from "../components/playlist/playlist.tsx";
import { QrCode } from "../components/QRCode/index.tsx";
import { PlayerWrapper } from "../components/VideoPlayer.tsx";
import Styles from "./player-page.module.scss";

export const PlayerPage: Component<{ path?: RegExpMatchArray }> = (params) => {
  const roomId = params.path?.groups?.roomId;
  if (!roomId) {
    throw new Error("roomId is not found");
  }
  const [playlist, setPlaylist] = createSignal<TPlaylist>([], {
    equals: false,
  });
  const [index, setIndex] = createSignal(-1);
  const [increment, setIncrement] = createSignal(-1);
  const [autoPlay, setAutoPlay] = createSignal(false);

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
        setAutoPlay(true);
      } else if (data.data.length === 0) {
        _setIndex(-1);
      } else if (index() < 0 && data.data.length > 0) {
        _setIndex(0);
      }
    }
    if (increment() < 0 && playlist()[index()]) {
      setIncrement(0);
    }
  };
  onMount(() => {
    socket().addEventListener("message", onMessage);
  });
  onCleanup(() => {
    socket().removeEventListener("message", onMessage);
    socket().close();
  });
  const item = createMemo<MemoItem>(
    () => {
      console.log(index(), increment(), playlist()[index()]);
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
    { equals: (pv: MemoItem, nv: MemoItem) => pv.increment === nv.increment },
  );
  const onVideoEnd = (): void => {
    console.log("onVideoEnd");
    setAutoPlay(true);
    setIndex((pv) => (pv + 1) % playlist().length);
    setIncrement((pv) => pv + 1);
  };
  return (
    <div class={Styles.wrapper}>
      <div class={Styles.main}>
        <div class={`${Styles.youtube}`}>
          <PlayerWrapper
            url={item()}
            _increment={increment()}
            _index={index()}
            className={Styles.player}
            onEnd={onVideoEnd}
            autoPlay={autoPlay()}
          />
        </div>
        <QrCode roomId={roomId} />
      </div>
      <div class={Styles.aside}>
        <Playlist
          playlist={playlist()}
          increment={increment()}
          currentIndex={index()}
          className={Styles.playlist}
        />
      </div>
    </div>
  );
};
