import "./global-style.scss"
import {PropsWithChildren } from 'react'

export function GlobalStyle(props: PropsWithChildren ) {
  const { children } = props;
  return <>{children}</>;
}
