import type {Component} from "solid-js";
import {createSignal, onCleanup, onMount} from "solid-js";

type Props = {
  path: string|RegExp;
  component: Component
}

const Route: Component<Props> = ({path,component}) => {
  const [hash,setHash] = createSignal(window.location.hash.substring(1));
  const handler = ()=>setHash(window.location.hash.substring(1));
  onMount(()=>{
    window.addEventListener("hashchange",handler);
  })
  onCleanup(()=>{
    window.removeEventListener("hashchange",handler);
  })

  return (<>
    {(typeof path === "string" ? path === hash() : hash().match(path)) && component}
  </>)
}

export {Route};