import type { Component } from "solid-js";
import { createSignal, onCleanup, onMount } from "solid-js";

type Props = {
  path: string | RegExp;
  component: Component<{ path?: RegExpMatchArray }>;
};

const Route: Component<Props> = ({ path, component: Component }) => {
  const [hash, setHash] = createSignal(window.location.hash.substring(1));
  const handler = () => {
    setHash(window.location.hash.substring(1));
  };
  onMount(() => {
    window.addEventListener("hashchange", handler);
  });
  onCleanup(() => {
    window.removeEventListener("hashchange", handler);
  });

  let match = null;

  return (
    <>
      {(typeof path === "string"
        ? path === hash()
        : (match = hash().match(path))) && (
        <Component path={match ?? undefined} />
      )}
    </>
  );
};

export { Route };
