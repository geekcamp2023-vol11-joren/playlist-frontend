import QRCode from "qrcode-svg";
import type { Component } from "solid-js";

import { CopyLink } from "./copyLink";
import Styles from "./qrcode.module.scss";

type Props = {
  roomId: string;
};

export const QrCode: Component<Props> = ({ roomId }) => {
  const endPoint = location.host;
  const postPageUrl = `${endPoint}/#/post/${roomId}/`;

  return (
    <div class={Styles.wrapper}>
      <div
        class={Styles.qrcode}
        innerHTML={new QRCode({
          content: postPageUrl,
          padding: 4,
          width: 256,
          height: 256,
          color: "var(--text-body)",
          background: "var(--background-primary)",
          ecl: "M",
        }).svg()}
      ></div>
      <CopyLink className={Styles.link} roomId={roomId} />
    </div>
  );
};
