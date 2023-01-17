import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";
import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

 function save(name, interviewer) {
  transition(SAVING)
  const interview = {
      student: name,
      interviewer,
    };
  props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
  }

  function confirming() {
    return transition(CONFIRM)
  }

function onDelete(){
  props.cancelInterview(props.id)
  transition(EMPTY)
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
        message="Saving"
        />
      )}
      {mode === EDIT && (
        
        <Form
        interviewers={props.interviewers}
        onCancel={() => {
          back();
        }}
        apptId={props.id}
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
