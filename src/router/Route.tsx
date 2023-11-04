import type {Component} from "solid-js";
import {createEffect, createSignal} from "solid-js";

type Props = {
  path: string|RegExp;
  component: Component
}

const Route: Component<Props> = ({path,component}) => {
  const [hash,setHash] = createSignal(window.location.hash.substring(1));
  createEffect(()=>{
    const handler = ()=>setHash(window.location.hash.substring(1));
    window.addEventListener("hashchange",handler);
    return ()=>{
      window.removeEventListener("hashchange",handler);
    }
  })

  return (<>
    {(typeof path === "string" ? path === hash() : hash().match(path)) && component}
  </>)
}

export {Route};