"use client";

import { Tabs } from "@/components/Tabs";
import { TodoForm } from "@/components/TodoForm";
import {
    removeTodo,
    updateTodoStatus,
} from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { TabKeys } from "@/types/tabKeys";
import { MouseEventHandler, useState } from "react";

export default function Home() {
    const dispatch = useDispatch();
    const { todo, allTodoIdArr, activeTodoArr, completedTodoArr } = useSelector(
        (state) => state.todoData
    );

    const todoIdArrObj: Record<TabKeys, string[]> = {
        ALL: allTodoIdArr,
        ACTIVE: activeTodoArr,
        COMPLETED: completedTodoArr,
    };

    const remainingTodos = activeTodoArr.length;

    const [value, setValue] = useState<string>("");
    const [currentTab, setCurrentTab] = useState<TabKeys>("ALL");
    const [editTodoId, setEditTodoId] = useState<string>("");

    const handleTabsClick: MouseEventHandler = (e) => {
        const target = e.target as HTMLElement;

        const selectedTabButton = target.closest(
            "button[data-tab]"
        ) as HTMLElement;

        const { dataset } = selectedTabButton;

        if (dataset.tab) {
            setCurrentTab(dataset.tab as TabKeys);
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

        if (isRemoveButtonClicked) {
            dispatch(removeTodo(todoId));
        }
    };

    const onChangeStatus = (todoId: string) => {
        const currentTodo = todo[todoId];
        if (currentTodo.status === "ACTIVE") {
            dispatch(updateTodoStatus({ ...currentTodo, status: "COMPLETED" }));
        } else {
            dispatch(updateTodoStatus({ ...currentTodo, status: "ACTIVE" }));
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center gap-8 p-24">
            <nav>Todo Matic</nav>

            <TodoForm
                value={value}
                setValue={setValue}
                editTodoId={editTodoId}
                setEditTodoId={setEditTodoId}
            />

            <Tabs currentTab={currentTab} handleTabsClick={handleTabsClick} />

            <ul onClick={handleTodoListClick}>
                <p>
                    {remainingTodos
                        ? `${remainingTodos} tasks remaining`
                        : "All tasks completed"}{" "}
                </p>

                {todoIdArrObj[currentTab].map((id) => {
                    const data = todo[id];
                    const { todoContent, status } = data;

                    return (
                        <li key={id} data-todo-id={id}>
                            <input
                                type="checkbox"
                                checked={status === "COMPLETED"}
                                onChange={() => {
                                    onChangeStatus(id);
                                }}
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
