import { createTodo, editTodo } from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Todo } from "@/types/todo";
import {
    ChangeEventHandler,
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
} from "react";
import { v4 as uuidV4 } from "uuid";

type TodoFormType = {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    editTodoId: string;
    setEditTodoId: Dispatch<SetStateAction<string>>;
};

export const TodoForm: FC<TodoFormType> = ({
    value,
    setValue,
    editTodoId,
    setEditTodoId,
}) => {
    const dispatch = useDispatch();
    const { todo } = useSelector((state) => state.todoData);

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = e.target as HTMLInputElement;

        setValue(target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editTodoId) {
            const currentTodo = JSON.parse(JSON.stringify(todo[editTodoId]));

            currentTodo.todoContent = value;
            dispatch(editTodo(currentTodo));

            setValue("");
            setEditTodoId("");

            return;
        }

        const newTodo: Todo = {
            todoId: uuidV4(),
            todoContent: value,
            status: "ACTIVE",
        };

        dispatch(createTodo(newTodo));

        setValue("");
    };

    return (
        <div className="flex flex-col gap-10 items-center">
            <form onSubmit={handleSubmit} className="flex gap-4">
                <input
                    value={value}
                    onChange={handleChange}
                    className="bg-slate-300 outline-none text-black rounded-md p-2"
                    placeholder="Make a todo"
                />
                <button className="bg-slate-700 py-2 px-6 rounded-md hover:bg-slate-700 transition duration-300 ease-in-out">
                    {!editTodoId ? "Add" : "Update"}
                </button>
            </form>
        </div>
    );
};
