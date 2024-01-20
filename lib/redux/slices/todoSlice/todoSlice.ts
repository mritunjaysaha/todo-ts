import { Todo } from "@/types/todo";
import { createSlice } from "@reduxjs/toolkit";

type todoSliceState = {
    todo: Record<string, Todo>;
    allTodoIdArr: string[];
    activeTodoArr: string[];
    completedTodoArr: string[];
};

const initialState: todoSliceState = {
    todo: {},
    allTodoIdArr: [],
    activeTodoArr: [],
    completedTodoArr: [],
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        createTodo: (state, { payload }) => {
            const data = payload as Todo;

            state.todo[data.todoId] = data;
            state.allTodoIdArr.push(data.todoId);
            state.activeTodoArr.push(data.todoId);
        },
        editTodo: (state, { payload }) => {
            const data = payload as Todo;

            state.todo[data.todoId].todoContent = data.todoContent;
        },
        removeTodo: (state, { payload }) => {
            const removeTodoId = payload as string;

            delete state.todo[removeTodoId];

            state.allTodoIdArr = state.allTodoIdArr.filter(
                (id) => id !== removeTodoId
            );
            state.activeTodoArr = state.activeTodoArr.filter(
                (id) => id !== removeTodoId
            );
            state.completedTodoArr = state.completedTodoArr.filter(
                (id) => id !== removeTodoId
            );
        },
        updateTodoStatus: (state, { payload }) => {
            const data = payload as Todo;

            state.todo[data.todoId] = data;

            if (data.status === "COMPLETED") {
                state.activeTodoArr = state.activeTodoArr.filter(
                    (id) => id !== data.todoId
                );
                state.completedTodoArr.push(data.todoId);
            } else {
                state.completedTodoArr = state.completedTodoArr.filter(
                    (id) => id !== data.todoId
                );
                state.activeTodoArr.push(data.todoId);
            }
        },
    },
});

export const { editTodo, createTodo, removeTodo, updateTodoStatus } =
    todoSlice.actions;
