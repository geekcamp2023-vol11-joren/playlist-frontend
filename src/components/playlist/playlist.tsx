import type { Component } from "solid-js";
import { createEffect, createMemo, createSignal, For } from "solid-js";

import type { TPlaylist } from "../../@types/playlist";
import Styles from "./playlist.module.scss";

type Props = {
  playlist: TPlaylist;
  currentIndex: number;
  className?: string;
};

const Playlist: Component<Props> = (props) => {
  let container: HTMLDivElement | undefined = undefined;
  const listLength = createMemo(() => props.playlist.length);
  const [indexOffset, setIndexOffset] = createSignal(NaN);
  createEffect(() => {
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
    console.log("scroll", props.currentIndex);
    if (props.currentIndex === 0) {
      container.style.scrollBehavior = "unset";
      container.scrollTop = el.offsetTop - el.clientHeight * 2;
      setIndexOffset((pv) => pv + listLength());
    }

    container.style.scrollBehavior = "smooth";
    container.scrollTop = el.offsetTop - el.clientHeight;
  });
  const isActive = (input: number): boolean =>
    input === props.currentIndex + listLength();
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
                  {isActive(i()) ? "▶" : indexOffset() + i() + 1}
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
