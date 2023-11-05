import type { Component } from "solid-js";

import { Discription } from "../components/Discription";
import Styles from "./index-page.module.scss";

export const IndexPage: Component = () => {
  const createRoomHandler = async (): Promise<void> => {
    // TODO: 部屋作成APIを叩く(/api/roomsはapiが分かり次第変更する)
    const res = await fetch(
      "https://joren-playlist-backend.deno.dev/api/v1/create",
      {
        method: "POST",
      },
    );
    const { roomId } = (await res.json()) as { roomId: string };
    // TODO: 作成した部屋に遷移する
    window.location.hash = `/player/${roomId}/`;
  };
  return (
    <div class={Styles.wrapper}>
      <div class={Styles.discription}>
        <Discription />
      </div>
      <div class={Styles.createRoom}>
        <p>
          部屋を作成して動画配信サイトの動画を共有しながら一つの画面で見ることができます。
        </p>
        <button
          class={Styles.createRoomButton}
          onClick={() => void createRoomHandler()}
        >
          部屋作成
        </button>
      </div>
    </div>
  );
};
