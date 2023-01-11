import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
const DayListArray = props.days

const parsedDayList = DayListArray.map((dayList)=> {return (
  <DayListItem
  key={dayList.id}
    name={dayList.name}
    spots={dayList.spots}
    selected={dayList.name === props.day}
    setDay={props.setDay}
  />
)})


  return (
    <ul >
     {parsedDayList}
    </ul>
  );
}