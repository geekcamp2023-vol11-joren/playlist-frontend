import { AiOutlineCopy } from "solid-icons/ai";
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
      <p class={Styles.link}>
        {endPoint}/#/post/
        <wbr />
        <span class={Styles.block}>{props.roomId}</span>
      </p>
      <button class={Styles.button} onClick={() => copyHandler()}>
        {isCopied() ? "Copied!" : <AiOutlineCopy class={Styles.icon} />}
      </button>
    </div>
  );
};
