import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import { useState, useEffect } from "react";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import axios from 'axios';




export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/interviewers'),
      axios.get('/api/appointments')])
      .then((all) => {
        setState(prev => ({...prev, days: all[0].data, interviewers: all[1].data, appointments: all[2].data}));
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
    const dailyAppointments = getAppointmentsForDay(state, state.day)    
    const parsedAppt = dailyAppointments.map((appt)=> {
      const interview = getInterview(state, appt.interview)
      const interviewers = getInterviewersForDay(state, state.day)
      function bookInterview(id, interview) {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview }
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        setState({...state, appointments})
      }
      return (
    <Appointment 
      key={appt.id} 
      {...appt} 
      interview={interview}
      interviewers={interviewers}
      bookInterview={bookInterview}
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
