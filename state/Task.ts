import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type Task = {
    task: string,
    deadline: string,
    is_finished: boolean,
    task_id: number,
}

//モデル
export type TaskState = {
    tasks: Task[]
    input_value: string,
    progress: number,
    input_deadline_value: string,
}


//モデルの初期値
export const initialState: TaskState = {
    tasks: [{
        task: "多〇量解析のレポートをボコボコにする",
        is_finished: false,
        deadline: "2021/7/28",
        task_id: 1
    }],
    input_value: "",
    progress: 0,
    input_deadline_value: "××××/××/××",
}

//モデルから値の保存場所（State）を作る

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        //アクションを定義する
        //アクションはチェックボックスの値を入れる
        //チェックボックスにチェックが付く・・・true
        //チェックボックスにチェックが付かない・・・false
        notifyChangeTaskState: (state, action: PayloadAction<number>) => ({
            ...state,
            tasks: [...state.tasks.map((data: Task, index: number) => {
                let flag
                if (data.task_id === action.payload) flag = !data.is_finished;
                else flag = data.is_finished
                return {
                    task_id: data.task_id,
                    is_finished: flag,
                    task: data.task,
                    deadline: data.deadline
                }
                // return data
            })]
        }),
        notifyChangeInputValue: (state, action: PayloadAction<string>) => ({
            ...state, input_value: action.payload
        }),
        notifyAddNewTask: (state, action: PayloadAction<Task>) => ({
            ...state, tasks: [...state.tasks, action.payload]
        }),
        notifyChangeProgress: (state, action: PayloadAction<number>) => ({
            ...state, progress: action.payload
        }),
        notifyGetDdl: (state, action: PayloadAction<string>) => ({
            ...state, input_deadline_value: action.payload
        })
    }
})

export default taskSlice
