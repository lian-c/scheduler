import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 function save(name, interviewer) {
   const interview = {
     student: name,
     interviewer,
    };
    transition(SAVING)
 return props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(error => {
      console.log(error);
      transition(ERROR_SAVE, true);
  });
  }

  function confirming() {
    return transition(CONFIRM)
  }


function onDelete(){
  return props.cancelInterview(props.id)
  .then(() => transition(EMPTY))
  .catch(error => {
    console.log(error);
    transition(ERROR_DELETE, true);
  });
}

function onEdit() {
  transition(EDIT)
}

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => {
            back();
          }}
          apptId={props.id}
          onSave={save}
        />
      )}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirming}
          onEdit={onEdit}
        />
      )}
      {mode === SAVING && (
        <Status
        message={SAVING}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        onClose={back}
        message="Error with deleting, please go back"
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
        onClose={back}
        message="Error with saving, please go back"
        />
      )}
      {mode === EDIT && (
        
        <Form
        interviewers={props.interviewers}
        onCancel={() => {
          back();
        }}
        
        onSave={save}
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}

        />
      )}
      {mode === CONFIRM && (
        <Confirm
        message="Are you sure you want to delete this appointment"
        onCancel={()=> {back()}}
        onConfirm={onDelete}
        />
      )}
    </article>
  );
}
