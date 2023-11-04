import {Component, createSignal, onCleanup, onMount} from "solid-js";

export const PlayerPage:Component<{path?:RegExpMatchArray}> = ({path}) => {
  const roomId = path?.groups?.roomId;
  if (!roomId) {
    throw new Error("roomId is not found");
  }
  const [socket,] = createSignal(new WebSocket(`wss://joren-playlist-backend.deno.dev/ws/v1/room/${roomId}/`));
  const onMessage = (e:MessageEvent)=>{
    console.log(e)
  }
  onMount(()=>{
    socket().addEventListener("message",onMessage)
  })
  onCleanup(()=>{
    socket().removeEventListener("message",onMessage)
  })
  return <div>
    player page
  </div>;
};
