import { AiOutlineCopy } from "solid-icons/ai";
import type { Component } from "solid-js";
import { createSignal } from "solid-js";

type Props = {
  url: string;
};

export const CopyLink: Component<Props> = ({ url }) => {
  const [isCopied, setIsCopied] = createSignal<boolean>(false);

  const copyHandler = (): void => {
    setIsCopied(true);
    void navigator.clipboard.writeText(url);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <div>
      <p>{url}</p>
      <button onClick={() => copyHandler()}>
        {isCopied() ? "Copied!" : <AiOutlineCopy />}
      </button>
    </div>
  );
};
