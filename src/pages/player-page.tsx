import {Component, createEffect, createMemo, createSignal, onCleanup, onMount} from "solid-js";
import {YouTubePlayer} from "../components/YouTubePlayer.tsx";

export const PlayerPage:Component<{path?:RegExpMatchArray}> = (params) => {
  const roomId = params.path?.groups?.roomId;
  if (!roomId) {
    throw new Error("roomId is not found");
  }
  const [playlist,setPlaylist] = createSignal<string[]>([],{equals:false});
  const [index, setIndex] = createSignal(-1);
  const [socket,] = createSignal(new WebSocket(`wss://joren-playlist-backend.deno.dev/ws/v1/room/${roomId}/`));
  const _setIndex = (val:number) => setIndex(val);
  
  const onMessage = (e:MessageEvent)=>{
    const data = JSON.parse(e.data);
    console.log(data)
    if (data.type === "playlist") {
      console.log(data.data,index())
      setPlaylist([...data.data]);
      if (data.data.length <= index()){
        _setIndex(0);
      }else if(data.data.length === 0){
        _setIndex(-1);
      }else if (index() < 0 && data.data.length > 0){
        _setIndex(0);
      }
    }
  }
  createEffect(()=>{
    console.log(playlist(),index(),index() >= 0)
  })
  console.log(playlist(),index(),index() >= 0)
  onMount(()=>{
    socket().addEventListener("message",onMessage)
  })
  onCleanup(()=>{
    socket().removeEventListener("message",onMessage)
    socket().close()
  })
  const url = createMemo(()=>{
    return  {
      url: playlist()[index()],
      index: index()
    }
  },index())
  const onVideoEnd = ()=> {
    console.log("test")
    setIndex((pv)=>(pv+1)%playlist().length);
  }
  return <div>
    {index() >= 0 && <YouTubePlayer _index={index()} url={url().url} onEnd={onVideoEnd}/>}
  </div>;
};
