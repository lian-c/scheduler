const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      interviewers: [1, 2],
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

const getAppointmentsForDay = (state, day) => {
  const result = [];
  state.days.map((days) => {
    if (days.name === day) {
      const apptArray = days.appointments;
      for (let id of apptArray) {
        result.push(state.appointments[id]);
      }
    }
    return result;
  });
  return result;
};

const getInterview = (state, interview) => {
  let result = null;

  if (interview) {
    Object.values(state.interviewers).map((interviewId) => {
      if (interviewId.id === interview.interviewer) {
        result = { ...interview, interviewer: interviewId };
      }
      return result;
    });
  }
  return result;
};

const getInterviewersForDay = (state, day) => {
  const result = [];
  state.days.map((days) => {
    if (days.name === day) {
      const interviewArray = days.interviewers;
      for (let id of interviewArray) {
        result.push(state.interviewers[id]);
      }
    }
    return result;
  });
  return result;
};

getInterviewersForDay(state, "Monday");

module.exports = { getAppointmentsForDay, getInterview, getInterviewersForDay };
