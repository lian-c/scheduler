import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import axios from 'axios';


const appointments = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};

const parsedAppt = Object.values(appointments).map((appt)=> {
  return (
<Appointment 
  key={appt.id} 
  {...appt} 
/>
)
})




export default function Application(props) {
  const [day, setDay] = useState([]);
  const [dayApi, setDayApi] = useState([]);
  useEffect(() => {
    axios
    .get('http://localhost:8001/api/days')
      .then((response) => {
        // set days to the response data
       console.log(response.data)
       setDayApi(response.data)

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu"><DayList
  days={dayApi}
  value={day}
  onChange={setDay}
/> </nav>

<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
      {parsedAppt}

      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
