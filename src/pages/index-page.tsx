import type { Component } from "solid-js";

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
    <div>
      <h1>部屋作成</h1>
      <button onClick={() => void createRoomHandler()}>作成</button>
    </div>
  );
};
