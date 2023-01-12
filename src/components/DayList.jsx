import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {
const DayListArray = props.days

const parsedDayList = DayListArray.map((dayList)=> {return (
  <DayListItem
  key={dayList.id}
    name={dayList.name}
    spots={dayList.spots}
    selected={dayList.name === props.value}
    setDay={props.onChange}
  />
)})


  return (
    <ul >
     {parsedDayList}
    </ul>
  );
}