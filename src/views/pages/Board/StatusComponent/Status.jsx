import React, {useState} from 'react'
import { useCreateNewTaskMutation } from '../../../../state/createNewTask/api';
import { useDeleteBoardMutation } from '../../../../state/deleteBoardStatus/api';
import LoadingSpinner from '../../../utils/LoadingSpinner/LoadingSpinner';
import Task from '../TaskComponent/Task';
import classes from "./Status.module.scss";

const Status = ({statusID, userRole, name, tasks}) => {
  const [inputValue, setInputValue] = useState("");
  const [createTask, {isLoading}] = useCreateNewTaskMutation();
  const [deleteBoardStatus, {isLoading: isDeleting}] = useDeleteBoardMutation();

  function createNewTask(){
      const payload = {
        name: inputValue,
        status_id: statusID
      }
      createTask(payload);
      setInputValue("");
  }
  function deleteStatus(){
      deleteBoardStatus(statusID);
  }
  return (
    <div className={classes.statusComponent}>
        {userRole === "Admin" &&   <div className={classes.deleteStatus}>
                                      {isDeleting ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> : <button onClick={deleteStatus}>✖</button>}
                                    </div>
        }
        <p>{name}</p>
        {tasks && tasks.length ?
         <div className={classes.tasks}>
             {
                 tasks.map(task => {
                    if(!task.isArchived){
                      return <Task key={task.id} taskID={task.id} name={task.name} isActive={task.isActive}/>
                    }
                })
             }
         </div> : null}
            <div className={classes.createTaskContainer}>
              <input disabled={userRole !== "Admin"} onChange={e => setInputValue(e.target.value)} value={inputValue} placeholder='Enter a task name'/>
              {isLoading ? <LoadingSpinner width={"1.5rem"} height={"1.5rem"}/> : <button disabled={userRole !== "Admin"} onClick={createNewTask}>✚</button>}
             </div>
    </div>
  )
}

export default Status