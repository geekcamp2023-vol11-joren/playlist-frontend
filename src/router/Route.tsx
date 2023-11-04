import type {Component} from "solid-js";

type Props = {
  path: string;
  component: Component
}

const Route: Component<Props> = ({path,component}) => {
  return (<>
    {window.location.pathname.startsWith(path) && component}
  </>)
}

export {Route};