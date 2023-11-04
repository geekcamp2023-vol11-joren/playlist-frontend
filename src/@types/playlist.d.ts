import type { VideoInfo } from "youtubei.js/dist/src/parser/youtube";

export type TMovieItem = {
  url: string;
  metadata: VideoInfo["basic_info"];
};

export type TPlaylist = TMovieItem[];
