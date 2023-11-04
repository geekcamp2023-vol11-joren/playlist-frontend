export type VideoPlayerMethods = {
  play(): void;
  pause(): void;
  seek(time: number): void;
};

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: {
      Player: {
        new (
          id: string,
          options: {
            videoId: string;
            playerVars?: { [key: string]: string | number | boolean };
            events: {
              onReady?: () => void;
              onStateChange?: (event: { data: number }) => void;
            };
          },
        );
      };
    };
  }
}
