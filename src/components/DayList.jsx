import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {
const DayListArray = props.days

const parsedDayList = DayListArray.map((day)=> {return (
  <DayListItem
  key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.value}
    setDay={props.onChange}
  />
)})


  return (
    <ul >
     {parsedDayList}
    </ul>
  );
}