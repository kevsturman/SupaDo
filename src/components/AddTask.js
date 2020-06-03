import React,{ useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import { ADD_TODO } from '../services/TaskGql';

function AddTask(props) {

  // set states for new title and due date
    let title;
    const [addTodo] = useMutation(ADD_TODO);
    const [dueDate, setdueDate] = useState(new Date());

  // Create Custom Input for react DatePicker

    const CustomInput = ({ value, onClick }) => (
      <button type="button" 
            className="btn btn-primary btn-sm" 
            onClick={onClick}>
                <span className="mr-1">Due Date</span>
                <FontAwesomeIcon className="mr-1" icon="calendar-alt"/> 
                <Moment format="DD/MM/YY">
                {value}
                </Moment>
     </button>
    );

    return (
      <form>


      <div className="row">
          <div className="col-6">
          <input
            required
            aria-label="Task Title"
            aria-required="true"
            placeholder="Todo Title"
            className="form-control form-control-sm"
            ref={node => {
              title = node;
            }}
          />
          </div>
          <div className="col-6 text-right">
            <DatePicker
            withPortal
            minDate={new Date()}
            selected={dueDate}
            onChange={date => setdueDate(date)}
            customInput={<CustomInput />}/>
            </div>
          <div className="col-1 text-right">
          </div>
          <button className="btn btn-sm btn-primary btn-block mt-2 ml-3 mr-3" 
          onClick={e => {
            e.preventDefault();
            if (title.value !== '') {
            addTodo({ variables: { title: title.value, dueDate: dueDate } });
            title.value = '';
            }
          }}
          type="submit">
            Add Todo
          </button>
      </div>
      </form>
    );
  }

  export default AddTask;
