import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskItem from './TaskItem';
import { getTasksQuery } from '../services/TaskGql';


const TaskList = (props) => {

  // Get tasks from list and check is completed or not

    const { loading, error, data} = useQuery(getTasksQuery,{
      variables:{isNull: props.notCompleted},
      pollInterval:500
      });


    if (loading) return (
        <div className="h-100" key={props.Key}>
            <div className="text-center">
                Loading...
                <FontAwesomeIcon icon="spinner" spin size="2x"/>
            </div>
        </div>
    );
    if (error) {
        console.log(error);
        return <p>Error</p>; }
        return data.todos.map(todo => (
            <TaskItem key={todo.id} todo={todo}/>
          ))
}
 
export default TaskList;