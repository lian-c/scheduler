import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from 'axios';


// const appointments = {
//   "1": {
//     id: 1,
//     time: "12pm",
//   },
//   "2": {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer:{
//         id: 3,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   "3": {
//     id: 3,
//     time: "2pm",
//   },
//   "4": {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Archie Andrews",
//       interviewer:{
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   "5": {
//     id: 5,
//     time: "4pm",
//   }
// };




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({...prev, days}))
  
  
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/interviewers'),
      axios.get('/api/appointments')])
      .then((all) => {
        // set days to the response data
        //  console.log(response.data)
        setState(prev => ({...prev, days: all[0].data, appointments: all[2].data}));
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
    const dailyAppointments = getAppointmentsForDay(state, state.day)    
    const parsedAppt = dailyAppointments.map((appt)=> {
      return (
    <Appointment 
      key={appt.id} 
      {...appt} 
    />
    )
    })

  return (
    <main className="layout">
      <section className="sidebar">
      <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
  <DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
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
