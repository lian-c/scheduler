import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  let clicked = props.onClick
  
  
  
  let buttonClass = classNames('button', { " button--danger" : props.danger, " button--confirm": props.confirm})



  return <button className={buttonClass} disabled={props.disabled} onClick={clicked}>{props.children}</button>;
}
