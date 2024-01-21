"use client";

import { Header } from "@/components/Header";
import { TabLists } from "@/components/TabLists";
import { Tabs } from "@/components/Tabs";
import { TodoForm } from "@/components/TodoForm";
import { removeTodo } from "@/lib/redux/slices/todoSlice/todoSlice";
import { useDispatch, useSelector } from "@/lib/redux/store";
import { TabKeys } from "@/types/tabKeys";
import { MouseEventHandler, useState } from "react";

export default function Home() {
    const dispatch = useDispatch();
    const { todo } = useSelector((state) => state.todoData);

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

    return (
        <main className="flex min-h-screen flex-col items-center gap-8 p-4 pt-20">
            <Header />

            <TodoForm
                value={value}
                setValue={setValue}
                editTodoId={editTodoId}
                setEditTodoId={setEditTodoId}
            />

            <Tabs currentTab={currentTab} handleTabsClick={handleTabsClick} />

            <TabLists
                currentTab={currentTab}
                handleTodoListClick={handleTodoListClick}
            />
        </main>
    );
}
