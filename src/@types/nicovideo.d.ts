export type NicoMessage =
  | {
      eventName: "loadComplete";
    }
  | {
      eventName: "statusChange";
      data: {
        playerStatus: number;
      };
    };
