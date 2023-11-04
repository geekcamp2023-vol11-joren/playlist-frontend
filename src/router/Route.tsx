import type {Component} from "solid-js";

type Props = {
  path: string;
  component: Component
}

const Route: Component<Props> = ({path,component}) => {
  return (<>
    {path === window.location.pathname && component}
  </>)
}

export {Route};