import type {Component} from "solid-js";

type Props = {
  path: string|RegExp;
  component: Component
}

const Route: Component<Props> = ({path,component}) => {
  return (<>
    {(typeof path === "string" ? path === window.location.pathname : window.location.pathname.match(path)) && component}
  </>)
}

export {Route};