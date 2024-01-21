import { updateTodoStatus } from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Todo } from "@/types/todo";
import { FC } from "react";

export const TabListItem: FC<Todo> = ({ todoId, todoContent, status }) => {
    const dispatch = useDispatch();
    const { todo } = useSelector((state) => state.todoData);

    const onChangeStatus = (todoId: string) => {
        const currentTodo = todo[todoId];
        if (currentTodo.status === "ACTIVE") {
            dispatch(updateTodoStatus({ ...currentTodo, status: "COMPLETED" }));
        } else {
            dispatch(updateTodoStatus({ ...currentTodo, status: "ACTIVE" }));
        }
    };

    return (
        <li data-todo-id={todoId}>
            <input
                type="checkbox"
                checked={status === "COMPLETED"}
                onChange={() => {
                    onChangeStatus(todoId);
                }}
            />
            <p>{todoContent}</p>
            <div className="flex gap-4">
                <button data-edit className="bg-slate-700 p-2 rounded">
                    Edit <span>{todoContent}</span>
                </button>
                <button data-remove className="bg-slate-700 p-2 rounded">
                    Delete <span>{todoContent}</span>
                </button>
            </div>
        </li>
    );
};
