// src/components/Task.tsx
import React from 'react';

export enum TaskState{
  Inbox = 'TASK_INBOX',
  Pinned = 'TASK_PINNED',
  Archived = 'TASK_ARCHIVED'
}

export interface TaskArgs {
  item:TaskItem,
  onArchiveTask: (id:string) => void,
  onPinTask: (id:string) => void
}

export class TaskItem{
  id: string = ''
  title: string = ''
  state: TaskState = TaskState.Inbox
  updatedAt?: Date
}

export default function Task(args:TaskArgs) {
  return (
    <div className={`list-item ${args.item.state}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          defaultChecked={args.item.state === TaskState.Archived}
          disabled={true}
          name="checked"
        />
        <span className="checkbox-custom" onClick={()=>args.onArchiveTask(args.item.id)} />
      </label>
      <div className="title">
        <input type="text" value={args.item.title} readOnly={true} placeholder="Input title" />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {args.item.state !== TaskState.Archived && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <a onClick={()=>args.onPinTask(args.item.id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}