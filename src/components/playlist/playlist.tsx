import type { Component } from "solid-js";
import { createEffect, createMemo, createSignal, For } from "solid-js";

import type { TPlaylist } from "../../@types/playlist";
import Styles from "./playlist.module.scss";

type Props = {
  playlist: TPlaylist;
  currentIndex: number;
  increment: number;
  className?: string;
};

const Playlist: Component<Props> = (props) => {
  let container: HTMLDivElement | undefined = undefined;
  const listLength = createMemo(() => props.playlist.length);
  const [indexOffset, setIndexOffset] = createSignal(NaN);
  createEffect(() => {
    console.log(listLength(), indexOffset());
    if (isNaN(indexOffset()) && listLength() > 0)
      setIndexOffset(listLength() * -2);
  });
  const playlist = createMemo(() => {
    const values: TPlaylist = [];
    for (let i = 0; i < 30; i++) {
      values.push(...props.playlist);
    }
    return values;
  });
  createEffect(() => {
    const el = document.getElementById(
      `playlist__${props.currentIndex + listLength()}`,
    );
    if (!el || !container) return;
    if (props.currentIndex === 0) {
      container.scrollTop = el.offsetTop - el.clientHeight * 2;
      setIndexOffset((pv) => pv + listLength());
    }
    container.style.scrollBehavior = "smooth";
    container.scrollTop = el.offsetTop - el.clientHeight;
    container.style.scrollBehavior = "unset";
  });
  const isActive = (input: number): boolean =>
    input === props.currentIndex + listLength();
  const getIndex = (input: number): number => {
    if (input < props.currentIndex + listLength()) {
      return props.increment - (props.currentIndex + listLength() - input) + 1;
    }
    return props.increment + input - (props.currentIndex + listLength()) + 1;
  };
  return (
    <div class={`${props.className} ${Styles.wrapper}`}>
      <div class={Styles.container} ref={container}>
        <For each={playlist()}>
          {(v, i) => {
            return (
              <div
                class={`${Styles.row} ${isActive(i()) && Styles.active} ${
                  indexOffset() + i() < 0 && Styles.hide
                }`}
                id={`playlist__${i()}`}
              >
                <span class={Styles.index}>
                  {isActive(i()) ? "▶" : getIndex(i())}
                </span>
                <img
                  src={v.metadata.thumbnail[0].url}
                  class={Styles.image}
                  alt={""}
                />
                <span class={Styles.text}>{v.metadata.title}</span>
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
};

export { Playlist };
