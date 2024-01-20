"use client";

import { createTodo } from "@/lib/redux/slices/todoSlice/todoSlice";
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

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const target = e.target as HTMLInputElement;

        setValue(target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const todo: Todo = {
            todoId: uuidV4(),
            todoContent: value,
            status: "ACTIVE",
        };

        dispatch(createTodo(todo));
    };

    const handleTabsClick: MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;

        console.log({ target });

        const selectedTabButton = target.closest(
            "button[data-tab]"
        ) as HTMLElement;

        const { dataset } = selectedTabButton;

        if (dataset.tab) {
            setCurrentTab(dataset.tab as Tabs);
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
                        className="bg-black outline-none"
                    />
                    <button>Add</button>
                </form>

                <div onClick={handleTabsClick}>
                    <button data-tab="ALL">Show all tasks</button>
                    <button data-tab="ACTIVE">Show active tasks</button>
                    <button data-tab="COMPLETED">Show completed tasks</button>
                </div>
            </div>

            <ul>
                {todoIdArrObj[currentTab].map((id) => {
                    const data = todo[id];
                    const { todoContent, status } = data;

                    return (
                        <li key={data.todoId}>
                            <input
                                type="checkbox"
                                checked={status === "COMPLETED"}
                            />
                            <p>{todoContent}</p>
                            <button>
                                Edit <span>{todoContent}</span>
                            </button>
                            <button>
                                Delete <span>{todoContent}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}
