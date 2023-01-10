import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  let buttonClass = classNames('button', { " button--danger" : props.danger, " button--confirm": props.confirm})

console.log("wow", buttonClass)

  return <button className={buttonClass} disabled={props.disabled} onClick={props.onClick}>{props.children}</button>;
}
