import {Component, createSignal, onCleanup, onMount} from "solid-js";
import {YouTubePlayer} from "../components/YouTubePlayer.tsx";

export const PlayerPage:Component<{path?:RegExpMatchArray}> = ({path}) => {
  const roomId = path?.groups?.roomId;
  if (!roomId) {
    throw new Error("roomId is not found");
  }
  const [playlist,setPlaylist] = createSignal<string[]>([]);
  const [index, setIndex] = createSignal(-1);
  const [socket,] = createSignal(new WebSocket(`wss://joren-playlist-backend.deno.dev/ws/v1/room/${roomId}/`));
  const onMessage = (e:MessageEvent)=>{
    const data = JSON.parse(e.data);
    if (data.type === "playlist") {
      setPlaylist(data.data);
      if (data.data.length > index()){
        setIndex(0);
      }else if(data.data.length === 0){
        setIndex(-1);
      }else if (index() < 0 && data.data.length > 0){
        setIndex(0);
      }
    }
  }
  onMount(()=>{
    socket().addEventListener("message",onMessage)
  })
  onCleanup(()=>{
    socket().removeEventListener("message",onMessage)
  })
  return <div>
    {index() >= 0 && <YouTubePlayer url={playlist()[index()]} onEnd={()=> {
      setIndex((pv)=>(pv+1)%playlist().length);
    }}/>}
  </div>;
};
