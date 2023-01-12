import React , {useState} from "react";
import Button from "components/Button.jsx";
import InterviewerList from "components/InterviewerList.jsx";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

const reset = () => {
  setStudent("")
  setInterviewer(null)
}

const cancel = () => {
  reset()
  props.onCancel()
}


  return (
<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
  <form onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
    
        type="text"
        placeholder="Enter Student Name"
        value={student}
        onChange={(event) => setStudent(event.target.value)} 
        />
    </form>
    

    <InterviewerList
    value={interviewer}
      interviewers={props.interviewers}  
      onChange={setInterviewer}

  />
    
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={props.onSave}>Save</Button>
    </section>
  </section>
</main>
  );
}
