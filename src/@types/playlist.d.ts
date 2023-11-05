export type TMovieItem = {
  url: string;
  metadata: {
    title: string;
    channel: string;
    thumbnail: string;
  };
  type: SupportedSites;
};

export type TPlaylist = TMovieItem[];

export type SupportedSites = "youtube" | "nicovideo";
