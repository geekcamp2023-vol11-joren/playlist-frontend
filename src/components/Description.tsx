import type { Component } from "solid-js";

import Styles from "./Description.module.scss";

export const Description: Component = () => {
  return (
    <div class={Styles.wrapper}>
      <img src="/home.png" alt="description" width={200} height={200} />
    </div>
  );
};
