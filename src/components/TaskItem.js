import React,{ useState, useRef } from 'react';

// components import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import EditableLabel from 'react-inline-editing';
import Runner from './Runner';
import Moment from 'react-moment';

// Apollo Hooks and gql
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TODO, MARK_COMPLETE, CLEAR_TODO ,DELETE_TODO,UPDATE_TITLE } from '../services/TaskGql';


const TaskItem = (props) => {
  // create states
  const [dueDate, setdueDate] = useState(new Date(props.todo.dueDate));
  const [deleting, setDeleting] = useState(false);

  // create useMutations
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [markComplete] = useMutation(MARK_COMPLETE);
  const [clearTodo] = useMutation(CLEAR_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTitle] = useMutation(UPDATE_TITLE);

  // create datepick ref to close datepicker on completed

  const dateRef = useRef();

  // Graph QL Functions

  const markCompleted = () => {
    dateRef.current.setOpen(false);
    markComplete({
      variables: { id: props.todo.id, completedDate: new Date() },
    });
  };

  const changeTitle = (text) => {
    updateTitle({ variables: { id: props.todo.id, title: text } });
  };

  const removeTodo = () => {
    deleteTodo({ variables: { id: props.todo.id } });
  }

  // Create a custom input button for React Datepicker

  const CustomInput = ({ value, onClick }) => (
    <div onClick={onClick}>
      <Moment format="DD/MM/YYYY">{dueDate}</Moment>
      <FontAwesomeIcon className="ml-1 text-primary" icon="calendar-alt" />
    </div>
  );
    // Ask check question if delete option is chosen
    if (deleting) return (
        <div className="row">
            <div className="col-8 text-center">
            Are you Sure You want to Delete This Task?
            </div>
            <div className="col text-center">
            <FontAwesomeIcon icon="check-circle" style={{color:"green"}} onClick={() => {removeTodo()}} />
            </div>
            <div className="col text-center">
            <FontAwesomeIcon icon="times-circle" style={{color:"red"}} onClick={() => {
                setDeleting(false)
            }} />
            </div>
        </div>
    ) 

  return (
    <div className="row">
      <div className="col-md-5 col-lg-5 col-xl-5 col-sm-4 col-xs-4 font-weight-bold my-auto">
        <div className="row align-items-center">
          {/* Delete Button */}
          <FontAwesomeIcon
            icon="trash-alt"
            className="text-primary mr-1"
            onClick={() => {
                setDeleting(true);
            }}
          />
          <div className="mt-2">
          {/* Editable Title Label */}
          <EditableLabel 
          text={props.todo.title} 
          onFocusOut={changeTitle} />
          </div>
        </div>
      </div>
      <div className="col-1 text-center">
          {/* Runner animation based on dueDate */}
          <Runner dueDate={dueDate} completedDate={props.todo.completedDate} />
      </div>
      <div className="col text-right">
        {/* Check if Task Completed */}
        {props.todo.completedDate == null ? (
          <div>
            {/* Datepicker to update dueDate or Mark Completed */}
            <DatePicker
              ref={dateRef}
              withPortal
              minDate={new Date()}
              selected={dueDate}
              onChange={(date) => {
                setdueDate(date);
                updateTodo({ variables: { id: props.todo.id, dueDate: date } });
              }}
              customInput={<CustomInput />}
            >
              <div className="mx-auto text-center pb-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => markCompleted()}
                >
                  Mark As Completed{" "}
                  <FontAwesomeIcon icon="star" style={{ color: "yellow" }} />
                </button>
              </div>
            </DatePicker>
            <div style={{ fontSize: "0.8em" }} className="text-muted">
              <Moment fromNow>{dueDate}</Moment>
            </div>
          </div>
        ) : (
          <div className="mt-1">
            {/* Show a star if task is completed */}
            <FontAwesomeIcon
              icon="star"
              size="2x"
              style={{ color: "#fbf236" }}
              onClick={() => {
                clearTodo({ variables: { id: props.todo.id } });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
 
export default TaskItem;