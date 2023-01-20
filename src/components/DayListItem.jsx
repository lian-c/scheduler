import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  //props passed from application
const dayClass = classNames('day-list__item', { "day-list__item--selected" : props.selected, " day-list__item--full": (props.spots === 0)})

const formatSpots = (spots) => {
  return( 
    <>
  {spots === 0 && <h3 className="text--light">no spots remaining</h3>}
  {(spots > 1) && <h3 className="text--light">{spots} spots remaining</h3>}
  {spots === 1 && <h3 className="text--light">1 spot remaining</h3>}
  </>
  )
}

  return (
    <li className={dayClass}  onClick={() => props.setDay(props.name)} selected={props.selected} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      {formatSpots(props.spots)}
     
    </li>
  );
}