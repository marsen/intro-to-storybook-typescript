// src/components/TaskList.tsx
import React from 'react';
import Task, { TaskItem, TaskState } from './Task';
import { connect } from 'react-redux';
import { archiveTask, pinTask } from '../lib/redux';

export interface TaskListArgs {
  loading?:boolean;
  tasks: TaskItem[];
  onArchiveTask: (id:string)=>void;
  onPinTask: (id:string)=>void;  
}

export function TaskList(props:TaskListArgs) {     
  const events = { 
    onArchiveTask:props.onArchiveTask,
    onPinTask:props.onPinTask,
   };
  
  const LoadingRow = (
    <div className="loading-item">
      <span className="glow-checkbox" />
      <span className="glow-text">
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  );

  if (props.loading) {    
    return (
      <div className="list-items">
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    );
  }
  
  if (props.tasks === undefined || props.tasks.length === 0) {
    return (
        <div className="list-items">
            <div className="wrapper-message">
                <span className="icon-check" />
                <div className="title-message">You have no tasks</div>
                <div className="subtitle-message">Sit back and relax</div>
            </div>
        </div>
    );
  }

  const tasksInOrder = [
    ...props.tasks.filter(t => t.state === TaskState.Pinned), //< ==== 固定頂部
    ...props.tasks.filter(t => t.state !== TaskState.Pinned),
  ];

  return (
    <div className="list-items">
      {tasksInOrder.map(item => (
        <Task key={item.id} item={item} {...events}/>
      ))}
    </div>
  );
}

export default connect(
  (props:TaskListArgs) => ({
    tasks: props.tasks.filter(t => t.state === TaskState.Inbox || t.state === TaskState.Pinned ),
  }),
  dispatch => ({
    onArchiveTask: (id: string) => dispatch(archiveTask(id)),
    onPinTask: (id: string) => dispatch(pinTask(id)),
}))(TaskList);