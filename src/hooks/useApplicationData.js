import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const updateSpots = (day, counter) => {
   const found = state.days.find(weekday => weekday.name === day)
   if (counter === "add" ){
     found.spots +=1
    console.log(found.spots)
   } else {
   found.spots -= 1
   console.log(found.spots)
   }
  };

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
    
  

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(response => {
      setState({...state, appointments});
      updateSpots(state.day, "add")
      return response;
    })
}

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("state",state.day)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
   return axios.put(`/api/appointments/${id}`,{interview})
    .then(response=>{
      setState({...state, appointments})
      updateSpots(state.day, "minus")
      return response
    })
  }
  
  return {state, setDay, bookInterview, cancelInterview, updateSpots};
  }

 
  
  