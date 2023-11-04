import type { Component } from "solid-js";
import { createEffect, createMemo, For } from "solid-js";

import type { TPlaylist } from "../../@types/playlist";
import Styles from "./playlist.module.scss";

type Props = {
  playlist: TPlaylist;
  currentIndex: number;
  className?: string;
};

const Playlist: Component<Props> = (props) => {
  let wrapper: HTMLDivElement | undefined = undefined;
  const listLength = createMemo(() => props.playlist.length);
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
    if (!el || !wrapper) return;
    wrapper.scrollTop = el.offsetTop - el.clientHeight;
  });
  const isActive = (input: number): boolean =>
    input === props.currentIndex + listLength();
  return (
    <div class={`${props.className} ${Styles.wrapper}`}>
      <div class={Styles.container} ref={wrapper}>
        <For each={playlist()}>
          {(v, i) => (
            <div
              class={`${Styles.row} ${isActive(i()) && Styles.active}`}
              id={`playlist__${i()}`}
            >
              <span class={Styles.index}>
                {isActive(i()) ? "▶" : (i() % listLength()) + 1}
              </span>
              <img
                src={v.metadata.thumbnail[0].url}
                class={Styles.image}
                alt={""}
              />
              <span class={Styles.text}>{v.metadata.title}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export { Playlist };
