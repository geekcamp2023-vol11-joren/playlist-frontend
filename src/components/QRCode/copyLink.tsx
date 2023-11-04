import { AiOutlineCopy } from "solid-icons/ai";
import { createSignal } from "solid-js";

type Props = {
  url: string;
};

export const CopyLink = ({ url }: Props) => {
  const [isCopied, setIsCopied] = createSignal<boolean>(false);

  const copyHandler = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(url);
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
