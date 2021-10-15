import React from "react";
import { useDispatch, useSelector } from "react-redux";
import taskSlice, { Task, TaskState } from "../../state/Task";
import { Form } from "../../components/Form";
import { Todo } from "../../components/Todo";
import Link from "next/link";

const TodoPage: React.FC = () => {
  //ストアを呼んでくる

  const dispatch = useDispatch();
  const taskState = useSelector(
    (state: { taskState: TaskState }) => state
  ).taskState;

  return (
    <div>
      <h1>This is todo page!</h1>
      <Form
        InputValue={taskState.input_value}
        onChangeCalenderValue={(e: React.ChangeEvent<HTMLInputElement>) => {
          let b = e.target.value;
          dispatch(taskSlice.actions.notifyGetDdl(b));
          console.log(b);
        }}
        deadline={taskState.input_deadline_value}
        onChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => {
          let a = e.target.value;
          dispatch(taskSlice.actions.notifyChangeInputValue(a));
          console.log(a);
        }}
        onClick={() => {
          if (taskState.input_value.length !== 0) {
            const tmpArray = taskState.tasks.filter(
              (task) => task.is_finished === true
            );
            var taskNum = taskState.tasks.length + 1;
            var progressNum = tmpArray.length;
            var done = progressNum / taskNum;

            let p: Task = {
              task: taskState.input_value,
              is_finished: false,
              deadline: taskState.input_deadline_value,
              task_id: taskNum,
            };
            dispatch(taskSlice.actions.notifyChangeProgress(done));
            dispatch(taskSlice.actions.notifyAddNewTask(p));
            dispatch(taskSlice.actions.notifyChangeInputValue(""));
          }
        }}
      />
      {taskState.tasks.map((value: Task, index: number) => {
        return (
          <Todo
            task={value.task}
            is_finished={value.is_finished}
            task_id={value.task_id}
            deadline={value.deadline}
            onChange={() => {
              dispatch(taskSlice.actions.notifyChangeTaskState(value.task_id));

              console.log(value.task_id);
              const tmpArray = taskState.tasks.filter(
                (task) => task.is_finished
              );
              const taskNum = taskState.tasks.length;
              let progressNum = tmpArray.length;
              // if(value.is_finished)progressNum-=1

              const done = progressNum / taskNum;
              dispatch(taskSlice.actions.notifyChangeProgress(done));
            }}
          />
        );
      })}
      <Link href={"/"}>皆の恥ずかしエピソードを見に行く</Link>
    </div>
  );
};
export default TodoPage;
