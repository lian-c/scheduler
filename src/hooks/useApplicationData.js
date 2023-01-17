import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });
  const setDay = (day) => setState({ ...state, day });

  let updatedDays; //global for setState in cancel/book interview

  const updateSpots = (state, appointments, id) => {
    console.log("og", state.days);
    let daysCopy = [...state.days];
    const found = daysCopy.find((weekday) => weekday.name === state.day);
    let count = found.spots;

    const existingAppointment = () => {
      return state.appointments[id].interview;
    };

    if (existingAppointment() && appointments[id].interview === null) {
      count += 1; //increase because previously there was appt and now null
    } else if (existingAppointment() && appointments[id].interview !== null) {
      count = count; //appointment only updated not deleted
    } else {
      count -= 1; //not existing so adding appointment spot should decrease
    }

    updatedDays = daysCopy.map((day) => {
      if (day.name === state.day) {
        daysCopy = { ...day, spots: count };
        return daysCopy;
      } else {
        return day;
      }
    });
    console.log(updatedDays);
    return updatedDays;
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/interviewers"),
      axios.get("/api/appointments"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          interviewers: all[1].data,
          appointments: all[2].data,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      updateSpots(state, appointments, id);
      console.log(updatedDays);
      setState({ ...state, appointments, days: updatedDays });
      return response;
    });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        updateSpots(state, appointments, id);
        setState({ ...state, appointments, days: updatedDays });
        return response;
      });
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots };
}
