import type { Component } from "solid-js";

import type { TPlaylist } from "../../@types/playlist";

type Props = {
  playlist: TPlaylist;
  currentIndex: number;
};

const Playlist: Component<Props> = (props) => {
  return (
    <div>
      {props.playlist.map((v, i) => {
        return (
          <div>
            <span>{i}</span>
            <span>{v.metadata.title}</span>
          </div>
        );
      })}
    </div>
  );
};

export { Playlist };
