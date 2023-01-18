import React from "react";
import PropTypes from 'prop-types';

import InterviewerListItem from "./InterviewerListItem";
import 'components/InterviewerList.scss'


export default function InterviewerList(props) {
//props from stories file 
const interviewArray = props.interviewers;
  const parsedInterviewers = (array) => array.map((interviewer)=> {return (
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}    
  />
    
  )})

return (
<section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">{parsedInterviewers(interviewArray)}</ul>
</section>
);
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,


};