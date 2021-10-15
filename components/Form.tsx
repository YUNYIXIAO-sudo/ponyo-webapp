import React, {ChangeEvent} from "react";


interface OwnProps {
    InputValue: string
    deadline : string
    onChangeValue(event: React.ChangeEvent<HTMLInputElement>): void;
    onChangeCalenderValue(event:React.ChangeEvent<HTMLInputElement>):void;
    onClick(): void;
}

type Props = OwnProps
export const Form: React.FC<Props> = props => {
    return (
        <div>
            <input
                type="text"
                onChange={props.onChangeValue}
                value={props.InputValue}
            />
            <input
                type="date"
                onChange={props.onChangeCalenderValue}
                value={props.deadline}
            />
            <button
                onClick={props.onClick}
            >登録
            </button>
        </div>
    )
}
