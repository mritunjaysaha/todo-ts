"use client";

import { createTodo, editTodo } from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { Todo } from "@/types/todo";
import {
    ChangeEventHandler,
    FormEvent,
    MouseEventHandler,
    useState,
} from "react";
import { v4 as uuidV4 } from "uuid";

type Tabs = "ALL" | "ACTIVE" | "COMPLETED";

export default function Home() {
    const dispatch = useDispatch();
    const { todo, allTodoIdArr, activeTodoArr, completedTodoArr } = useSelector(
        (state) => state.todoData
    );

    const todoIdArrObj: Record<Tabs, string[]> = {
        ALL: allTodoIdArr,
        ACTIVE: activeTodoArr,
        COMPLETED: completedTodoArr,
    };

    const [value, setValue] = useState<string>("");
    const [currentTab, setCurrentTab] = useState<Tabs>("ALL");
    const [editTodoId, setEditTodoId] = useState<string>("");

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
    };

    const handleTabsClick: MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;

        const selectedTabButton = target.closest(
            "button[data-tab]"
        ) as HTMLElement;

        const { dataset } = selectedTabButton;

        if (dataset.tab) {
            setCurrentTab(dataset.tab as Tabs);
        }
    };

    const handleTodoListClick: MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;

        const todoIdList = target.closest("li[data-todo-id]") as HTMLElement;
        const isEditButtonClicked = !!target.closest("button[data-edit]");
        const isRemoveButtonClicked = !!target.closest("button[data-remove]");

        console.log({ todoIdList, isEditButtonClicked, isRemoveButtonClicked });

        if (!todoIdList) return;

        const todoId = todoIdList?.dataset?.todoId as string;

        if (isEditButtonClicked) {
            const currentTodo = todo[todoId];
            setValue(currentTodo.todoContent);
            setEditTodoId(todoId);

            return;
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center gap-8 p-24">
            <nav>Todo Matic</nav>

            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        value={value}
                        onChange={handleChange}
                        className="bg-slate-300 outline-none text-black"
                    />
                    <button>{!editTodoId ? "Add" : "Update"}</button>
                </form>

                <div onClick={handleTabsClick}>
                    <button data-tab="ALL">Show all tasks</button>
                    <button data-tab="ACTIVE">Show active tasks</button>
                    <button data-tab="COMPLETED">Show completed tasks</button>
                </div>
            </div>

            <ul onClick={handleTodoListClick}>
                {todoIdArrObj[currentTab].map((id) => {
                    const data = todo[id];
                    const { todoContent, status } = data;

                    return (
                        <li key={id} data-todo-id={id}>
                            <input
                                type="checkbox"
                                checked={status === "COMPLETED"}
                            />
                            <p>{todoContent}</p>
                            <div className="flex gap-4">
                                <button
                                    data-edit
                                    className="bg-slate-700 p-2 rounded"
                                >
                                    Edit <span>{todoContent}</span>
                                </button>
                                <button
                                    data-remove
                                    className="bg-slate-700 p-2 rounded"
                                >
                                    Delete <span>{todoContent}</span>
                                </button>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
