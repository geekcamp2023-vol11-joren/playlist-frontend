export type TMovieItem = {
  url: string;
  metadata: {
    title: string;
    channel: {
      id: string;
      name: string;
    };
    thumbnail: {
      url: string;
      width: number;
      height: number;
    }[];
  };
};

export type TPlaylist = TMovieItem[];
