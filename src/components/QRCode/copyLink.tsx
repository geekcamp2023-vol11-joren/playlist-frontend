import type { Component } from "solid-js";
import { createSignal } from "solid-js";

import Styles from "./link.module.scss";

type Props = {
  roomId: string;
  className?: string;
};

export const CopyLink: Component<Props> = (props) => {
  const [isCopied, setIsCopied] = createSignal<boolean>(false);
  const endPoint = `${location.protocol}//${location.host}`;
  const postPageUrl = `${endPoint}/#/post/${props.roomId}/`;

  const copyHandler = (): void => {
    setIsCopied(true);
    void navigator.clipboard.writeText(postPageUrl);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div class={`${props.className} ${Styles.wrapper}`}>
      <div class={`${Styles.popup} ${isCopied() && Styles.visible}`}>
        コピーしました！
      </div>
      <p class={Styles.link} onClick={() => copyHandler()}>
        {endPoint}/#/post/
        <wbr />
        <span class={Styles.block}>{props.roomId}/</span>
      </p>
    </div>
  );
};
