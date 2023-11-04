import { TPlaylist } from "../../@types/playlist";
import { Component } from "solid-js";

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
